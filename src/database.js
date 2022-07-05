import db from 'mongoose'

db.connect("mongodb://Localhost/first-restapi")
    .then(dab => console.log('DataBase is Conected'))
    .catch(error => console.log(error))