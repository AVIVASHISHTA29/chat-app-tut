import express from 'express';
import { photos } from './photos.js';

const app = express();
const port = 5001;


app.get('/', (req, res) => {
    res.send({ message: "Hello, world!" })
})

app.get('/photos', (req, res) => {
    res.send({ data: photos })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})