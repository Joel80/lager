import config from '../config/config.json';
import Invoice from '../interfaces/invoice';
import storage from './storage';


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
        
    },
    updateInvoice: async function updateInvoice(invoice: Partial<Invoice>) {
        invoice.api_key = config.api_key;
        try {

            await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoice),
                headers: {
                    'content-type': 'application/json'
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
