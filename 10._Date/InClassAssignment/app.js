const express = require('express');

const app = express();

const date = new Date();

const danishDate = Intl.DateTimeFormat("da-dk").format(date);
console.log(danishDate);

app.get('date', async ( req,res) => {
    try {
        res.danishDate;
    } catch(error) {
        res.status(500);
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server A running on port ${PORT}`);
});