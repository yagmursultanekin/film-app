import { View, Text, Button } from 'react-native';

export default function GirisEkrani({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Giriş Ekranı</Text>
      <Button
        title="Kayıt ol"
        onPress={() => navigation.navigate('Kayit')}
      />
    </View>
  );
}