const express = require('express')
const server = express()

// Get the database
const db = require("./database/db.js")

//Configure public folder
server.use(express.static("public"))

// Enable the use req.body on the application
server.use(express.urlencoded({ extended: true}))



//Using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configure path of my application
// Homepage
//req: Request -> Requisição
//res: Response -> Resposta
server.get("/", (req, res) => {
    return res.render("index.html") 
})

server.get("/create-point", (req, res) => {

    // req.query: Query strings of the URL
    // console.log(req.query)

    return res.render("create-point.html") 
})

server.post("/savepoint", (req, res) => {


    // req.body: body of the form
    console.log(req.body)

    //Insert datas on the database
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
    const values =  [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,


    ]

    function afterInsertData(error){
        if(error) {
           console.log(error)
           return res.send("Erro no cadastro")

        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)


    
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }

    // Get datas of the database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(error, rows){
        if(error) {
            return console.log(error)
        }

        const total = rows.length

        //show page html with the datas of the database
        return res.render("search-results.html", { places: rows, total: total}) 
    })

   
})


// Turn on the server
server.listen(3000);