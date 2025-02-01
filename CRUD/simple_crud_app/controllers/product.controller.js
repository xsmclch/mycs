import { Product } from "../models/product.model.js";

// get all product
export async function getProducts (req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get a product
export async function getProduct (req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// create a product
export async function createProduct (req, res) {
    // console.log(req.body);
    // res.send(req.body);
    // res.send("Data Received");
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update a product
// app.put or app.patch
export async function updateProduct (req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete a product
export async function deleteProduct (req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        console.log(product);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}