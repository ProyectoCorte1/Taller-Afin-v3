const express =require("express");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


const dotenv = require("dotenv");
dotenv.config({path:"./env/.env"});

app.use("/resources",express.static("Taller_Cifrado_Afin_Final"));
app.use("/resources",express.static(__dirname+"/Taller_Cifrado_Afin_Final"));


app.set("view engine","ejs");


const bcryptjs = require("bcryptjs");

const session =require("express-session");
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}));

const connection = require("./database/db");


app.get("/",(req,res)=>{
    res.send("Hola Mundo");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register", async(req,res)=>{
  const  user = req.body.user;
  const name_user = req.body.name_user;
  const password_user = req.body.password_user;
  let passwordHash = await bcryptjs.hash(password_user,8);
  connection.query("INSERT INTO data_login SET ?",{user:user,name_user:name_user,password_user,passwordHash},(err,results) =>{
  if (err){
      console.error("Error"+err);
  }else {
      console.log("Data inserted");
  }
  connection.end();
  })
});



app.listen(3000,(req,res)=>{
    console.log("Server Running http://localhost:3000")
})