const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    fs.readdir("./files", function (err, files) {
        res.render("index", { files: files });
    })
})

app.get("/create",function(req,res){
    res.render("create")
})

app.post("/createfile",function(req,res){
    fs.writeFile(`./files/${req.body.filename}.txt`,req.body.data,function(err,data){
        if(err)  res.send(err.message)
        else res.redirect("/")
    })
})

app.get("/read/:filename", function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
        if (err) res.send(err.message)
        else res.render("read", { data: data, filename: req.params.filename });
    })
})

app.get("/edit/:filename", function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
        if (err) res.send(err.message)
        else res.render("edit", { data: data, filename: req.params.filename });
    })
})

app.post("/update/:filename",function(req,res){
    fs.writeFile(`./files/${req.params.filename}`,req.body.updateData,function(err){
        if(err) res.send(err.message);
        else res.redirect(`/read/${req.params.filename}`)
    })
})

app.get("/delete/:filename",function(req,res){
    fs.unlink(`./files/${req.params.filename}`,function(err){
        if(err) res.send(err.message)
        else res.redirect("/")
    })
})


app.listen(3000);