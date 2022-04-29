import { render } from '@testing-library/react-native';
import Stock from '../components/Stock';

/**
 * Use case: I komponenten <Stock> bör rubriken 'Lagerförteckning' finnas.
 */

jest.mock("../components/StockList", () => "StockList");

test('header should exist containing text Lagerförteckning', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});
