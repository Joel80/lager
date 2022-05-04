
/**
 * I komponenten <OrderList> bör en lista med ordrar som har status "Ny" ritas ut.
 */


import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';
import orderModel from '../models/orders';


// Mock the orders model
jest.mock('../models/orders');

const route = {params: true};

const navigation = () => false;

// Array with fake orders
const resp = [
    { name: "IKEA", status: "Ny"},
    { name: "BTH", status: "Ny"},
    { name: "Plantagen", status: "Packad"}
];

// Set return value of mock for orderModel.getOrders() to resp
orderModel.getOrders.mockReturnValue(resp);


test('Orders with status "Ny" are rendered', async () => {
    
    const {findByText, getByText, queryByText} =  render(<OrderList route={route} navigation={navigation} />);
    
    // Wait for the text IKEA to be displayed (wait for the state to update when async reloadOrders is called and setAllOrders is executed )
    // this is done by using findBy rather than getBy. When IKEA is loaded the other orders will be loaded too. 
    const ikea = await findByText('IKEA', { exact: false });

    expect(ikea).toBeDefined();
    
    // Use getBy here to avoid warning you get with several findBy:s
    const bth = await getByText('BTH', { exact: false });

    expect(bth).toBeDefined();

    // Check that element with text 'Plantagen' is not rendered (status 'Packad') 
    expect(await queryByText('Plantagen')).toBeNull();        
});