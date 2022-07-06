import db from 'mongoose'

db.connect("mongodb://Localhost/first-restapi", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(dab => console.log('DataBase is Conected'))
    .catch(error => console.log(error))

