// Import the dependency of the sqlite3
const sqlite3 = require("sqlite3").verbose() //show informations on the console

// Create the object that will perform operations on the database
const db = new sqlite3.Database("./src/database/database.db")

// Export database
module.exports = db

//Use the database object
db.serialize(() => {
    // Create table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // Insert datas on the table
//     const query = `
//     INSERT INTO places (
//         image, 
//         name,
//         address, 
//         address2, 
//         state, 
//         city, 
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `
//     const values =  [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(error){
//         if(error) {
//             return console.log(error)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

    // Query datas of the table
    // db.all(`SELECT * FROM places`, function(error, rows){
    //     if(error) {
    //         return console.log(error)
    //     }

    //     console.log("Here are your records:")
    //     console.log(rows)
    // })
   

    // Delete a data of the table
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function(error){
    //     if(error) {
    //         return console.log(error)
    //     }

    //     console.log("Registro deletado com sucesso!")
    // })

})
    
