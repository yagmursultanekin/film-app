import { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFilmler } from '../context/FilmContext';

const turler = ['Hepsi', 'Bilim Kurgu', 'Dram', 'Aksiyon'];
const siralamaSecenekleri = [
  { label: 'İsme göre', value: 'ad' },
  { label: 'Puana göre', value: 'puan' },
  { label: 'Yıla göre', value: 'yil' },
  { label: 'Türe göre', value: 'tur' },
];

export default function ListeEkrani({ navigation }) {
  const { filmler } = useFilmler();
  const [arama, setArama] = useState('');
  const [seciliTur, setSeciliTur] = useState('Hepsi');
  const [siralama, setSiralama] = useState('ad');

  const gosterilecekFilmler = useMemo(() => {
    let sonuc = filmler;

    if (siralama === 'tur' && seciliTur !== 'Hepsi') {
      sonuc = sonuc.filter((film) => film.tur === seciliTur);
    }

    if (arama.trim() !== '') {
      sonuc = sonuc.filter((film) =>
        film.ad.toLowerCase().includes(arama.toLowerCase())
      );
    }

    sonuc = [...sonuc].sort((a, b) => {
      if (siralama === 'ad') return a.ad.localeCompare(b.ad);
      if (siralama === 'puan') return b.puan - a.puan;
      if (siralama === 'yil') return b.yil - a.yil;
      if (siralama === 'tur') return a.ad.localeCompare(b.ad);
      return 0;
    });

    return sonuc;
  }, [arama, seciliTur, siralama]);

  return (
    <View style={styles.container}>
      <View style={styles.ustAlan}>
        <Text style={styles.baslik}>🎬 Film Arşivim</Text>
        <Text style={styles.altYazi}>{gosterilecekFilmler.length} film listeleniyor</Text>
      </View>

      {/* ARAMA KUTUSU */}
<View style={styles.aramaKutusu}>
  <Text style={styles.aramaIkonu}>🔍</Text>
  <TextInput
    style={styles.aramaInput}
    placeholder="Film ara..."
    placeholderTextColor="#999"
    value={arama}
    onChangeText={setArama}
  />
</View>

        <Text style={styles.filtreBaslik}>FİLTRELEME SEÇENEKLERİ</Text>

        <View style={styles.dropdownKutusu}>
          <Picker selectedValue={siralama} onValueChange={setSiralama}>
            {siralamaSecenekleri.map((secenek) => (
              <Picker.Item key={secenek.value} label={secenek.label} value={secenek.value} />
            ))}
          </Picker>
        </View>

        {siralama === 'tur' && (
          <View style={styles.dropdownKutusu}>
            <Picker selectedValue={seciliTur} onValueChange={setSeciliTur}>
              {turler.map((tur) => (
                <Picker.Item key={tur} label={tur} value={tur} />
              ))}
            </Picker>
          </View>
        )}

        <FlatList
          data={gosterilecekFilmler}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}
          ListEmptyComponent={
            <Text style={styles.bosYazi}>Aradığın kriterlere uyan film bulunamadı.</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.kart}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Detay', { film: item })}
            >
              <View style={styles.posterYerTutucu}>
                <Text style={styles.posterYazi}>{item.ad.charAt(0)}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.ad}>{item.ad}</Text>
                <Text style={styles.altBilgi}>{item.yil} · {item.tur}</Text>
              </View>

              <View style={styles.puanKutusu}>
                <Text style={styles.puanYazi}>⭐ {item.puan}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#432e7d' },
  ustAlan: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  baslik: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  altYazi: { color: '#ffffff', marginTop: 4, fontSize: 13 },
  icerik: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
aramaKutusu: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  aramaIkonu: {
    fontSize: 16,
    marginRight: 8,
  },
  aramaInput: {
    flex: 1, // Kalan tüm alanı kaplaması için
    fontSize: 15,
    paddingVertical: 12, // Metin kutusunun dikey boşlukları
    color: '#222',
  },
  filtreBaslik: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  dropdownKutusu: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    overflow: 'hidden',
  },
  bosYazi: { textAlign: 'center', color: 'gray', marginTop: 40, fontSize: 14 },
  kart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  posterYerTutucu: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#702e7d',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  posterYazi: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  ad: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  altBilgi: { color: 'gray', marginTop: 4, fontSize: 13 },
  puanKutusu: {
    backgroundColor: '#fff3cd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  puanYazi: { fontWeight: 'bold', color: '#8a6d00', fontSize: 13 },
});