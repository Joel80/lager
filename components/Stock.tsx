import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from '../config/config.json';

function StockList() {
    // Interface for Product, defines the properties and
    // their types for a Product
    interface Product {
        name: string; 
        stock: number; 
        article_number: string; 
        description: string; 
        specifiers: string; 
        location: string; 
        price: number;
    }
    
    const [products, setProducts] = useState([]);

    useEffect (() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);

    // product is a Product
    const list = products.map((product: Product, index) => <Text style={prodStyles.product} key={index}>{ product.name } - { product.stock }</Text>);

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

