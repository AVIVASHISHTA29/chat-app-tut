import express from 'express';

const app = express();
const port = 5001;

app.get('/', (req, res) => {
    res.send({ message: "Hello, world!" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})