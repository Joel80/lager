import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from '../config/config.json';
import Product from '../interfaces/product';
import { Base, Typography } from '../styles/index.js'
import productModel from '../models/products';
import { DataTable } from 'react-native-paper';


function StockList({products, setProducts}) {
    
    useEffect(async () => {
        setProducts(await productModel.getAllProducts());
    }, []);

    const list = products.map((product: Product, index: number) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell><Text style={[Typography.normal, Base.mainTextColor]}>{product.name}</Text></DataTable.Cell>
                <DataTable.Cell numeric><Text style={[Typography.normal, Base.mainTextColor]}>{product.stock}</Text></DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title><Text style={[Typography.header3, Base.mainTextColor]}>Produkt</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={[Typography.header3, Base.mainTextColor]}>Antal i lager</Text></DataTable.Title>
            </DataTable.Header>
            {list}
        </DataTable>
    );


    
}

export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={[Typography.header2, Base.mainTextColor]}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}
