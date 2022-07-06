import { response } from "express";
import product from "../routes/product";

export const createProduct = async (req, res) => {
    //Destruturing para coger todo los datos en req.body de uno en uno
    const {name, category, price, imgUrl} = req.body;

    //se pasa los datos a esta constate
    const newProduct = new product({name, category, price, imgUrl});
    
    //el producto se guada aqui
    const productSaved = await newProduct.save();
    
    res.status(201).json(productSaved);
    console.log(productSaved);
}

export const getProduct = async (req, res) => {
    const products = await product.find();
    res.json(products);
}
export const getProductById = async (req, res) => {
    
    const products = await product.findById(req.params.productId);
    console.log(products);

    res.status(200).json(products);
}
export const updateProductById = (req, res) => {

}
export const deleteProductById = (req, res) => {

}
