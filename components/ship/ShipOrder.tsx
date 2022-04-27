import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

    // Ref to MapViev, initialize mapRef.current to null
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
    
    // State for array with marker id:s
    const [markers, setMarkers] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
                identifier="deliveryMarker"
            />);
             // Add marker identifier to markers array
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
            // Add marker identifier to markers array
            setMarkers(markers => [...markers, "userMarker"]);
            console.log("User location loaded");
            console.log(markers);
        }) ();
    }, []);

    // UseEffect for markers, run when markers array changes
    useEffect ( () => {
        console.log("Checking markers update");
        // If both identifiers are in the array
        if (markers.includes("deliveryMarker" && "userMarker")) {
            // Call fitToMarkers with markers array to fit map
            // to markers
            fitToMarkers(markers);
        }
        
    }, [markers])

      
    function fitToMarkers (markers: string[]) {
        console.log("Fitting to markers");
        
        // If mapRef.current is not null
        // call method fitToSuppliedMarkers with markers array 
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
            <Text style={[Typography.normal, Base.mainTextColor]}>{order.name}</Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>{order.address}, {order.zip} {order.city}</Text>
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
        /* marginBottom: 10,
        marginTop: 10, */
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        
    },
});
