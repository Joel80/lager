import { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Base, Typography } from '../styles/index.js';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import getCoordinates from '../models/nominatim';
import * as Location from 'expo-location';

export default function ShipOrder({ route }) {
    const defaultLatitude = 59.3293235;
    const defaultLongitude = 18.0685808;
    const { order } = route.params;
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
                />);
        }) ();
    }, []);
    
    return (
        <View style={[Base.container, Base.base, Base.mainBackgroundColor]}>
            <Text style={[Typography.header2, Base.mainTextColor]}>Skicka order</Text>
            
                <Text style={[Typography.header3, Base.mainTextColor]}>Orderdetaljer</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>Kund: {order.name}</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>Address: {order.address}</Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>Postnummer: {order.zip} </Text>
                <Text style={[Typography.normal, Base.mainTextColor]}>Ort: {order.city}</Text>

            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: defaultLatitude,
                        longitude:defaultLongitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
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
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
