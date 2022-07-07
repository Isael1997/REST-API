import { response } from "express";
import product from "../models/product";

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
    res.status(200).json(products);
}

export const updateProductById = async (req, res) => {
    
    const updatedProduct = await product.findByIdAndUpdate(req.params.productId, 
        req.body,{
            new: true,
        });
    res.status(200).json(updatedProduct);
}

export const deleteProductById = async (req, res) => {
    
    const {productId} = req.params;
    await product.findByIdAndDelete(productId);
    res.status(204).json();
}
