import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import orderModel from '../models/orders';
import productModel from '../models/products';
import Product from '../interfaces/product';
import { Base, Typography, ButtonStyle } from '../styles/index.js';

export default function PickList({route, navigation, setProducts}) {
    const { order } = route.params;
    const [productList, setProductList] = useState<Product[]>([]);

    useEffect(async () => {
        setProductList(await productModel.getAllProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getAllProducts());
        navigation.navigate("List", {reload: true});
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                style={[Typography.normal, Base.mainTextColor]}
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
            <View style={[Base.container, Base.base, Base.mainBackgroundColor]}>
                <Text style={[Typography.header2, Base.mainTextColor]}>Orderdetaljer</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>{order.name}</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>{order.address}</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>{order.zip} {order.city}</Text>
    
                <Text style={[Typography.header3, Base.mainTextColor]}>Produkter:</Text>
                {orderItemsList}
                <Pressable style={() => [{}, ButtonStyle.button]}
                    onPress={pick}>
                    <Text style={ButtonStyle.buttonText}>Plocka order</Text>
                </Pressable>
            </View>
        )
    }
    
    
    return (
        <View style={[Base.container, Base.base, Base.mainBackgroundColor]}>
                <Text style={[Typography.header2, Base.mainTextColor]}>Orderdetaljer</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>{order.name}</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>{order.address}</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>{order.zip} {order.city}</Text>
    
                <Text style={[Typography.header3, Base.mainTextColor]}>Produkter:</Text>
                {orderItemsList}
                <Text style={[Typography.normal, Base.mainTextColor]}>Det saknas varor, ordern kan inte plockas</Text>
            </View>
    )   
    
}
