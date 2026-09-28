import { View, Text, StyleSheet } from 'react-native';

export default function DetayEkrani({ route }) {
  const { film } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.ustAlan}>
        <View style={styles.posterYerTutucu}>
          <Text style={styles.posterYazi}>{film.ad.charAt(0)}</Text>
        </View>
        <Text style={styles.ad}>{film.ad}</Text>
        <Text style={styles.altBilgi}>{film.yil} · {film.tur}</Text>
      </View>

      <View style={styles.icerik}>
        <View style={styles.puanKutusu}>
          <Text style={styles.puanYazi}>⭐ {film.puan}</Text>
        </View>

        <Text style={styles.aciklamaBaslik}>AÇIKLAMA</Text>
        <Text style={styles.aciklama}>{film.aciklama}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#702e7d' },
  ustAlan: { paddingTop: 50, paddingHorizontal: 24, paddingBottom: 30, alignItems: 'center' },
  posterYerTutucu: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  posterYazi: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  ad: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  altBilgi: { color: '#e1bee7', marginTop: 6, fontSize: 14 },
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