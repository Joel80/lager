import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, Pressable, View, Button } from "react-native";
import { Base, Typography, Forms, ButtonStyle } from '../styles/index.js';
import Delivery from '../interfaces/delivery';
import deliveryModel from '../models/deliveries';
import productModel from '../models/products';
import Product from '../interfaces/product';
import { mainBackgroundColor } from '../styles/base.js';

export default function DeliveryForm({navigation}) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());

    const [show, setShow] = useState<Boolean>(false);


    console.log(`Drop down date: ${dropDownDate}`);

    useEffect(() => {
       delivery.delivery_date = dropDownDate.toLocaleDateString('se-SV');
    }, [])

    console.log(`delivery_delivery_date: ${delivery.delivery_date}`);

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery)
        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);
        
        navigation.navigate("List", {reload: true})
    }

    function ProductDropDown(props) {
        const [products, setProducts] = useState<Product[]>([]);
        let productsHash: any = {};

        useEffect(async () => {
            setProducts(await productModel.getAllProducts());
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
                style={[Base.secondaryBackgroundColor, Base.secondayTextColor ]}
                selectedValue={props.delivery?.product_id}
                onValueChange={(itemValue) => {
                    props.setDelivery({...props.delivery, product_id: itemValue});
                    props.setCurrentProduct(productsHash[itemValue]);
                }}>
                {itemsList}
            </Picker>
        );
    }

    function DateDropDown(props) {
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
                        style={{backgroundColor:'#f2f0e6', marginBottom: 28}}
                        
                        onChange={(event, date) => {
                            setDropDownDate(date);
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV'),
                            });

                            setShow(false);
                        }}

                        value={dropDownDate}   
                    />
                )}
            </View>
            
        );
    }

    return (
        <ScrollView style={[Base.base, Base.container, Base.mainBackgroundColor]}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Text style={[Typography.header2, Base.mainTextColor]}>Ny inleverans</Text>
                
                <Text style={[Typography.label, Base.mainTextColor]}>Produkt</Text>
                <ProductDropDown
                    delivery={delivery}
                    setDelivery={setDelivery}
                    setCurrentProduct={setCurrentProduct}
                />

                <Text style={[Typography.label, Base.mainTextColor]}>Antal</Text>
                <TextInput 
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setDelivery({...delivery, amount: parseInt(content)})
                    }}
                    value={delivery?.amount?.toString()}
                    keyboardType="numeric"
                    selectionColor='#357960'
                />

                <Text style={[Typography.label, Base.mainTextColor]}>Datum</Text>
                    <DateDropDown
                        delivery={delivery}
                        setDelivery={setDelivery}
                    />

                <Text style={[Typography.label, Base.mainTextColor]}>Kommentar</Text>
                <TextInput 
                    style={[Forms.input]}
                    onChangeText={(content: string) => {
                        setDelivery({...delivery, comment: content})
                    }}
                    value={delivery?.comment}
                />

            
                <Pressable
                        style={() => [{}, ButtonStyle.button]}
                        onPress={ () => {
                            addDelivery();
                        }}
                    >
                        <Text style={ButtonStyle.buttonText}>Gör inleverans</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </ScrollView>
    )
} 