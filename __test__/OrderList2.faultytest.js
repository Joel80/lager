
/**
 * I komponenten <OrderList> bör en lista med ordrar ritas ut.
 */

// Use fake timers to circumvent animation timers from react-paper (Datatable)
//jest.useFakeTimers();

import { render, act } from '@testing-library/react-native';
import OrderList from '../components/OrderList';
import orderModel from '../models/orders';
//import { act } from 'react-dom/test-utils';
//import TestRenderer from 'react-test-renderer';
//const {act} = TestRenderer;
jest.mock('../models/orders');

const route = {params: true};

const navigation = () => false;

const resp = [{
    name: "IKEA",
    status: "Ny"       
}];

orderModel.getOrders.mockReturnValue(resp);


test('List orders', async () => {
    const result = orderModel.getOrders();
    console.log(result);
    //console.log(resp);
    
    const {getByText} =  render(<OrderList route={route} navigation={navigation} />);


    //console.log(`Component: ${component}`);
    const order = await getByText('IKEA', { exact: false });
    //component.debug("Orderlist component");
   
    expect(order).toBeDefined();
  
        
});