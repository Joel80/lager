import { render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

/**
 * Use case: I komponenten <Authfields> bör fält för e-post och lösenord ritas ut.
 */



const auth = {};

const setAuth = () => false;

const title = "";

const submit = () => false;

const navigation = () => false;

test('fields for email and password should exist', async () => {
    const { getByText } = render(<AuthFields auth={auth} setAuth={setAuth} title={title} submit= {submit} navigation={navigation} />);
    const email = await getByText('E-post');
    const password = await getByText('Lösenord')

    expect(email).toBeDefined();
    expect(password).toBeDefined();
    
});
