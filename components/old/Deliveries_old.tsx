import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries() {
    return (
        <Stack.Navigator initialRouteName = "List">
            <Stack.Screen name="List" component={DeliveriesList}/>
            <Stack.Screen name="Form" component={DeliveryForm}/>
        </Stack.Navigator>
    )
}
