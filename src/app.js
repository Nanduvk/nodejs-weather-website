const path=require('path')
const express=require("express")
const hbs=require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()

const publicdirPath=(path.join(__dirname,'../public'))
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Defines paths for Express config
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup handlebars engine and views location
app.use(express.static(publicdirPath))


//Setup static directory to serve(route handlers)
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name:'Nandu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Nandu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Nandu',
        helptext:'This is some Helpful Text!!'
    })
})

app.get("/weather",(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:'You must provide an Address'
        })
    }
    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if (error){
            return res.send({error})
        }
          forecast(Latitude, Longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                title: 'Weather',
                forecast:forecastData,
                location:Location,
                address:req.query.address
            })
          })
    })

})

app.get("/products",(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search item"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render('404',{
        title:'Error 404 !!!',
        name: 'Nandu',
        errorMessage:"Help Article Not Found!"
    })
})

app.get("*",(req,res)=>{
    res.render('404',{
        title:'Error 404 !!!',
        name: 'Nandu',
        errorMessage:"Page Not Found!"
    })
})

//Start Server
app.listen(3000,()=>{
    console.log("Server Started Up!!")
})