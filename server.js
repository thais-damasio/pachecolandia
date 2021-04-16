const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname)));

const port = 3333;
app.listen(port, () => {
    console.log("--- Pachecolândia Start ---")
});