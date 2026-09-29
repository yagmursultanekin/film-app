import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import turHaritasi from '../data/turler';

const FilmContext = createContext();

const API_ANAHTARI = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const FAVORI_ANAHTARI = 'favoriFilmler';

export function FilmProvider({ children }) {
  const [filmler, setFilmler] = useState([]);
  const [favoriler, setFavoriler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');

  useEffect(() => {
    async function baslangicVerisi() {
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

        const kayitliFavoriler = await AsyncStorage.getItem(FAVORI_ANAHTARI);
        if (kayitliFavoriler) {
          setFavoriler(JSON.parse(kayitliFavoriler));
        }
      } catch (e) {
        setHata('Filmler yüklenirken bir hata oluştu.');
      } finally {
        setYukleniyor(false);
      }
    }

    baslangicVerisi();
  }, []);

  async function favoriDegistir(filmId) {
    const yeniFavoriler = favoriler.includes(filmId)
      ? favoriler.filter((id) => id !== filmId)
      : [...favoriler, filmId];

    setFavoriler(yeniFavoriler);
    await AsyncStorage.setItem(FAVORI_ANAHTARI, JSON.stringify(yeniFavoriler));
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