import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function OzelButon({ title, onPress, renk = '#702e7d' }) {
  return (
    <TouchableOpacity
      style={[styles.buton, { backgroundColor: renk }]}
      onPress={onPress}
    >
      <Text style={styles.yazi}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  yazi: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});