import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import orderModel from '../models/orders';
import productModel from '../models/products';

export default function PickList({route, navigation, setProducts}) {
    const { order } = route.params;
    const [productList, setProductList] = useState([]);

    useEffect(async () => {
        setProductList(await productModel.getAllProducts());
    }, []);

    console.log(productList);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getAllProducts());
        navigation.navigate("List", {reload: true});
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
                </Text>
    });

 
    let isPickAble = true;

    for (const product of productList) {
        for (const item of order.order_items) {
            if (product.id === item.product_id) {
                if (product.stock < item.amount) {
                    isPickAble = false;
                }
            }
        }
    }

    if (isPickAble) {
        return (
            <View>
                <Text>{order.name}</Text>
                <Text>{order.address}</Text>
                <Text>{order.zip} {order.city}</Text>
    
                <Text>Produkter:</Text>
                {orderItemsList}
                <Button title="Plocka order" onPress={pick}/>
            </View>
        )
    }
    
    
    return (
        <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>
            {orderItemsList}
            <Text>Det saknas varor ordern kan inte plockas</Text>
        </View>
    )   
    
}
