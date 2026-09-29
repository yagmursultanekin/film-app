import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ceviriler from '../data/ceviriler';

const LanguageContext = createContext();

const DIL_ANAHTARI = 'secilenDil';

export function LanguageProvider({ children }) {
  const [dil, setDilState] = useState('tr');

  useEffect(() => {
    async function dilTercihiniGetir() {
      const kayitliDil = await AsyncStorage.getItem(DIL_ANAHTARI);
      if (kayitliDil) {
        setDilState(kayitliDil);
      }
    }
    dilTercihiniGetir();
  }, []);

  async function dilDegistir(yeniDil) {
    setDilState(yeniDil);
    await AsyncStorage.setItem(DIL_ANAHTARI, yeniDil);
  }

  const t = ceviriler[dil];

  return (
    <LanguageContext.Provider value={{ dil, dilDegistir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}