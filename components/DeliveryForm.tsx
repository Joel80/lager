import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, Pressable, View, Button } from "react-native";
import { Base, Typography, Forms, ButtonStyle, DatePickerStyle, PickerStyle } from '../styles/index.js';
import Delivery from '../interfaces/delivery';
import deliveryModel from '../models/deliveries';
import productModel from '../models/products';
import Product from '../interfaces/product';


function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(() => {
            (async () => {
                setProducts(await productModel.getAllProducts());
            })();
        
    }, []);

    const itemsList = products.map((prod: Product, index: number) => {
        productsHash[prod.id] = prod;
        return <Picker.Item 
                    key={index} 
                    label={prod.name} 
                    value={prod.id}
                    color='#357960'
                />  
    });

    return (
        <Picker
            style={PickerStyle.pickerStyle}
            selectedValue={props.delivery?.product_id || "Select a value"} 
            onValueChange={(itemValue) => {
                console.log(`selected prouct: ${itemValue}`)
                props.setDelivery({...props.delivery, product_id: itemValue});
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props) {

    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());

    console.log(`dropdowndate: ${dropDownDate}`)

    const [show, setShow] = useState<Boolean>(false);
    
    const showDatePicker = () => {
        setShow(true);
    };

 
    return (
        <View>
            {Platform.OS === "android" && (
                <Pressable
                    style={() => [{}, ButtonStyle.button]}
                    onPress={showDatePicker}
                >
                    <Text style={ButtonStyle.buttonText}>Visa datumväljare</Text>
                </Pressable>
            )}

            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    style={DatePickerStyle.datePickerStyle}
                    display='default'
                    
                    onChange={(event, date) => {
                        console.log("in on change");
                        console.log(date);
                        if(date !== undefined) {
                            setDropDownDate(date);
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV'),
                            });
                        }

                        setShow(false);
                    }}
                    
                    value={dropDownDate}  
                     
                />
            )}
            
        </View>
        
    );
}


export default function DeliveryForm({navigation, setProducts}) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    const [showErrorMessage, setShowErrorMessage] = useState<Boolean>(false);

    let missingFields;
    //const [productList, setProductList] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            const productList = await productModel.getAllProducts();
            console.log(productList);
            const firstProduct: Product = productList[0];
            console.log(firstProduct);
            setDelivery({...delivery, product_id: firstProduct.id});
            setDelivery({...delivery, delivery_date: new Date().toLocaleDateString('se-SV')});
            setCurrentProduct(firstProduct);
            
        })();
    }, []);


    
    console.log(delivery);


    //console.log(`Drop down date: ${dropDownDate}`);

    //console.log(`delivery.delivery_date: ${delivery.delivery_date}`);

    //console.log(`delivery.product_id: ${delivery.product_id}`);

    //console.log(`delivery.amount: ${delivery.amount}`);

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery)

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);

        setProducts(await productModel.getAllProducts());
        
        navigation.navigate("List", {reload: true});
    }

    
    return (
        <ScrollView style={[Base.base, Base.container, Base.mainBackgroundColor]}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Text style={[Typography.header2, Base.mainTextColor]}>Ny inleverans</Text>
                
                <Text style={[Typography.label, Base.mainTextColor]}>Produkt (obligatoriskt)</Text>
                <ProductDropDown
                    delivery={delivery}
                    setDelivery={setDelivery}
                    setCurrentProduct={setCurrentProduct}
                />

                <Text style={[Typography.label, Base.mainTextColor]}>Antal (obligatoriskt)</Text>
                <TextInput 
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setDelivery({...delivery, amount: parseInt(content) || undefined})
                    }}
                    value={delivery?.amount?.toString()}
                    keyboardType="numeric"
                    selectionColor='#357960'
                />

                <Text style={[Typography.label, Base.mainTextColor]}>Datum (obligatoriskt)</Text>
                    <DateDropDown
                        delivery={delivery}
                        setDelivery={setDelivery}
                    />

                <Text style={[Typography.label, Base.mainTextColor]}>Kommentar (valfritt)</Text>
                <TextInput 
                    style={[Forms.input]}
                    onChangeText={(content: string) => {
                        setDelivery({...delivery, comment: content})
                    }}
                    value={delivery?.comment}
                />

                {(showErrorMessage) && (
                    <View>
                        <Text style={[Typography.label, Base.mainTextColor]}>Var vänlig fyll i alla obligatoriska fält: </Text>
                        { missingFields }
                    </View>
                )}
                

                <Pressable
                        style={() => [{}, ButtonStyle.button]}
                        onPress={ () => {
                            if(delivery.product_id !== undefined && delivery.amount !== undefined && delivery.delivery_date !== undefined) {
                                setShowErrorMessage(false);
                                addDelivery();
                            } else {
                                setShowErrorMessage(true);
                            }
                        }}
                    >
                        <Text style={ButtonStyle.buttonText}>Gör inleverans</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </ScrollView>
    )
} 