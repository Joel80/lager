
/**
 * I komponenten <OrderList> bör en lista med ordrar ritas ut.
 */

// Use fake timers to circumvent animation timers from react-paper (Datatable)
//jest.useFakeTimers();

import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';
import orderModel from '../models/orders';

jest.mock('../models/orders');

const route = {params: false};

const navigation = () => false;



test('List orders', async () => {
    const resp = {
        name: "IKEA",
        status: "Ny"       
    };
    const result = orderModel.getOrders.mockResolvedValue(resp);
    //console.log(result);
    const { getByText, debug } = render(<OrderList route={route} navigation={navigation} />);
    debug("Orderlist component");

    const product = await getByText('IKEA');

    expect(product).toBeDefined();



});