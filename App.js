import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GirisEkrani from './screens/GirisEkrani';
import KayitEkrani from './screens/KayitEkrani';
import ListeEkrani from './screens/ListeEkrani';
import DetayEkrani from './screens/DetayEkrani';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Giris">
        <Stack.Screen name="Giris" component={GirisEkrani} />
        <Stack.Screen name="Kayit" component={KayitEkrani} />
        <Stack.Screen name="Liste" component={ListeEkrani} />
        <Stack.Screen name="Detay" component={DetayEkrani} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}