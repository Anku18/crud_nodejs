const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes

app.get('/', (req, res) => {
    res.send("Hello from NOde API updated");
})

app.post('/api/create/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/api/get/products', async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/api/get/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// UPDATE PRODUCT API
app.put('/api/update/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE PRODUCT API

app.delete('/api/delete/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }


        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb+srv://ankushvarma006:ufamfPkY7ne6riOx@cluster.jqnl1od.mongodb.net/crudDB?retryWrites=true&w=majority&appName=Cluster')
    .then(() => {
        console.log('Connected to database!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.log("Connection failed!")
    });

// ufamfPkY7ne6riOx