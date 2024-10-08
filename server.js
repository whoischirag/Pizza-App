const express= require('express')
const port=process.env.PORT || 3000
const app= express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path =require('path')




app.get('/',(req,res)=>{
res.render('home')

})

//setting template engine 
const viewsPath= path.join(__dirname,'/resources/views')

app.use(expressLayout)
app.set("views",viewsPath)
app.set('view engine', 'ejs')

app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`);

})
