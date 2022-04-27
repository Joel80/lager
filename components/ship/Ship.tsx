import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShippingList from './ShippingList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Ship(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShippingList} />
            <Stack.Screen name="Details">
                {(screenProps) => <ShipOrder {...screenProps} />}
            </Stack.Screen> 
        </Stack.Navigator>  
    );
}