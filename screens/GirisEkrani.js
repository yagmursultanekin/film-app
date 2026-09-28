import OzelButon from '../components/OzelButon';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function GirisEkrani({ navigation }) {
  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');

  function girisYap() {
    if (eposta.trim() === '' || sifre.trim() === '') {
      setHata('Lütfen e-posta ve şifreyi girin.');
      return;
    }

    // Şimdilik AsyncStorage yok, bu yüzden kontrolü birazdan ekleyeceğiz.
    setHata('');
    navigation.navigate('Liste');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        placeholderTextColor="#fbeeee"
        value={eposta}
        onChangeText={setEposta}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        placeholderTextColor="#fbeeee"
        value={sifre}
        onChangeText={setSifre}
        secureTextEntry
      />

      {hata !== '' && <Text style={styles.hata}>{hata}</Text>}

      <OzelButon title="Giriş Yap" onPress={girisYap} />
<OzelButon
  title="Hesabın yok mu? Kayıt ol"
  onPress={() => navigation.navigate('Kayit')}
  renk="#757575"
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#432e7d' },
  baslik: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#f8f7f7' },
  input: {
    color: '#f8f7f7',
    borderWidth: 4,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
  hata: { color: 'red', marginBottom: 12, textAlign: 'center' },
});