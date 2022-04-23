import { useState, useEffect} from 'react';
import { View, Text, Pressable } from 'react-native';
import Order from '../interfaces/order';
import orderModel from '../models/orders';
import { Base, Typography, ButtonStyle } from '../styles/index.js';

export default function OrderList( { route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        console.log("Reloading list of order that are shipable");
        setAllOrders(await orderModel.getOrders());
        navigation.navigate("List", {reload:false});
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Pressable
                style={() => [{}, ButtonStyle.button]}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            >
                <Text style={ButtonStyle.buttonText}>{order.name}</Text>
            </Pressable>
        });
    
    return (
        <View style={[Base.container, Base.base, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Ordrar redo att skickas</Text>
            {listOfOrders}
        </View>
    )
}
