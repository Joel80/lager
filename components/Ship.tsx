import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShippingList from './ShippingList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShippingList} />
            <Stack.Screen name="Details">
                {(screenProps) => <ShipOrder {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen> 
        </Stack.Navigator>  
    );
}