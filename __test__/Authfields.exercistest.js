import { fireEvent, render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

/**
 * Use case: I komponenten <Authfields> bör fält för e-post och lösenord samt en knapp för att logga in ritas ut.
 * När texten ändras i fälten ska egenskaperna auth.email och auth.password ändras. När användaren trycker på 
 * knappen ska den funktion som skickas in som submit-argument anropas. 
 */



let auth = {};

const setAuth = (newAuth) => {
    auth = newAuth;
};

const mockSubmit = jest.fn();

const navigation = () => false;

const title = "Logga in"

test('fields for email and password should exist', async () => {
    const { getAllByText, getByTestId, getByA11yLabel } = render(<AuthFields 
        auth={auth} 
        setAuth={setAuth} 
        title={title} 
        submit={mockSubmit} 
        navigation={navigation} 
    />);

    
    // Check that all elements exist
    const titleElements = getAllByText(title);
    const email = await getByTestId('email-field');
    const password = await getByTestId('password-field');
    const a11yLabel = `${title} genom att trycka`;
    const submitButton = getByA11yLabel(a11yLabel); 
    
    expect(titleElements.length).toBe(2);
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(submitButton).toBeDefined();
    
    // Check that setting auth.email and auth.password works
    const fakeEmail = "fake@email.com";
    fireEvent.changeText(email, fakeEmail);

    expect(auth?.email).toEqual(fakeEmail);

    const fakePassword = "fAkepass!1";
    fireEvent.changeText(password, fakePassword);

    expect(auth?.password).toEqual(fakePassword);
    
    // Check that pressing the submitButton calls the submitted function
    fireEvent.press(submitButton);

    expect(mockSubmit).toHaveBeenCalled();
    
});
