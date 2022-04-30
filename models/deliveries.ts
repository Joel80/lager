import config from '../config/config.json';
import Delivery from '../interfaces/delivery';
import { MessageType } from "react-native-flash-message";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        console.log("Calling getDeliveries");
        const response = await fetch(`${config.base_url}/deliveries/?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
        
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        
        delivery.api_key = config.api_key;
        console.log(delivery);
        try {

            const response = await fetch(`${config.base_url}/deliveries`, {
                body: JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });

            const result = await response.json();

            return {
                title: "Ny inleverans",
                message: `${result.data.amount} ${result.data.product_name} levererade`,
                type:  "success" as MessageType,
            };

        } catch (error) {
            console.log("Could not post delivery");
            console.log(error);
        }
        
    }
}

export default deliveries;
