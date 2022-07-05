import app from './app.js'
import './database'

//Esto es para buscar un puerto
app.set('port', process.env.PORT || 4000);

//Esto es para darle el numero de puerto encontrado
app.listen(app.set('port'), () => {
    console.log('Server on port', app.get('port'));
});
