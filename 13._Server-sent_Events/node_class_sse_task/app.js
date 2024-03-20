import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.static("public"));

app.get("/getNewJoke", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    setInterval(() => getNewJokeFetch(res), 15000);
    

});

/*function sendTimeToClient(res) {
    const time = new Date().toISOString();
    const joke = getNewJokeFetch();
    res.write(`data: ${time} \n\n`);
}


function getNewJokeFetch(res) {
    fetch('/https://api.chucknorris.io/jokes/random')
        .then((res) => res.text())
        .then((body) => {
            res.write(`data: ${body} \n\n`);
        });
}
*/
function getNewJokeFetch(res) {
    (async () => {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const body = await response.text();
        res.write(`data: ${body.value} \n\n`);
    })();
}
const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));