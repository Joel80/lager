import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock';
import greenhouse from './assets/greenhouse.jpg';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollStyle}>
        <View style={styles.base}>
          <Text style={styles.mainHeading}>Infinity Warehouse</Text>
          <Text style={styles.subHeading}>Trädgård</Text>
          <Image source={greenhouse} style={styles.image} />
          <Stock />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollStyle: {
    flex: 1,
    backgroundColor: '#357960',
  },
  base: {
    flex: 1,
    backgroundColor: '#357960',
    paddingLeft: 24,
    paddingRight: 24,
  },
  mainHeading: {
    color: '#fdfdfd', 
    fontSize: 35,
    /* textAlign: 'center', */ 
    paddingBottom: 12
  },
  subHeading: {
    color: '#fdfdfd', 
    fontSize: 25, 
    paddingBottom: 12,
    /* textAlign: 'center' */
  },
  image: {
    width: 320, 
    height: 240,
    paddingBottom: 12
  }
});
