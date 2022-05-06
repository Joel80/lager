import { fireEvent, render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';
import productModel from '../models/products';
import deliveryModel from '../models/deliveries';

/**
 * Use case: I komponenten <DeliveryForm> bör en rubrik (Ny inleverans), en produktväljare, en datumväljare, ett fält för antal och
 * en knapp ritas ut. När användaren trycker på knappen ska funktionen deliveryModel.addDelivery() anropas.
 */

jest.mock('../models/products')
// Fake product list
const fakeProducts = [
    {
        name: "fake",
        id: 1
    }
]
const setProducts = () => false;

productModel.getAllProducts = jest.fn().mockReturnValue(fakeProducts).mockName('getAllProducts');

deliveryModel.addDelivery = jest.fn().mockName('addDelivery');

productModel.updateProduct = () => false;

const navigation = () => false;



test('heading, pickers for product and date, field for amount and submit button renders, pressing submit calls deliveryModel.addDelivery', async () => {
    const { getByText, getByTestId, findByTestId } = render(<DeliveryForm 
        setProducts={setProducts}
        navigation={navigation} 
    />);

    
    // Check that all elements exist
    const heading = getByText("Ny inleverans");
    const productPicker = await findByTestId('product-picker');
    const amountField = await getByTestId('amount-field');
    const datePicker = await getByTestId('delivery-date-picker');
    const submitButton = await getByTestId('submit-button');
    
    
    
    expect(heading).toBeDefined();
    expect(productPicker).toBeDefined();
    expect(amountField).toBeDefined();
    expect(datePicker).toBeDefined();
    expect(submitButton).toBeDefined();


   
    // Change amount value, the way the component is set up
    // this should be enough to be able to press the button and
    // add a delivery
    const amount = 2;
    fireEvent.changeText(amountField, amount);

       
    // Check that pressing the submitButton calls
    // deliveryModel.addDelivery
    fireEvent.press(submitButton);
    
    expect(deliveryModel.addDelivery).toHaveBeenCalled();
   
});
