import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoicesList from './InvoicesList';
import InvoiceDetails from './InvoiceDetails';
import InvoiceForm from './InvoiceForm';

const Stack = createNativeStackNavigator();

export default function Invoice(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
            {(screenProps) => <InvoicesList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <InvoiceDetails {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen> 
            <Stack.Screen name="Form">
                {(screenProps) => <InvoiceForm {...screenProps} setIsLoggedIn={props.setIsLoggedIn} setInvoices={props.setInvoices} />}
            </Stack.Screen> 
        </Stack.Navigator>  
    );
}