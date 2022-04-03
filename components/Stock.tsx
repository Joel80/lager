import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from '../config/config.json';
import OrderItem from '../interfaces/order_item';
import { Base, Typography } from '../styles/index.js'

function StockList() {
        
    const [products, setProducts] = useState([]);

    useEffect (() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);

    // product is a orderItem
    const list = products.map((product: OrderItem, index) => <Text style={[Typography.normal, Base.mainTextColor]} key={index}>{ product.name } - { product.stock }</Text>);

    return (
        <View>
            {list}
        </View>
);
    
}

export default function Stock() {
    return (
        <View>
            <Text style={[Typography.header3, Base.mainTextColor]}>Lagerförteckning</Text>
            <StockList />
        </View>
    );
}
