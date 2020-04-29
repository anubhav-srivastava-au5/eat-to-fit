var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

var Calculator = require("../models/calorie-calculator");

router.post("/", async (req, res, next) => {
    const calculator = new Calculator({
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        gender: req.body.gender,
        activity: req.body.activity,
        email: req.body.email
    })
    calculator
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({ data: calc() })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

    function calc() {
        var a = req.body.weight
        var b = req.body.height
        // b=b/100;
        // a = Math.floor(100 * a) / 100;
        // b = Math.floor(100 * b) / 100;
        // var c=a/Math.pow(b,2);
       var c= a/(b/100*b/100)

        // var c = Math.round(a / (b * b) * 10000);

        if (c < 16) {
            return ("Your bmi: " + (c) + ", You are almost dead!");
        }
        else if ((c > 16) && (c <= 18.3)) {
            return ("Your bmi: " + (c) + ", You should eat more");
        }
        else if ((c > 18.4) && (c <= 24.99)) {
            return ("Your bmi: " + (c) + ", All is fine");
        }
        else if ((c > 24.99) && (c <= 29.99)) {
            return ("Your bmi: " + (c) + ", You eat too much!!");
        }
        else {
            return ("Your bmi: " + (c) + ", You are really obsessed!!");
        }
    }
});

module.exports = router;

// function bmi(){

//     var sheight=parseFloat(document.getElementById(‘hgt’).value);
//     var sweight=parseFloat(document.getElementById(‘wgt’).value);
//     var bmi=sweight/Math.pow(sheight,2);
//     var student_bmi=document.getElementById(‘bmi_index’);
//     student_bmi.textContent=bmi.toFixed(2);
//     }
// document.bmiForm.bmi.value = finalBmi
// if(finalBmi < 18.5){
// document.bmiForm.meaning.value = "That you are too thin."
// }
// if(finalBmi > 18.5 && finalBmi < 25){
// document.bmiForm.meaning.value = "That you are healthy."
// }
// if(finalBmi > 25){
// document.bmiForm.meaning.value = "That you have overweight."
// }
// }
// else{
// alert("Please Fill in everything correctly")


// https://www.elephantsql.com/
// https://www.youtube.com/watch?v=BuJj4LCWP_4

