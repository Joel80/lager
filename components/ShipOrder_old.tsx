import { createRef, Ref, useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Base, Typography } from '../styles/index.js';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import getCoordinates from '../models/nominatim';
import * as Location from 'expo-location';
import OrderItem from '../interfaces/order_item.js';

export default function ShipOrder({ route }) {
    const defaultLatitude = 60.128161 //59.3293235;
    const defaultLongitude = 18.643501//18.0685808;
    const defaultLatitudeDelta = 25;
    const defaultLongitudeDelta = 20;
    const { order } = route.params;
    const mapRef: Ref<MapView> = useRef(null);
    const suppliedMarkers: string[] = ["deliveryMarker", "userMarker"];
    let userLocationLoaded: Boolean = false;


    const orderItemsList = order.order_items.map((item: OrderItem, index: number) => {
        return <Text
                style={[Typography.normal, Base.mainTextColor]}
                key={index}
                >
                    {item.name} - {item.amount} st.
                </Text>
    });

    const [marker, setMarker] = useState(<Marker
        coordinate={{ latitude: defaultLatitude, longitude: defaultLongitude }}
        title="Förvald markör"
    />);


    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
                identifier="deliveryMarker"
            />);
        })();
    }, []);

    const [locationMarker, setLocationMarker] = useState(<Marker
        coordinate={{ latitude: defaultLatitude, longitude: defaultLongitude }}
        title="Förvald användarmarkör"
    />);

    const [errorMessage, setErrorMessage] = useState('');

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
            console.log("User location loaded");
            userLocationLoaded = true;
        }) ();
    }, []);
    


    const fitToMarkers = () => {
        //console.log(mapRef.current);
        console.log("Fitting to markers");
        
        if (mapRef.current) {
            //console.log(mapRef.current.props.children);
            //console.log(mapRef.current.props.children);
            mapRef.current.fitToSuppliedMarkers(suppliedMarkers);
        }
       
    }

    const animateMap = () => {
        //console.log(mapRef.current);
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: 55.0,
                longitude: 15.0,
                latitudeDelta: 1,
                longitudeDelta: 1,
                
            });
        }
        
    }
    
    return (
        <View style={[Base.container, Base.base, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Skicka order</Text>
            <Text style={[Typography.normal, Base.mainTextColor]}>Kund:</Text>
            <Text style={[Typography.normal, Base.mainTextColor]}> 
                  {order.name}, {order.address}, {order.zip} {order.city}
            </Text>
                {/* <Text style={[Typography.normal, Base.mainTextColor]}>Kund: {order.name}</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>Address: {order.address}</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>Postnummer: {order.zip} </Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>Ort: {order.city}</Text> */}
                <Text style={[Typography.normal, Base.mainTextColor]}>Varor:</Text>
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
                        /* showsUserLocation={true}
                        onUserLocationChange={fitToMarkers} */
                        onPress={fitToMarkers}
                       /*  onMapReady={fitToMarkers} */
                    >
                    
                   {marker}
                   {locationMarker}
                </MapView>
            </View>
            <Text style={[Typography.normal, Base.mainTextColor]}>Tryck på kartan för att zooma in</Text>
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
