const dotenv = require("dotenv").config();
const express = require("express");
const User = require("./db/User");
const Product = require("./db/Product")
const cors = require("cors")
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm"
const conn = require("./db/Conn")
conn();
const app = express();

app.use(express.json());
app.use(cors());

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        Jwt.verify(token, jwtKey, (error, valid) => {
            if (error) {
                res.status(401).send("Please Enter valid token!")
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403).send("Please send token with headers!");
    }
}

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).send("This Email Already Exists!");
        }

        const newUser = new User({
            name,
            email,
            password
        });

        const result = await newUser.save();

        res.status(201).send({
            message: "User registered successfully",
            user: result
        });
    } catch (error) {
        res.status(500).send({ error: "Server error" });
    }
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        const data = await User.findOne(req.body).select("-password");
        if (data) {
            Jwt.sign({ data }, jwtKey, { expiresIn: "20h" }, (error, token) => {
                if (error) {
                    res.send("Something went wrong, please try again");
                }
                else {
                    res.send({ data, token: token })
                }
            })
        }
        else {
            res.send("No user found.")
        }
    }
    else {
        res.send("Please Enter Email and Password.")
    }

})

app.post("/addProduct", verifyToken, async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result)
})

app.get("/listProducts", verifyToken, async (_, res) => {
    const productData = await Product.find();
    if (productData.length > 0) {
        res.send(productData)
    }
    else {
        res.send({ result: "No data found!" })
    }
})

app.delete("/delete/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get("/updateProduct/:id", verifyToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "No record found!" })
    }
})

app.put("/updateProductData/:id", verifyToken, async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})

app.get("/search/:key", verifyToken, async (req, res) => {
    const result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { cateogry: { $regex: req.params.key } }
        ]
    })
    res.send(result);
})

app.listen(2000, () => {
    console.log("Server is running on port 2000.");
});