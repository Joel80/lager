import config from '../config/config.json';
import Product from '../interfaces/product';

//TODO model for product should contain function to update product amount when an order is picked


const products = {
    getProduct: async function getProduct(product_id: number) {
        const response = await fetch(`${config.base_url}/products/${product_id}?api_key=${config.api_key}`);
        const result = await response.json();
        //console.log(result.data);

        return result.data;
    },
    updateStock: async function updateStock(product: Product, orderAmount: number) {
        product.stock = product.stock - orderAmount;
        //console.log(product.stock);
        //console.log(JSON.stringify(product));
        product.api_key = config.api_key;
        console.log(product);
        fetch(`https://lager.emilfolino.se/v2/products`, {
            body: JSON.stringify(product),
            headers: {
            'content-type': 'application/json'
        },
        method: 'PUT'
        })
        .then(function (response) {
            console.log(response);
        });
    }
};
export default products;