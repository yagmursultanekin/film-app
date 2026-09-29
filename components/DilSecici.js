import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function DilSecici() {
  const { dil, dilDegistir } = useLanguage();

  return (
    <View style={styles.dilSecici}>
      <TouchableOpacity onPress={() => dilDegistir('tr')}>
        <Text style={[styles.dilYazi, dil === 'tr' && styles.dilYaziSecili]}>TR</Text>
      </TouchableOpacity>
      <Text style={styles.dilAyrac}>|</Text>
      <TouchableOpacity onPress={() => dilDegistir('en')}>
        <Text style={[styles.dilYazi, dil === 'en' && styles.dilYaziSecili]}>EN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dilSecici: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  dilYazi: { color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', fontSize: 14, paddingHorizontal: 6 },
  dilYaziSecili: { color: '#fff' },
  dilAyrac: { color: 'rgba(255,255,255,0.3)' },
});