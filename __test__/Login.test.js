import { render } from '@testing-library/react-native';
import Login from '../components/auth/Login';

/**
 * Use case: I komponenten <Login> bör rubriken Logga in ritas ut.
 */


// Mock models/auth
jest.mock("../models/auth", () => "authModel");

const setIsLoggedIn = () => false;

const navigation = () => false;

test('heading Logga in should exist', async () => {
    const { getAllByText, debug } = render(<Login navigation={navigation} setIsLoggedin={setIsLoggedIn} />);
    const header = await getAllByText('Logga in');
    
    //debug("Login component");

    expect(header).toBeDefined();
    
});
