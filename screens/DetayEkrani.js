import { View, Text, StyleSheet } from 'react-native';

export default function DetayEkrani({ route }) {
  const { film } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.ad}>{film.ad}</Text>
      <Text style={styles.altBilgi}>{film.yil} · {film.tur}</Text>

      <View style={styles.puanKutusu}>
        <Text style={styles.puanYazi}>⭐ {film.puan}</Text>
      </View>

      <Text style={styles.aciklamaBaslik}>Açıklama</Text>
      <Text style={styles.aciklama}>{film.aciklama}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fafafa' },
  ad: { fontSize: 26, fontWeight: 'bold' },
  altBilgi: { color: 'gray', fontSize: 16, marginTop: 4, marginBottom: 12 },
  puanKutusu: {
    backgroundColor: '#fff3cd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  puanYazi: { fontWeight: 'bold', color: '#8a6d00', fontSize: 16 },
  aciklamaBaslik: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  aciklama: { fontSize: 15, lineHeight: 22, color: '#333' },
});