import express from "express";

const app = express();

app.use(express.json()); //parser json
app.use(express.urlencoded({ extended: true })); //tillader at parse urlencoded forms

app.post("/githubwebhookjson", (req, res) => {
    console.log(req.body);
    res.status(204);
});

app.post("/githubwebhookform", (req, res) => {
    console.log(req.body);
    res.status(204);
});

app.listen(8080, () => console.log("Server is running on port", 8080));