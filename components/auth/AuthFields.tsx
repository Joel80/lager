import { ScrollView, Text, TextInput, Pressable } from "react-native";
import { Typography, Forms, Base, ButtonStyle} from '../../styles';

export default function AuthFields ({auth, setAuth, title, submit, navigation }) {
    return (
    <ScrollView style={[Base.base, Base.mainBackgroundColor]}>
        <Text style={[Typography.header2, Base.mainTextColor]}>{title}</Text>
        <Text style={[Typography.label, Base.mainTextColor]}>E-post</Text>
        <TextInput            
            style={Forms.input}
            onChangeText={(content: string) =>  {
                setAuth({...auth, email: content})
            }}
            autoCapitalize="none"
            autoCorrect={false}
            value={auth?.email}
            keyboardType="email-address"
        />
        <Text style={[Typography.label, Base.mainTextColor]}>Lösenord</Text>

        <TextInput
            style={Forms.input}
            onChangeText={(content: string) =>  {
                setAuth({...auth, password: content})
            }}
            value={auth?.password}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Pressable style={() => [{}, ButtonStyle.button]}
            onPress= { () => {
                submit();
            }}>
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