import { useState, useEffect } from "react";
import { ScrollView, Text, Pressable } from "react-native";
import { Base, ButtonStyle, Typography, TableStyle } from "../styles";
import authModel from "../models/auth";
import Invoice from '../interfaces/invoice';
import invoiceModel from '../models/invoices';
import { DataTable } from 'react-native-paper';


export default function Invoices({route, setIsLoggedIn, navigation}) {
    let { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);

    if (reload) {
        reloadInvoices();
        reload = false;
    }

    async function reloadInvoices() {
        console.log("Reloading invoices");
        setAllInvoices(await invoiceModel.getInvoices());
        navigation.navigate("List", {reload:false});
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    let invoicesList;

    //console.log(`All invoices: ${allInvoices}`);

    if (allInvoices.length === 0) {
        invoicesList = false;

    } else {
        invoicesList = allInvoices.map((invoice: Invoice, index: number) => {
            return (
                
                <DataTable.Row key={index}>
                    <DataTable.Cell style={TableStyle.tableCellLeft}
                        
                         onPress= { () => {
                            navigation.navigate('Details', {
                                invoice: invoice
                            })

                        }}>
                        <Text style={[Typography.invoiceText, Base.mainTextColor]}>{invoice.order_id}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={TableStyle.tableCellMiddle}
                         onPress= { () => {
                            navigation.navigate('Details', {
                                invoice: invoice
                            })

                        }}
                    >
                        <Text style={[Typography.invoiceText, Base.mainTextColor]}>{invoice.due_date}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={TableStyle.tableCellRight}
                         onPress= { () => {
                            navigation.navigate('Details', {
                                invoice: invoice
                            })

                        }}
                    >
                        <Text style={[Typography.invoiceText, Base.mainTextColor]}>{invoice.total_price}</Text>
                    </DataTable.Cell>
                </DataTable.Row>
            );  
        });

    }

    if (invoicesList) {
        return (

            <ScrollView style={[Base.base, Base.mainBackgroundColor]}>
                <Text style={[Typography.header2, Base.mainTextColor]}>Fakturor</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>Tryck på en rad för att visa detaljer</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={TableStyle.tableTitleLeft}><Text style={[Typography.invoiceHeader, Base.mainTextColor]}>Order</Text></DataTable.Title>
                        <DataTable.Title style={TableStyle.tableTitleMiddle}><Text style={[Typography.invoiceHeader, Base.mainTextColor]}>Förfaller</Text></DataTable.Title>
                        <DataTable.Title style={TableStyle.tableTitleRight}><Text style={[Typography.invoiceHeader, Base.mainTextColor]}>Pris</Text></DataTable.Title>
                    </DataTable.Header>
                    {invoicesList}
                </DataTable>
    
    
                <Pressable style={() => [{}, ButtonStyle.button]}
                    onPress= { () => {
                        navigation.navigate("Form")
                    }}>
                    <Text style={ButtonStyle.buttonText}>Skapa ny faktura</Text>
                </Pressable>
    
                <Pressable style={() => [{}, ButtonStyle.button]}
                    onPress= { () => {
                        authModel.logout();
                        setIsLoggedIn(false);
                    }}>
                    <Text style={ButtonStyle.buttonText}>Logga ut</Text>
                </Pressable>
            </ScrollView>
            
        );
    } else {
        return (
            <ScrollView style={[Base.base, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Fakturor</Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>Inga fakturor</Text>
            <Pressable style={() => [{}, ButtonStyle.button]}
                        onPress= { () => {
                        navigation.navigate("Form")
                    }}>
                    <Text style={ButtonStyle.buttonText}>Skapa ny faktura</Text>
            </Pressable>
    
            <Pressable style={() => [{}, ButtonStyle.button]}
                onPress= { () => {
                    authModel.logout();
                    setIsLoggedIn(false);
                }}>
                <Text style={ButtonStyle.buttonText}>Logga ut</Text>
            </Pressable>
            </ScrollView>
        );
    }
}
