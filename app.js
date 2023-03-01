const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 80;
const bodyParser = require('body-parser')

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://danceacademy:shakthi1@cluster0.bb8t0tw.mongodb.net/contactDance');


  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Creating a mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: { type: Number},
    gender: String,
    number: String,
    email: String,
    address: String
});

//Creating a Mongoose Model
const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //For serving static files
app.use(express.urlencoded()) //This will bring the form data to express

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set template engine as pug
app.set('views', path.join(__dirname,'views')) //set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    // const params = {}
    res.status(200).render('home.pug')
})
app.get('/contact',(req,res)=>{
    // const params = {}
    res.status(200).render('contact.pug')
})

app.post('/contact',(req,res)=>{
    let myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Form has been submitted")
    }).catch(()=>{
        res.status(400).send("Not Submitted")
    })
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`starting the port ${port}`)
});