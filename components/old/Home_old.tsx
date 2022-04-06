import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './Stock';
import greenhouse from '../assets/greenhouse.jpg';
import { Base, Typography } from '../styles/index.js'

export default function App() {
  return (
    <SafeAreaView style={Base.container}>
      <ScrollView style={Base.mainBackgroundColor}>
        <View style={Base.base}>
          <Text style={[Typography.header1, Base.mainTextColor]}>Infinity Warehouse</Text>
          <Text style={[Typography.header2, Base.mainTextColor]}>Trädgård</Text>
          <Image source={greenhouse} style={Base.image} />
          <Text style={[Typography.imageCredit, Base.mainTextColor]}>Photo by Christin Noelle at Unsplash</Text>
          <Stock />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

