import { render } from '@testing-library/react-native';
import Register from '../components/auth/Register';

/**
 * Use case: I komponenten <Register> bör 'Registrera' ritas ut.
 */


// Mock models/auth
jest.mock("../models/auth", () => "authModel");

const navigation = {};

test('heading Registrera should exist', async () => {
    const { getAllByText, debug } = render(<Register navigation={navigation} />);
    const header = getAllByText('Registrera');
    
    //debug("Login component");

    expect(header).toBeDefined();
    
});

