import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFilmler } from '../context/FilmContext';
import { useLanguage } from '../context/LanguageContext';
import DilSecici from '../components/DilSecici';

export default function DetayEkrani({ route, navigation }) {
  const { film } = route.params;
  const { favoriDegistir, favoriMi } = useFilmler();
  const { t } = useLanguage();

  const turMetni = film.turler && film.turler.length > 0
    ? film.turler.join(', ')
    : film.tur;

  return (
    <View style={styles.container}>
      <View style={styles.ustAlan}>
        <TouchableOpacity style={styles.geriButon} onPress={() => navigation.goBack()}>
          <Text style={styles.geriYazi}>{t.geri}</Text>
        </TouchableOpacity>
        <DilSecici />

        {film.posterYolu ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w300${film.posterYolu}` }}
            style={styles.poster}
          />
        ) : (
          <View style={styles.posterYerTutucu}>
            <Text style={styles.posterYazi}>{film.ad.charAt(0)}</Text>
          </View>
        )}
        <Text style={styles.ad}>{film.ad}</Text>
        <Text style={styles.altBilgi}>{film.yil} · {turMetni}</Text>

        <TouchableOpacity
          style={styles.favoriButon}
          onPress={() => favoriDegistir(film.id)}
        >
          <Text style={styles.favoriYazi}>
            {favoriMi(film.id) ? t.favorilerdenCikar : t.favorilereEkle}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.icerik}>
        <View style={styles.puanKutusu}>
          <Text style={styles.puanYazi}>⭐ {film.puan.toFixed(1)}</Text>
        </View>

        <Text style={styles.aciklamaBaslik}>{t.aciklama}</Text>
        <Text style={styles.aciklama}>{film.aciklama || t.aciklamaBulunamadi}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#702e7d' },
  ustAlan: { paddingTop: 50, paddingHorizontal: 24, paddingBottom: 30, alignItems: 'center' },
  geriButon: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#00000000',
    marginBottom: 16,
    borderRadius: 8,
    width: 75,             // Butonun toplam genişliği
    height: 35,             // Butonun toplam yüksekliği
    justifyContent: 'center', // İçindeki yazıyı dikeyde ortalar
    alignItems: 'center',     // İçindeki yazıyı yatayda ortalar
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  geriYazi: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  poster: { width: 120, height: 180, borderRadius: 12, marginBottom: 14 },
  posterYerTutucu: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  posterYazi: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  ad: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  altBilgi: { color: '#e1bee7', marginTop: 6, fontSize: 14, textAlign: 'center' },
  favoriButon: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  favoriYazi: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  icerik: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  puanKutusu: {
    backgroundColor: '#fff3cd',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  puanYazi: { fontWeight: 'bold', color: '#8a6d00', fontSize: 15 },
  aciklamaBaslik: { fontSize: 12, fontWeight: 'bold', color: '#999', marginBottom: 8, letterSpacing: 0.5 },
  aciklama: { fontSize: 15, lineHeight: 23, color: '#333' },
});