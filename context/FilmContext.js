import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import turHaritalari from '../data/turler';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';

const FilmContext = createContext();

const API_ANAHTARI = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export function FilmProvider({ children }) {
  const { aktifKullanici } = useAuth();
  const { dil } = useLanguage();

  const [filmler, setFilmler] = useState([]);
  const [favoriler, setFavoriler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');

  useEffect(() => {
    async function filmleriGetir() {
      setYukleniyor(true);
      try {
        const tmdbDilKodu = dil === 'tr' ? 'tr-TR' : 'en-US';
        const turHaritasi = turHaritalari[dil];

        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_ANAHTARI}&language=${tmdbDilKodu}&page=1`;
        const cevap = await fetch(url);
        const veri = await cevap.json();

        const donusturulmusListe = veri.results.map((film) => ({
          id: film.id.toString(),
          ad: film.title,
          yil: film.release_date ? Number(film.release_date.slice(0, 4)) : 0,
          tur: film.genre_ids && film.genre_ids.length > 0
            ? turHaritasi[film.genre_ids[0]] || (dil === 'tr' ? 'Bilinmiyor' : 'Unknown')
            : (dil === 'tr' ? 'Bilinmiyor' : 'Unknown'),
          turler: film.genre_ids
            ? film.genre_ids.map((id) => turHaritasi[id]).filter(Boolean)
            : [],
          puan: film.vote_average,
          aciklama: film.overview,
          posterYolu: film.poster_path,
        }));

        setFilmler(donusturulmusListe);
        setHata('');
      } catch (e) {
        setHata('Filmler yüklenirken bir hata oluştu.');
      } finally {
        setYukleniyor(false);
      }
    }

    filmleriGetir();
  }, [dil]);

  useEffect(() => {
    async function favorileriGetir() {
      if (!aktifKullanici) {
        setFavoriler([]);
        return;
      }

      const anahtar = `favoriler_${aktifKullanici}`;
      const kayitliFavoriler = await AsyncStorage.getItem(anahtar);
      setFavoriler(kayitliFavoriler ? JSON.parse(kayitliFavoriler) : []);
    }

    favorileriGetir();
  }, [aktifKullanici]);

  async function favoriDegistir(filmId) {
    if (!aktifKullanici) return;

    const yeniFavoriler = favoriler.includes(filmId)
      ? favoriler.filter((id) => id !== filmId)
      : [...favoriler, filmId];

    setFavoriler(yeniFavoriler);

    const anahtar = `favoriler_${aktifKullanici}`;
    await AsyncStorage.setItem(anahtar, JSON.stringify(yeniFavoriler));
  }

  function favoriMi(filmId) {
    return favoriler.includes(filmId);
  }

  return (
    <FilmContext.Provider
      value={{ filmler, favoriler, yukleniyor, hata, favoriDegistir, favoriMi }}
    >
      {children}
    </FilmContext.Provider>
  );
}

export function useFilmler() {
  return useContext(FilmContext);
}