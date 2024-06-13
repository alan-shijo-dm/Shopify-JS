import express from "express";
import axios from "axios";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/products', (req, res) => {
      let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `https://${process.env.STORE_NAME}.myshopify.com/admin/api/2024-04/graphql.json`,
        headers: { 
          'X-Shopify-Access-Token': process.env.APP_ACCESS_TOKEN, 
          'Content-Type': 'application/json', 
        },
        data : JSON.stringify(req.body)
      };
      axios.request(config)
      .then((response) => {
        return res.send(response.data);
      })
      .catch((error) => {
        console.log(error.response?.data);
        return res.send(error.response?.data);
      });
  });
  
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})