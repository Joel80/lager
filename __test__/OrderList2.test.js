
/**
 * I komponenten <OrderList> bör en lista med ordrar ritas ut.
 */


import { render, waitFor} from '@testing-library/react-native';
import OrderList from '../components/OrderList';
import orderModel from '../models/orders';
//import { act } from 'react-dom/test-utils';
//import TestRenderer from 'react-test-renderer';
//const {act} = TestRenderer;
jest.mock('../models/orders');

const route = {params: true};

const navigation = () => false;

const resp = [
    { name: "IKEA", status: "Ny"},
    { name: "BTH", status: "Ny"},
    { name: "Plantagen", status: "Packad"}
];

orderModel.getOrders.mockReturnValue(resp);


test('List orders', async () => {
    const result = orderModel.getOrders();
    console.log(result);
    //console.log(resp);
    
    //const {getByText} =  render(<OrderList route={route} navigation={navigation} />);

    const {findByText, getByText} =  render(<OrderList route={route} navigation={navigation} />);
    // Wait for the text IKEA to be displayed (wait for the state to update when async reLoadOrders is called and setAllOrders is executed on )
    //await waitFor(() => expect(getByText('IKEA')).toBeTruthy());
    //await waitFor(() => expect(getByText('IKEA')).toBeTruthy());
    //await waitFor(() => expect(getByText('BTH')).toBeTruthy());

    //console.log(`Component: ${component}`);

    // Wait for the text IKEA to be displayed (wait for the state to update when async reLoadOrders is called and setAllOrders is executed on )
    // this is done by using findBy rather than getBy 
    const ikea = await findByText('IKEA', { exact: false });
    expect(ikea).toBeDefined();

    // Use getBy here to avoid warning on you used async act without await... which you get with several findBy:s
    const bth = await getByText('BTH', { exact: false }); 
    expect(bth).toBeDefined();

    
    //const bth = await findByText('BTH', { exact: false }); 
    //const plantagen = await findByText('Plantagen', {exact: false}) || null;
    //component.debug("Orderlist component");
    //const ikea = await getByText('IKEA', { exact: false });
    
    //
    //expect(await findByText('Plantagen', { exact: false })).not.toBeDisplayed();
    
  
        
});