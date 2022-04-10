import config from '../config/config.json';
import Order from '../interfaces/order';
import productModel from './products';
import Product from '../interfaces/product';
import OrderItem from '../interfaces/product';

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Order) {
        // Remove products from stock
        for (const item of order.order_items) {
            
            const newStock = item.stock - item.amount;

            let partialProduct: Partial<Product> = {
                name: item.name,
                id: item.product_id,
                stock: newStock,
            }
             
            //const product: Product = await productModel.getProduct(item.product_id);
            //console.log(product);
            //product.stock -= item.amount; 
            await productModel.updateProduct(partialProduct);
        }
        
        // Change order status to 200
        order.status_id = 200;
        await this.updateOrder(order);
    },
    setOrderStatus: async function setOrderStatus(order: Order, status_id: number) {
        order.api_key = config.api_key;
        order.status_id = status_id;
        await fetch(`${config.base_url}/orders`, {
        body: JSON.stringify(order),
        headers: {
            'content-type': 'application/json'
        },
        method: 'PUT'
        });
    },
    updateOrder: async function updateOrder(order: Partial<Order>) {
        order.api_key = config.api_key;
        try {

            await fetch(`${config.base_url}/orders`, {
                body: JSON.stringify(order),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
                });

        } catch (error) {
            console.log("Could not update order");
            console.log(error);
        }
        
    }

};

export default orders;
