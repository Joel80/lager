import { useEffect, useState } from "react";
import { Text, ScrollView, Pressable, View } from 'react-native';
import { Typography, Base, ButtonStyle, DeliveryListStyle } from "../styles";
import Delivery from '../interfaces/delivery';
import deliveryModel from '../models/deliveries'

export default function DeliveriesList({ route, navigation }) {
    let { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState<Delivery[]>([]);

    if (reload) {
        reloadDeliveries();
        //reload = false;
    }

    async function reloadDeliveries() {
        console.log("Reloading deliveries");
        setAllDeliveries(await deliveryModel.getDeliveries());
        navigation.navigate("List", {reload:false});
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    let listOfDeliveries;

    if (allDeliveries.length === 0) {
        listOfDeliveries = <Text style={[Typography.normal, Base.mainTextColor]}>Inga tidigare inleveranser</Text>
    } else {
        listOfDeliveries = allDeliveries.map((delivery, index) => 
        <View style={DeliveryListStyle.listStyle} key={index}>
            <Text style={[Typography.normal, Base.mainTextColor]} >
                Datum: { delivery.delivery_date }
            </Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>
               Produkt: { delivery.product_name }
            </Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>
                Antal: {delivery.amount} 
            </Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>
               Kommentar: { delivery.comment}
            </Text>
        </View>
        );
    }
    

    return (
        <ScrollView style = {[Base.container, Base.base, Base.mainBackgroundColor]}>
                <Text style={[Typography.header2, Base.mainTextColor]}>Inleveranser</Text>
                {listOfDeliveries}
                <Pressable style={() => [{}, ButtonStyle.button]}
                        onPress= { () => {
                            navigation.navigate('Form');
                        }}>
                        <Text style={ButtonStyle.buttonText}>Ny inleverans</Text>
                </Pressable>
        </ScrollView>
    )
}