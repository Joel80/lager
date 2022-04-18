import { ScrollView, Text, Pressable } from "react-native";
import { Base, ButtonStyle, Typography } from "../styles";
import authModel from "../models/auth";


export default function Invoices({setIsLoggedIn}) {

    return (
        <ScrollView style={[Base.base, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Invoices</Text>
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