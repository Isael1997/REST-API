import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productRouter from '../src/routes/product.route'

const app = express();

app.use(morgan('dev'));

app.set('pkg', pkg);
app.use(express.json());/*para indentificar que entienda los formatos .json,
esto aplica para todas las conexiones que tienen.*/
app.set('json spaces', 2);//para darle un espacio a los datos .json

app.get('/', (req, res) => {
    res.json({
        "Name": app.set('pkg').name,
        "Authour": app.set('pkg').author,
        "Description": app.set('pkg').description,
        "Version": app.set('pkg').version
    });
});

app.use('/product', productRouter);

export default app;