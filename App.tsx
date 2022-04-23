import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
import Pick from './components/Pick';
import Delivery from './components/Delivery';
import Ship from './components/Ship';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles/index.js';
import Product from './interfaces/product';
import InvoiceInterface from './interfaces/invoice';
import authModel from './models/auth';
import Auth from './components/auth/Auth';
import Invoice from './components/Invoice';

const Tab = createBottomTabNavigator();

const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Inleveranser": "basket",
    "Logga in": "lock-closed",
    "Faktura": "receipt",
    "Utleveranser": "car"

};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  
  useEffect(async () => {
      setIsLoggedIn(await authModel.loggedIn())
  }, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                    let iconName = routeIcons[route.name] || "alert";
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarInactiveTintColor: 'grey',
                tabBarActiveTintColor: 'green',
            })}
        >
          <Tab.Screen name="Lager">
            {() => <Home products = {products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick setProducts={setProducts} />}
          </Tab.Screen> 
          <Tab.Screen name="Inleveranser">
            {() => <Delivery setProducts={setProducts}/>}
          </Tab.Screen>
          <Tab.Screen name="Utleveranser">
            {() => <Ship />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              { () => <Invoice setIsLoggedIn={setIsLoggedIn} setInvoices={setInvoices} />} 
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              { () => <Auth setIsLoggedIn={setIsLoggedIn}/>}
          </Tab.Screen>
          }
          
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
}
