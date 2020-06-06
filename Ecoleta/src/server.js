const express = require('express')
const server = express()
const multer = require('multer')

//pegar o banco de dados
const db = require('./database/db')


//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso req.body
server.use(express.urlencoded({extended: true}))

//utilizando o Template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//configurar rotas
server.get("/",(req,res)=>{
   return res.render("index.html",{title:"UM titulo"})
})

server.get("/create-point",(req,res)=>{

    console.log(req.query)

    return res.render("create-point.html")
})





server.post("/savepoint",(req,res)=>{
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.error(err)
        }
        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render('create-point.html', {saved: true})
    }

    db.run(query, values, afterInsertData)
    
    
})



server.get("/search-results",(req, res )=>{
    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html",{ total:0 })
    }


    //pegar os dados do bd
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err, rows){
            if (err){
                return console.error(err)
            }
            const total = rows.length

            console.log("Aqui estão seus pedidos")
            console.log();
            
            //mostrar a pagina com os dados do bd
            return res.render("search-results.html",{places: rows, total: total})
        })
    


})




server.listen(3000)