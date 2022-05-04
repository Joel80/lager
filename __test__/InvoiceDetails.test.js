
/**
 * I komponenten <InvoiceDetails> bör alla detaljer från en faktura ritas ut.
 */


import { render } from '@testing-library/react-native';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import InvoiceDetails from '../components/InvoiceDetails';

const fakeInvoice = {
    id: 2500,
    order_id: 33333,
    name: "Jane Doe",
    address: "Some street",
    zip: "12345",
    city: "Some city",
    country: "Some country",
    total_price: 200,
    creation_date: "2022-05-04",
    due_date: "2022-06-04"
}

const route = {
    params: {
        invoice: fakeInvoice
    }
};

//console.log(route.params)

test('Invoice details are rendered correctly', async () => {
    
    const { getByText, debug } =  render(<InvoiceDetails route={route} />);
    //debug("Invoice component");

    const id = await getByText('2500', { exact: false });
    const orderId = await getByText('33333', { exact: false });
    const name = await getByText('Jane Doe', { exact: false });
    const address = await getByText("Some street", { exact: false });
    const zip = await getByText("12345", { exact: false });
    const city = await getByText("Some city", { exact: false });
    const country = await getByText("Some country", { exact: false });
    const totalPrice = await getByText("200", { exact: false });
    const creationDate = await getByText("2022-05-04", { exact: false });
    const dueDate = await getByText("2022-06-04", { exact: false });

    expect(id).toBeDefined();
    expect(orderId).toBeDefined();
    expect(name).toBeDefined();
    expect(address).toBeDefined();
    expect(zip).toBeDefined();
    expect(city).toBeDefined();
    expect(country).toBeDefined();
    expect(totalPrice).toBeDefined();
    expect(creationDate).toBeDefined();
    expect(dueDate).toBeDefined();
});