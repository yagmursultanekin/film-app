import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import OzelButon from '../components/OzelButon';

export default function KayitEkrani({ navigation }) {
  const { kayitOl } = useAuth();

  const [ad, setAd] = useState('');
  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');

  async function kayitYap() {
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

    const sonuc = await kayitOl(ad.trim(), eposta.trim(), sifre);

    if (!sonuc.basarili) {
      setHata(sonuc.mesaj);
      return;
    }

    setHata('');
    navigation.navigate('Giris');
  }

  return (
    <View style={styles.container}>
      <View style={styles.ustAlan}>
        <Text style={styles.baslik}>🎬 Film Arşivim</Text>
        <Text style={styles.altYazi}>Yeni hesap oluştur</Text>
      </View>

      <View style={styles.icerik}>
        <TextInput
          style={styles.input}
          placeholder="Ad Soyad"
          placeholderTextColor="#999"
          value={ad}
          onChangeText={setAd}
        />

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#999"
          value={eposta}
          onChangeText={setEposta}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#999"
          value={sifre}
          onChangeText={setSifre}
          secureTextEntry
        />

        {hata !== '' && <Text style={styles.hata}>{hata}</Text>}

        <OzelButon title="Kayıt Ol" onPress={kayitYap} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#702e7d' },
  ustAlan: { paddingTop: 70, paddingHorizontal: 20, paddingBottom: 30 },
  baslik: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  altYazi: { color: '#e1bee7', marginTop: 6, fontSize: 14 },
  icerik: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  hata: { color: '#c62828', marginBottom: 14, textAlign: 'center', fontSize: 13 },
});