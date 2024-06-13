import fetch from 'node-fetch';
import 'dotenv/config'

let body = {
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
  };
const response = await fetch(`https://${process.env.STORE_NAME}.myshopify.com/admin/api/2024-04/graphql.json`, {
	method: 'post',
	body: JSON.stringify(body),
	headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.APP_ACCESS_TOKEN,
    }
});
const data = await response.json();
console.log(JSON.stringify(data, null, 2));
