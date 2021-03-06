import { useState, useEffect} from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import config from './../config/config.json';
import Order from '../interfaces/order';
import orderModel from '../models/orders';
import { Base, Typography, ButtonStyle } from '../styles/index.js';

export default function OrderList( { route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    

    if (reload) {
        reloadOrders();
        route.params = false;
    }

    async function reloadOrders() {
        console.log("Reloading orders");
        setAllOrders(await orderModel.getOrders());
        console.log(`Done loading`);
        console.log(`All orders: ${allOrders}`);
        //navigation.navigate("List", {reload:false});
    }

    useEffect(() => {
        (async () => {
            setAllOrders(await orderModel.getOrders());
        })();
        //reloadOrders();
        
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Pressable
                style={() => [{}, ButtonStyle.button]}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
                testID="orderDetailButton"

            >
                <Text style={ButtonStyle.buttonText}>{order.name}</Text>
            </Pressable>
        });
    
    return (
        <View style={[Base.container, Base.base, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    )
}
