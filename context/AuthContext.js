import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const KULLANICILAR_ANAHTARI = 'kullanicilar';
const AKTIF_KULLANICI_ANAHTARI = 'aktifKullanici';

export function AuthProvider({ children }) {
  const [aktifKullanici, setAktifKullanici] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    async function oturumuKontrolEt() {
      const kayitliEposta = await AsyncStorage.getItem(AKTIF_KULLANICI_ANAHTARI);
      if (kayitliEposta) {
        setAktifKullanici(kayitliEposta);
      }
      setYukleniyor(false);
    }
    oturumuKontrolEt();
  }, []);

  async function kullanicilariGetir() {
    const veri = await AsyncStorage.getItem(KULLANICILAR_ANAHTARI);
    return veri ? JSON.parse(veri) : [];
  }

  async function kayitOl(ad, eposta, sifre) {
    const kullanicilar = await kullanicilariGetir();

    const zatenVarMi = kullanicilar.some(
      (k) => k.eposta.toLowerCase() === eposta.toLowerCase()
    );
    if (zatenVarMi) {
      return { basarili: false, mesaj: 'Bu e-posta ile zaten bir hesap var.' };
    }

    const yeniKullanici = { ad, eposta, sifre };
    const guncelListe = [...kullanicilar, yeniKullanici];
    await AsyncStorage.setItem(KULLANICILAR_ANAHTARI, JSON.stringify(guncelListe));

    return { basarili: true };
  }

  async function girisYap(eposta, sifre) {
    const kullanicilar = await kullanicilariGetir();

    const bulunanKullanici = kullanicilar.find(
      (k) => k.eposta.toLowerCase() === eposta.toLowerCase() && k.sifre === sifre
    );

    if (!bulunanKullanici) {
      return { basarili: false, mesaj: 'E-posta veya şifre hatalı.' };
    }

    setAktifKullanici(bulunanKullanici.eposta);
    await AsyncStorage.setItem(AKTIF_KULLANICI_ANAHTARI, bulunanKullanici.eposta);

    return { basarili: true };
  }

  async function cikisYap() {
    setAktifKullanici(null);
    await AsyncStorage.removeItem(AKTIF_KULLANICI_ANAHTARI);
  }

  return (
    <AuthContext.Provider
      value={{ aktifKullanici, yukleniyor, kayitOl, girisYap, cikisYap }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}