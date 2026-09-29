const express = require("express");
require("dotenv").config();
const dns = require("dns");
const { log } = require("console");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const multer = require("multer")
const uploadFile = require("./services/storeage.service")
const postModel = require("./models/post.model")


const app = express();
app.use(express.json())

const upload = multer({storage:multer.memoryStorage()})

app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log(req.params.body);
    console.log(req.file);
    const result = await uploadFile(req.file.buffer)
    console.log(result)
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption,
    })
    return res.status(201).json({
        message: "Image Uploaded",
        post
    })
})

app.get("/posts", async (req, res) => {
    const posts = await postModel.find()
    return res.status(200).json({
        posts
    })
})

module.exports = app;