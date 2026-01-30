import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello, World!' });
});

app.get('/data',async(req,res)=>{
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch data' });
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});