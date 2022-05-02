
/**
 * I komponenten <OrderList> bör en lista med ordrar ritas ut.
 */

// Use fake timers to circumvent animation timers from react-paper (Datatable)
//jest.useFakeTimers();

import { render/* , act  */} from '@testing-library/react-native';
import OrderList from '../components/OrderList';
import orderModel from '../models/orders';
import { act } from 'react-dom/test-utils';
//import TestRenderer from 'react-test-renderer';
//const {act} = TestRenderer;

// Mock the order model module
jest.mock('../models/orders');

const route = {params: true};

const navigation = () => false;

const fakeOrder = [{
    name: "IKEA",
    status: "Ny"       
}];

// Set orderModel.getOrders to return the fakeOrder
orderModel.getOrders.mockReturnValue(fakeOrder);


test('List orders', async () => {
    //const result = orderModel.getOrders();
    //console.log(result);

    let component;
    // Use act() to let component render and update state before asserting
    await act(async () => {
        component =  render(<OrderList route={route} navigation={navigation} />);
    })

    //console.log(`Component: ${component}`);
    const order = await component.getByText('IKEA', { exact: false });
    component.debug("Orderlist component");
   
    expect(order).toBeDefined();
  
        
});