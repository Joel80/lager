
/**
 * I komponenten <OrderList> bör en lista med ordrar ritas ut.
 */

// Use fake timers to circumvent animation timers from react-paper (Datatable)
//jest.useFakeTimers();

import { act, render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';
import orderModel from '../models/orders';

jest.mock('../models/orders');

/* jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
})); */

const route = {params: false};

const navigation = () => false;



test('List orders', async () => {
    const {getByText} = render(<OrderList route={route} navigation={navigation} />);
    const result = await getByText('IKEA');
    expect(result).toBeDefined();
});