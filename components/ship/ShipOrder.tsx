import { createRef, Ref, useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Base, Typography } from '../../styles/index.js';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';
import OrderItem from '../../interfaces/order_item.js';

export default function ShipOrder({ route }) {
    const defaultLatitude = 60.128161 //59.3293235;
    const defaultLongitude = 18.643501 //18.0685808;
    const defaultLatitudeDelta = 25;
    const defaultLongitudeDelta = 20;
    const { order } = route.params;
    const mapRef  = useRef<MapView>(null);

    const [marker, setMarker] = useState(<Marker
        coordinate={{ latitude: defaultLatitude, longitude: defaultLongitude }}
        title="Förvald leveransmarkör"
    />);
   
    const [locationMarker, setLocationMarker] = useState(<Marker
        coordinate={{ latitude: defaultLatitude, longitude: defaultLongitude }}
        title="Förvald användarmarkör"
    />);

    const [errorMessage, setErrorMessage] = useState('');
    
    const [markers, setMarkers] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
                identifier="deliveryMarker"
            />);
            setMarkers(markers => [...markers, "deliveryMarker"]);
        })();
    }, []);

        

    useEffect ( () => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !=='granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker 
                    coordinate= {{
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude
                    }}
                    title="Min plats"
                    pinColor="blue"
                    identifier="userMarker"
                />);
            setMarkers(markers => [...markers, "userMarker"]);
            console.log("User location loaded");
            console.log(markers);
        }) ();
    }, []);

    useEffect ( () => {
        console.log("Checking markers update");
        if (markers.includes("deliveryMarker" && "userMarker")) {
            fitToMarkers(markers);
        }
        
    }, [markers])

      
    function fitToMarkers (markers: string[]) {
        console.log("Fitting to markers");
        
        if (mapRef.current !== null) {
            mapRef.current.fitToSuppliedMarkers(markers);
        }
       
    }


    const orderItemsList = order.order_items.map((item: OrderItem, index: number) => {
        return <Text
                style={[Typography.normal, Base.mainTextColor]}
                key={index}
                >
                    {item.name} - {item.amount} st.
                </Text>
    });

    
    return (
        <View style={[Base.container, Base.base, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Skicka order: {order.id}</Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>{order.name}, {order.address}, {order.zip} {order.city}</Text>
            <Text style={[Typography.header4, Base.mainTextColor]}>Varor:</Text>
            {orderItemsList}

            <View style={styles.container}>
                <MapView                   
                        style={styles.map}
                        initialRegion={{
                            latitude: defaultLatitude,
                            longitude:defaultLongitude,
                            latitudeDelta: defaultLatitudeDelta,
                            longitudeDelta: defaultLongitudeDelta,
                        }}
                        ref={mapRef}

                    >
                    
                   {marker}
                   {locationMarker}
                </MapView>
            </View>
        </View>
    );   
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        
    },
});
