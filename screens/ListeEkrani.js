import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import filmler from '../data/filmler';

export default function ListeEkrani({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Film Arşivim</Text>

      <FlatList
        data={filmler}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.kart}
            onPress={() => navigation.navigate('Detay', { film: item })}
          >
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
  container: { flex: 1, padding: 16, backgroundColor: '#fafafa' },
  baslik: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  kart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  ad: { fontSize: 18, fontWeight: 'bold' },
  altBilgi: { color: 'gray', marginTop: 4 },
  puanKutusu: {
    backgroundColor: '#fff3cd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  puanYazi: { fontWeight: 'bold', color: '#8a6d00' },
});