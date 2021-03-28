//jshint esversion:6
const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
  const query = req.body.cityname;
  const apiid = "c896e0c59cf70100b59439a229bdf091";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiid + "&units=metric";


    https.get(url, function(response) {
      response.on("data", function(data) {
        const weatherdata = JSON.parse(data);
        console.log(weatherdata);
        const temp = weatherdata.main.temp;
        console.log(temp);
        const description = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<p>the weather currently is " + description + "<p>");
        res.write("<h3>the temperature of "+query+ " is  " + temp + " degreee</h3>");
        res.write("<img src=" + imageurl + ">");

        res.send();
      });
    });


});
app.listen(3000, function() {
  console.log("server running on port 3000");
});
