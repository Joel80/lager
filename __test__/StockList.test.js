
/**
 * Use- case: I Lagerförteckningen ska det finnas en lista med produkter. Listan ska innehålla produktens namn och lagersaldo.
 */

// Use fake timers to circumvent animation timers from react-paper (Datatable)
jest.useFakeTimers();

import { render } from '@testing-library/react-native';
import StockList from '../components/StockList';

// Silence warning Animated: `useNativeDriver` is not supported because the native animated module is missing.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


const products = [
    { name: "Shampoo", stock: 2 },
    { name: "Balsam", stock: 3 },
    { name: "Tvål", stock: 15 },
];

const setProducts = () => false;

test('List should contain three items', async () => {
    const { getByText, debug } = render(<StockList products={products} setProducts={setProducts} />);

    //debug("Stocklist component");

    const shampoo = await getByText('Shampoo', { exact: false });
    const balsam = await getByText('Balsam', { exact: false });
    const soap = await getByText('Tvål', { exact: false });

    expect(shampoo).toBeDefined();
    expect(balsam).toBeDefined();
    expect(soap).toBeDefined();
});