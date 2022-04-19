import { ScrollView, Text, Pressable } from "react-native";
import { Base, ButtonStyle, Typography } from "../styles";
import authModel from "../models/auth";
import Invoice from "../interfaces/invoice";


export default function InvoiceDetails({route, setIsLoggedIn, navigation}) {
    const { invoice } = route.params;
    console.log(invoice);

    return (
        <ScrollView style={[Base.base, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Fakturadetaljer</Text>
            <Text style={[Typography.normal, Base.mainTextColor]} >
                Id: { invoice.id }
            </Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>
               Order-id: { invoice.order_id }
            </Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>
                Namn: {invoice.name} 
            </Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>
               Adress: { invoice.address}
            </Text>

            <Text style={[Typography.normal, Base.mainTextColor]}>
               Land: { invoice.country}
            </Text>

            <Text style={[Typography.normal, Base.mainTextColor]}>
               Totalt pris: { invoice.total_price}
            </Text>

            <Text style={[Typography.normal, Base.mainTextColor]}>
               Skapad: { invoice.creation_date}
            </Text>

            <Text style={[Typography.normal, Base.mainTextColor]}>
               Förfallodatum: { invoice.due_date}
            </Text>

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
