import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import turHaritasi from '../data/turler';
import { useAuth } from './AuthContext';

const FilmContext = createContext();

const API_ANAHTARI = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export function FilmProvider({ children }) {
  const { aktifKullanici } = useAuth();

  const [filmler, setFilmler] = useState([]);
  const [favoriler, setFavoriler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');

  useEffect(() => {
    async function filmleriGetir() {
      try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_ANAHTARI}&language=tr-TR&page=1`;
        const cevap = await fetch(url);
        const veri = await cevap.json();

        const donusturulmusListe = veri.results.map((film) => ({
          id: film.id.toString(),
          ad: film.title,
          yil: film.release_date ? Number(film.release_date.slice(0, 4)) : 0,
          tur: film.genre_ids && film.genre_ids.length > 0
            ? turHaritasi[film.genre_ids[0]] || 'Bilinmiyor'
            : 'Bilinmiyor',
          turler: film.genre_ids
            ? film.genre_ids.map((id) => turHaritasi[id]).filter(Boolean)
            : [],
          puan: film.vote_average,
          aciklama: film.overview,
          posterYolu: film.poster_path,
        }));

        setFilmler(donusturulmusListe);
      } catch (e) {
        setHata('Filmler yüklenirken bir hata oluştu.');
      } finally {
        setYukleniyor(false);
      }
    }

    filmleriGetir();
  }, []);

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