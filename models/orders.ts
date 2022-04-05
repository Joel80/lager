import config from '../config/config.json';
import Order from '../interfaces/order';
import productModel from './products';
import Product from '../interfaces/product'

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Order) {
        //TODO: Minska lagersaldo för de orderrader
        // som finns i ordern
        for (const item of order.order_items) {
            const product: Product = await productModel.getProduct(item.product_id);
            //console.log(product);
            await productModel.updateStock(product, item.amount);
        }
        


        //TODO: Ändra status för ordern som är packad
        await this.setOrderStatus(order, 200);
    },
    setOrderStatus: async function setOrderStatus(order: Order, status_id: number) {
        order.api_key = config.api_key;
        order.status_id = status_id;
        fetch("https://lager.emilfolino.se/v2/orders", {
        body: JSON.stringify(order),
        headers: {
        'content-type': 'application/json'
        },
        method: 'PUT'
        })
        .then(function (response) {

        });
    }

};

export default orders;
