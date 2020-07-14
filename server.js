const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const logos = require("./data");

server.set("view engine", "njk");

server.use(express.static('public'));

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
});

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/47889306?s=460&u=6577fd93874161fc7c386bbf37b1e05019de0503&v=4",
        name: "Josué Filipe",
        role: "Programador - Nova Software",
        description: "Atuando na área desde 2018 — Desenvolvedor Front End e Back End",
        links: [
            {
                name: "Github",
                url: "https://github.com/josueflpp"
            },
            {
                name: "Instagram",
                url: "https://www.instagram.com/josueflpp/"
            },
            {
                name: "Linkedin",
                url: "https://github.com/josueflpp"
            }
        ]
    }

    return res.render("about", { about });
})

server.get("/classes", function(req, res){
    return res.render("classes", { items: logos });
});

server.get("/logo", function(req, res) {
    const id = req.query.id;
    
    const logo = logos.find(function(logo){
        return logo.id == id;
    });

    if (!logo) {
        return res.send("Logo not found!");
    } else {
        return res.render("logo", { item: logo });
    }

    res.send(id);
});

server.listen(5000, function(){
    console.log("server is running");
});