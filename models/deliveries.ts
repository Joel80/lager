import config from '../config/config.json';
import Delivery from '../interfaces/delivery';

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries/?api_key=${config.api_key}`);
        const result = await response.json();
        console.log("Get deliveries");
        console.log(result.data);

        return result.data;
        
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        console.log(delivery);
        
        delivery.api_key = config.api_key;
        try {

            await fetch(`${config.base_url}/deliveries`, {
                body: JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
                });

        } catch (error) {
            console.log("Could not post delivery");
            console.log(error);
        }
        
    }
}

export default deliveries;
