import axios from "axios";
import 'dotenv/config'

let data = JSON.stringify({
  query: `query GetProducts($count: Int){
products(first: $count) {
    edges {
      node {
        product_id: id
        product_title: title
      }
    }
  }
}`,
  variables: {"count":10}
});

let config = {
  method: 'POST',
  maxBodyLength: Infinity,
  url: `https://${process.env.STORE_NAME}.myshopify.com/admin/api/2024-04/graphql.json`,
  headers: { 
    'X-Shopify-Access-Token': process.env.APP_ACCESS_TOKEN, 
    'Content-Type': 'application/json', 
  },
  data : data
};
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data, null, 2));
})
.catch((error) => {
  console.log(error.response?.data);
});
