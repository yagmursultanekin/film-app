import { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFilmler } from '../context/FilmContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import OzelButon from '../components/OzelButon';
import DilSecici from '../components/DilSecici';

const turListesi = ['Aksiyon', 'Macera', 'Animasyon', 'Komedi', 'Suç', 'Belgesel', 'Dram', 'Aile', 'Fantastik', 'Tarih', 'Korku', 'Müzik', 'Gizem', 'Romantik', 'Bilim Kurgu', 'Gerilim', 'Savaş'];

export default function ListeEkrani({ navigation }) {
  const { filmler, yukleniyor, hata, favoriDegistir, favoriMi } = useFilmler();
  const { cikisYap } = useAuth();
  const { t } = useLanguage();

  const [arama, setArama] = useState('');
  const [seciliTur, setSeciliTur] = useState('Hepsi');
  const [siralama, setSiralama] = useState('ad');

  const turler = ['Hepsi', ...turListesi];
  const siralamaSecenekleri = [
    { label: t.ismeGore, value: 'ad' },
    { label: t.puanaGore, value: 'puan' },
    { label: t.yilaGore, value: 'yil' },
    { label: t.tureGore, value: 'tur' },
  ];

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
  }, [arama, siralama, seciliTur, filmler]);

  if (yukleniyor) {
    return (
      <View style={styles.ortalanmisAlan}>
        <ActivityIndicator size="large" color="#702e7d" />
        <Text style={{ marginTop: 12, color: 'gray' }}>{t.filmlerYukleniyor}</Text>
      </View>
    );
  }

  if (hata !== '') {
    return (
      <View style={styles.ortalanmisAlan}>
        <Text style={{ color: '#c62828' }}>{hata}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.ustAlan}>
        <DilSecici />
        <Text style={styles.baslik}>🎬 {t.filmArsivim}</Text>
        <Text style={styles.altYazi}>{gosterilecekFilmler.length} {t.filmListeleniyor}</Text>
      </View>

      <View style={styles.icerik}>
        <OzelButon
          title={`❤️ ${t.favorilerim}`}
          onPress={() => navigation.navigate('Favoriler')}
          renk="#702e7d"
        />

        <OzelButon
          title={t.cikisYap}
          onPress={async () => {
            await cikisYap();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Giris' }],
            });
          }}
          renk="#757575"
        />

        <TextInput
          style={styles.aramaKutusu}
          placeholder={`🔍  ${t.filmAra}`}
          placeholderTextColor="#999"
          value={arama}
          onChangeText={setArama}
        />

        <Text style={styles.filtreBaslik}>{t.filtrelemeSecenekleri}</Text>

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
                <Picker.Item key={tur} label={tur === 'Hepsi' ? t.hepsi : tur} value={tur} />
              ))}
            </Picker>
          </View>
        )}

        <FlatList
          data={gosterilecekFilmler}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}
          ListEmptyComponent={
            <Text style={styles.bosYazi}>{t.sonucBulunamadi}</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.kart}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Detay', { film: item })}
            >
              {item.posterYolu ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w200${item.posterYolu}` }}
                  style={styles.poster}
                />
              ) : (
                <View style={styles.posterYerTutucu}>
                  <Text style={styles.posterYazi}>{item.ad.charAt(0)}</Text>
                </View>
              )}

              <View style={{ flex: 1 }}>
                <Text style={styles.ad}>{item.ad}</Text>
                <Text style={styles.altBilgi}>{item.yil}</Text>
                <View style={styles.puanKutusu}>
                  <Text style={styles.puanYazi}>⭐ {item.puan.toFixed(1)}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.kalpButon}
                onPress={() => favoriDegistir(item.id)}
              >
                <Text style={styles.kalpYazi}>{favoriMi(item.id) ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#702e7d' },
  ortalanmisAlan: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' },
  ustAlan: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  baslik: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  altYazi: { color: '#e1bee7', marginTop: 4, fontSize: 13 },
  icerik: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  aramaKutusu: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 15,
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
  poster: { width: 48, height: 72, borderRadius: 8, marginRight: 14 },
  posterYerTutucu: {
    width: 48,
    height: 72,
    borderRadius: 8,
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
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  puanYazi: { fontWeight: 'bold', color: '#8a6d00', fontSize: 13 },
  kalpButon: { padding: 8 },
  kalpYazi: { fontSize: 22 },
});