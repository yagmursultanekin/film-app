import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFilmler } from '../context/FilmContext';
import { useLanguage } from '../context/LanguageContext';
import DilSecici from '../components/DilSecici';

export default function FavorilerEkrani({ navigation }) {
  const { filmler, favoriler, favoriDegistir } = useFilmler();
  const { t } = useLanguage();

  const favoriFilmler = filmler.filter((film) => favoriler.includes(film.id));

  return (
    <View style={styles.container}>
      <View style={styles.ustAlan}>
        <TouchableOpacity style={styles.geriButon} onPress={() => navigation.goBack()}>
          <Text style={styles.geriYazi}>{t.geri}</Text>
        </TouchableOpacity>
        <DilSecici />

        <Text style={styles.baslik}>❤️ {t.favorilerim}</Text>
        <Text style={styles.altYazi}>{favoriFilmler.length} {t.filmSayisi}</Text>
      </View>

      <View style={styles.icerik}>
        <FlatList
          data={favoriFilmler}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}
          ListEmptyComponent={
            <Text style={styles.bosYazi}>{t.henuzFavoriYok}</Text>
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
                <Text style={styles.altBilgi}>{item.yil} · {item.tur}</Text>
              </View>

              <TouchableOpacity
                style={styles.kalpButon}
                onPress={() => favoriDegistir(item.id)}
              >
                <Text style={styles.kalpYazi}>❤️</Text>
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
  ustAlan: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
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
  baslik: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  altYazi: { color: '#e1bee7', marginTop: 4, fontSize: 13 },
  icerik: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  bosYazi: { textAlign: 'center', color: 'gray', marginTop: 60, fontSize: 14, lineHeight: 22 },
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
  kalpButon: { padding: 8 },
  kalpYazi: { fontSize: 22 },
});