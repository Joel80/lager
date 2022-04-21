import config from '../config/config.json';
import Invoice from '../interfaces/invoice';
import storage from './storage';
import orderModel from './orders';


function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }

    return "" + number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`
}

const invoices = {
    getInvoices: async function getInvoices(): Promise<Invoice[]> {
        console.log("Getting invoices");
        const tokenAndData = await storage.readToken();
        const token = tokenAndData.token;
        console.log(`token: ${token}`)
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token
            }
        });
        const result = await response.json();

        console.log(`data: ${result.data}`);
        return result.data;
    },
    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        const order = await orderModel.getOrder(invoice.order_id);

        let invoiceTotalPrice: number = 0;

        for (const item of order.order_items) {
            invoiceTotalPrice += item.amount * item.price
        }

        let dueDate = new Date(invoice.creation_date);

        dueDate.setDate(dueDate.getDate() + 30);

        invoice.due_date = formatDate(dueDate);
        invoice.total_price = invoiceTotalPrice;
        invoice.api_key = config.api_key;
        const tokenAndData = await storage.readToken();
        const token = tokenAndData.token;

        try {

           const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoice),
                headers: {
                    'x-access-token': token,
                    'content-type': 'application/json'
                },
                method: 'POST'
            });

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.log("Could not update invoice");
            console.log(error);
        }

        order.status_id = 600

        await orderModel.updateOrder(order);
        
    },
    updateInvoice: async function updateInvoice(invoice: Partial<Invoice>) {
        invoice.api_key = config.api_key;
        const tokenAndData = await storage.readToken();
        const token = tokenAndData.token;
        try {

            await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoice),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token,
                },
                method: 'PUT'
                });

        } catch (error) {
            console.log("Could not update invoice");
            console.log(error);
        }
        
    }

};

export default invoices;
