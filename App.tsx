import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
import Pick from './components/Pick';
import Delivery from './components/Delivery';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles/index.js';
import Product from './interfaces/product';
import authModel from './models/auth';
import Auth from './components/auth/Auth';
import Invoices from './components/Invoices';

const Tab = createBottomTabNavigator();

const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Leveranser": "basket",
    "Logga in": "lock-open",
    "Faktura": "receipt"
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
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
          <Tab.Screen name="Leveranser">
            {() => <Delivery setProducts={setProducts}/>}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              { () => <Invoices setIsLoggedIn={setIsLoggedIn} />} 
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
