import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productRouter from '../src/routes/product.route'

const app = express();

app.use(morgan('dev'));

app.set('pkg', pkg);
app.set('json spaces', 2);

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