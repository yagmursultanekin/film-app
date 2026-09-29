import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FilmProvider } from './context/FilmContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

import GirisEkrani from './screens/GirisEkrani';
import KayitEkrani from './screens/KayitEkrani';
import ListeEkrani from './screens/ListeEkrani';
import DetayEkrani from './screens/DetayEkrani';
import FavorilerEkrani from './screens/FavorilerEkrani';

const Stack = createNativeStackNavigator();

function AnaGezinme() {
  const { aktifKullanici, yukleniyor } = useAuth();

  if (yukleniyor) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#702e7d" />
      </View>
    );
  }

  return (
    <Stack.Navigator
  initialRouteName={aktifKullanici ? 'Liste' : 'Giris'}
  screenOptions={{ headerShown: false }}
>
      <Stack.Screen name="Giris" component={GirisEkrani} />
      <Stack.Screen name="Kayit" component={KayitEkrani} />
      <Stack.Screen name="Liste" component={ListeEkrani} />
      <Stack.Screen name="Detay" component={DetayEkrani} />
      <Stack.Screen name="Favoriler" component={FavorilerEkrani} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FilmProvider>
        <NavigationContainer>
          <AnaGezinme />
        </NavigationContainer>
      </FilmProvider>
    </AuthProvider>
  );
}