import OzelButon from '../components/OzelButon';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function KayitEkrani({ navigation }) {
  const [ad, setAd] = useState('');
  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');

  function kayitOl() {
    if (ad.trim() === '' || eposta.trim() === '' || sifre.trim() === '') {
      setHata('Lütfen tüm alanları doldurun.');
      return;
    }

    if (!eposta.includes('@')) {
      setHata('Geçerli bir e-posta girin.');
      return;
    }

    if (sifre.length < 6) {
      setHata('Şifre en az 6 karakter olmalı.');
      return;
    }

    setHata('');
    navigation.navigate('Giris');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Kayıt Ol</Text>

      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={ad}
        onChangeText={setAd}
      />

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={eposta}
        onChangeText={setEposta}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={sifre}
        onChangeText={setSifre}
        secureTextEntry
      />

      {hata !== '' && <Text style={styles.hata}>{hata}</Text>}

      <OzelButon title="Kayıt Ol" onPress={kayitOl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  baslik: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#0f3460',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  hata: { color: 'red', marginBottom: 12, textAlign: 'center' },
});