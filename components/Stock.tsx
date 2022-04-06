import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from '../config/config.json';
import Product from '../interfaces/product';
import { Base, Typography } from '../styles/index.js'
import productModel from '../models/products';

function StockList({products, setProducts}) {
    
    useEffect(async () => {
        setProducts(await productModel.getAllProducts());
    }, []);

    const list = products.map((product: Product, index: number) => <Text style={[Typography.normal, Base.mainTextColor]} key={index}>{ product.name } - { product.stock }</Text>);

    return (
        <View>
            {list}
        </View>
);
    
}

export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={[Typography.header3, Base.mainTextColor]}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}
