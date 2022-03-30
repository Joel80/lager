import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from '../config/config.json';

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect (() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product: {name: string, stock: number}, index) => <Text style={prodStyles.product} key={index}>{ product.name } - { product.stock }</Text>);

    return (
        <View>
            {list}
        </View>
);
    
}

export default function Stock() {
    return (
        <View>
            <Text style={prodStyles.productsHeading}>Lagerförteckning</Text>
            <StockList />
        </View>
    );
}

const prodStyles = StyleSheet.create({
    product: {
        color: '#fdfdfd',
        fontSize: 18,
        paddingBottom: 2
        /* textAlign: 'center' */
    },
    productsHeading: {
        color: '#fdfdfd', 
        fontSize: 24,
        paddingTop: 16,
        /* textAlign: 'center' */
    }
})

