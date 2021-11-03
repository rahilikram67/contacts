import express from 'express';

var app = express();
app.set("view-engine", "ejs")
app.use(express.static('.'));
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
