const express = require("express");
const app = express();

const Article = require("./models/Articale")
//mongodb+srv://karfesahmed:<db_password>@cluster0.oku0kek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://karfesahmed:abdou1106a2005@cluster0.oku0kek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected secssesfully !")
    app.listen(3000, () => {
        console.log("server is running");
    });
}).catch((error)=>{
    console.log("data base error : ",error)

})


app.use(express.json())
app.get("/home",function (req,res){
    res.send("this is home page !");
});
app.get("/first",(req,res)=>{
    res.send("<h1>this is first page</h1>")
})
app.post("/mypost",(req,res)=>{
    res.send("my posts here !!!")
})
app.get("/add/:num1/:num2",(req,res)=>{
    let result = parseInt(req.params["num1"]) +parseInt(req.params.num2);
    //res.sendFile(__dirname + "/pages/index.ejs");
    res.render("pages/index.ejs",{
        "result":result
    })
})
app.get("/sayHello",(req,res)=>{
    let age = req.query["age"];
    let fname = req.body.fname;
    //res.send(`<h1>hello, ${fname} your age is : ${age}`)
    res.json({
        fname : fname,
        age : age
    })
    
})

app.post("/articles",async (req,res)=>{
    const newArticle = new Article();
    newArticle.title = req.body.title;
    newArticle.body = req.body["body"];
    newArticle.numberOfLikes = 100;
    await newArticle.save()
 
    res.json(newArticle)
})
app.get("/articles",async (req,res)=>{
    const articles = await Article.find();
    res.render("pages/articles.ejs",{
        "articles":articles
    })
})
app.get("/articles/:article_id",async (req,res)=>{
    const article_id = req.params["article_id"];
    const article = await Article.findById(article_id);
    res.json(article);

})

app.delete("/articles/:article_id",async(req,res)=>{
    const article = await Article.findByIdAndDelete(req.params["article_id"]);
    res.json(article);
})

