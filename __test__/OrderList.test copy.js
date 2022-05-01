
/**
 * I komponenten <OrderList> bör en lista med ordrar ritas ut.
 */

// Use fake timers to circumvent animation timers from react-paper (Datatable)
//jest.useFakeTimers();

import { render } from '@testing-library/react-native';
import PickList from '../components/PickList';
import orderModel from '../models/orders';

jest.mock('../models/orders');

const route = {
    params: {
        name: "IKEA",
        address: "Ikeavägen 1",
        zip: "12345",
        order_items: [{
            name: "Hortensia",
            amount: 2,
            location: "A",
            product_id: 1,
        }]

    },
};

const order = route.params;

console.log(order.order_items);

const navigation = () => false;

const setProducts = () => false;



test('List product and order information', async () => {
    const getAllProductsResponse = {
        name: "Hortensia",
        stock: 100,
        id: 1
    };
    const result = productModel.getAllProducts.mockResolvedValue(getAllProductsResponse);
    console.log(result);
    const { debug } = render(<PickList route={route} navigation={navigation} setProducts={setProducts} />);
    console.log(`Order: ${order.order_items[0].name}`);
    debug("Picklist component");

});