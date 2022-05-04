import { useState } from "react";
import { ScrollView, Text, TextInput, Pressable } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Typography, Forms, Base, ButtonStyle} from '../../styles';

export default function AuthFields ({auth, setAuth, title, submit, navigation }) {
    const [validPassword, setValidPassword] = useState<Boolean>(false);
    const [validEmail, setValidEmail] = useState<Boolean>(false);

    function validatePassword (text: string) {
        let validPassword = false;
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/
        if (text.match(pattern)) {
            validPassword = true;
            
        } else {
            showMessage({
                message: "Icke giltigt lösenord",
                description: "Lösenordet måste innehålla minst 4 tecken, små och stora bokstäver och ett specialtecken",
                type: "warning"
            });
            
            validPassword = false;
        }

        setValidPassword(validPassword);
    }

    function validateEmail (text: string) {
        let validEmail = false;
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (text.match(pattern)) {
            validEmail = true;
        } else {
            showMessage({
                message: "Icke giltig epostadress",
                description: "E-post måste uppfylla cccc@cc.cc",
                type: "warning"
            });

            validEmail = false;
        }

        setValidEmail(validEmail);
    }

    return (
    <ScrollView style={[Base.base, Base.mainBackgroundColor]}>
        <Text style={[Typography.header2, Base.mainTextColor]}>{title}</Text>
        <Text style={[Typography.label, Base.mainTextColor]}>E-post</Text>
        <TextInput            
            style={Forms.input}
            onChangeText={(content: string) =>  {
                validateEmail(content);
                setAuth({...auth, email: content})
            }}
            autoCapitalize="none"
            autoCorrect={false}
            value={auth?.email}
            keyboardType="email-address"
            testID="email-field"
        />
        <Text style={[Typography.label, Base.mainTextColor]}>Lösenord</Text>

        <TextInput
            style={Forms.input}
            onChangeText={(content: string) =>  {
                validatePassword(content);
                setAuth({...auth, password: content})
            }}
            value={auth?.password}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            testID="password-field"
        />
        <Pressable style={() => [{}, ButtonStyle.button]}
            onPress= { () => {
                if(validPassword && validEmail) {
                    submit();
                } else {
                    showMessage({
                        message: "Icke giltig epostadress eller lösenord",
                        type: "danger"
                    });
                }
            }}
            accessibilityLabel={`${title} genom att trycka`}
        >
            <Text style={ButtonStyle.buttonText}>{title}</Text>
        </Pressable>


        {title === "Logga in" &&
            
            <Pressable
                style={() => [{}, ButtonStyle.button]}
                onPress= { () => {
                    navigation.navigate("Register");
                }}>
                <Text style={ButtonStyle.buttonText}>Registrera istället</Text>
            </Pressable>
        }

        {title === "Logga in" &&
            <Text style={[Typography.normal, Base.mainTextColor]}>Genom att registrera dig får du möjlighet att logga in för att se och skapa fakturor.</Text>
        
        }
    </ScrollView>

    )
}