import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Deliveries from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Delivery(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={Deliveries} />
            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen> 
        </Stack.Navigator>  
    );
}