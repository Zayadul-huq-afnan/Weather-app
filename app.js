
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , function(req , res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function(req, res){
    
    const city = req.body.cityName;
    const appId = "4ffbd5a6b56321b9524e0c4be22916f8";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appId;
    https.get(url , function(response){

        response.on("data", function(data){
        
            try{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            //res.write("Description: " + description);
            res.write("<h1>The temp is: " + temp + "</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
            }
            catch(error){
                console.log("error: ", error);
            }
        })
})


})


app.listen(3000 , function(){
    console.log("Server is up and running at 3000");
})