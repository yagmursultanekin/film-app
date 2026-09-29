import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import DilSecici from '../components/DilSecici';
import OzelButon from '../components/OzelButon';

export default function GirisEkrani({ navigation }) {
  const { girisYap } = useAuth();
 const { t } = useLanguage();

  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');

  async function girisIslemi() {
    if (eposta.trim() === '' || sifre.trim() === '') {
      setHata(t.epostaSifreGirin);
      return;
    }

    const sonuc = await girisYap(eposta.trim(), sifre);

    if (!sonuc.basarili) {
      setHata(sonuc.mesaj);
      return;
    }

    setHata('');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Liste' }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.ustAlan}>
        <DilSecici />

        <Text style={styles.baslik}>🎬 {t.filmArsivim}</Text>
        <Text style={styles.altYazi}>{t.tekrarHosGeldin}</Text>
      </View>

      <View style={styles.icerik}>
        <TextInput
          style={styles.input}
          placeholder={t.eposta}
          placeholderTextColor="#999"
          value={eposta}
          onChangeText={setEposta}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder={t.sifre}
          placeholderTextColor="#999"
          value={sifre}
          onChangeText={setSifre}
          secureTextEntry
        />

        {hata !== '' && <Text style={styles.hata}>{hata}</Text>}

        <OzelButon title={t.girisYap} onPress={girisIslemi} />
        <OzelButon
          title={t.hesabinYokMu}
          onPress={() => navigation.navigate('Kayit')}
          renk="#757575"
        />
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