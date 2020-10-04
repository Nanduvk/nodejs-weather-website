const request=require("request")

const forecast=(Latitude,Longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=e11c88f81c1a667dec12a2376ede6c61&query="+Latitude+","+Longitude+"&units=m"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to Weatherstack!",undefined)
        }else if(body.error){
            callback("Unable to Find Location!",undefined)
        }else{
            callback(undefined,"Current_Weather: "+ body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out."
            )
        }
    })
}

module.exports=forecast