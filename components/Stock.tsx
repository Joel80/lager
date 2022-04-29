import { Text, View } from 'react-native';
import { Base, Typography } from '../styles/index.js'
import StockList from './StockList';

export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={[Typography.header2, Base.mainTextColor]}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}
