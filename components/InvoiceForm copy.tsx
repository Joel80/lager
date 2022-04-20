import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, Pressable, View, Button } from "react-native";
import { Base, Typography, Forms, ButtonStyle, DatePickerStyle, PickerStyle } from '../styles/index.js';
import Invoice from '../interfaces/invoice';
import invoiceModel from '../models/invoices';
import orderModel from '../models/orders';
import authModel from '../models/auth';
import Order from '../interfaces/order';
import productModel from '../models/products';

function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }

    return "" + number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`
}

function OrdersToInvoiceDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);
    let orderHash: any = {};

    useEffect(() => {
            (async () => {
                setOrders(await orderModel.getOrders());
            })();
        
    }, []);

    const ordersToInvoiceList = orders
    .filter(order => order.status === "Skickad")
    .map((order: Order, index: number) => {
        orderHash[order.id] = order;
        const itemLabel = order.name + " - " + order.id.toString(); 
        return <Picker.Item 
                    key={index} 
                    label= {itemLabel}
                    value={order.id}
                    color='#357960'
                />  
    });

   

    return (
        <Picker
            style={PickerStyle.pickerStyle}
            selectedValue={props.invoice?.order_id} 
            onValueChange={(itemValue) => {
                props.setInvoice({...props.invoice, order_id: itemValue});
                props.setCurrentOrder(orderHash[itemValue]);
            }}>
            {ordersToInvoiceList}
        </Picker>
    );
   
}


function DateDropDown(props) {

    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());

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

                        if(date !== undefined) {
                            setDropDownDate(date);
                            props.setInvoice({
                                ...props.invoice,
                                due_date: formatDate(date),
                            });

                            //console.log(delivery)
                        }

                        setShow(false);
                    }}
                    
                    value={dropDownDate}  
                     
                />
            )}
            
        </View>
        
    );
}



export default function InvoiceForm({navigation, setIsLoggedIn, setInvoices}) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    const [showErrorMessage, setShowErrorMessage] = useState<Boolean>(false);

    const [showForm, setShowForm] = useState<Boolean>(false);

    const showInvoiceForm = () => {
        setShowForm(true);
    }

    useEffect(() => {
        (async () => {
            const orderList = (await orderModel.getOrders()).filter(order => order.status === "Skickad");

            if (orderList.length !== 0) {
                const firstOrder: Order = orderList[0];
                let invoiceTotalPrice: number = 0;

                for (const item of firstOrder.order_items) {
                    const product = productModel.getProduct(item.product_id);
                    invoiceTotalPrice += item.amount * item.price
                }

                setInvoice(
                    {
                        ...invoice, order_id: firstOrder.id, 
                        creation_date: new Date().toLocaleDateString('se-SV'), 
                        due_date: new Date().toLocaleDateString('se-SV'),
                        total_price: invoiceTotalPrice

                    }
                )

                setCurrentOrder(firstOrder);

                showInvoiceForm();
            }
            
        })();

    }, []);

    
    async function addInvoice() {

        let invoiceTotalPrice: number = 0;

        console.log(currentOrder);

        for (const item of currentOrder.order_items) {
            invoiceTotalPrice += item.amount * item.price
        }

        setInvoice({...invoice, total_price: invoiceTotalPrice})

        await invoiceModel.addInvoice(invoice);

        setInvoices(await invoiceModel.getInvoices());

        const updatedOrder = {
            ...currentOrder,
            status_id: 600
        };

        console.log(`updated order: ${updatedOrder}`);

        await orderModel.updateOrder(updatedOrder);
        
        navigation.navigate("List", {reload: true});
    }

    if (showForm) {
        return (
            <ScrollView style={[Base.base, Base.container, Base.mainBackgroundColor]}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Text style={[Typography.header2, Base.mainTextColor]}>Ny faktura</Text>
                    
                    <Text style={[Typography.label, Base.mainTextColor]}>Välj order att fakturera (obligatoriskt)</Text>
                    <OrdersToInvoiceDropDown
                        invoice={invoice}
                        setInvoice={setInvoice}
                        setCurrentOrder={setCurrentOrder}
                    />
    
                    <Text style={[Typography.label, Base.mainTextColor]}>Förfallodatum (obligatoriskt)</Text>
                        <DateDropDown
                            invoice={invoice}
                            setInvoice={setInvoice}
                        />
    
                    {(showErrorMessage) && (
                        <View>
                            <Text style={[Typography.label, Base.mainTextColor]}>Var vänlig fyll i alla obligatoriska fält! </Text>
                        </View>
                    )}
                    
    
                    <Pressable
                            style={() => [{}, ButtonStyle.button]}
                            onPress={ () => {
                                if(invoice.order_id !== undefined && invoice.due_date !== undefined) {
                                    setShowErrorMessage(false);
                                    addInvoice();
                                } else {
                                    setShowErrorMessage(true);
                                }
                            }}
                        >
                            <Text style={ButtonStyle.buttonText}>Skapa faktura</Text>
                    </Pressable>
    
                </KeyboardAvoidingView>
            </ScrollView>
        )
    } else {
        return (
        <View style={[Base.base, Base.container, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Ny faktura</Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>Inga ordrar att fakturera</Text>
        </View>
        );
    }
    
} 