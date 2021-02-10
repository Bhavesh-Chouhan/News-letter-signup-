//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");




const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req1, res1){
  var num1 = req1.body.num1;
  var num2 = req1.body.num2;
  var email = req1.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: num1,
          LNAME: num2
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/fa5aa566fa"

  const option ={
    method: "POST",
    auth: "bhavesh:47014d5df926856b79655865a73159fc-us7"
  }


  const request = https.request(url, option, function(response){

    if (response.statusCode === 200) {
      res1.sendFile(__dirname + "/success.html");
    } else {
      res1.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req3, res3){
  res3.redirect("/");
})

app.listen(process.env.PORT || 3020, function(){
  console.log("Sever has started at port 3020");
});
// 47014d5df926856b79655865a73159fc-us7
// fa5aa566fa
