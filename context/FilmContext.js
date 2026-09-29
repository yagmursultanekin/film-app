import { createContext, useState, useContext, useEffect } from 'react';
import turHaritasi from '../data/turler';

const FilmContext = createContext();

const API_ANAHTARI = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export function FilmProvider({ children }) {
  const [filmler, setFilmler] = useState([]);
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

  return (
    <FilmContext.Provider value={{ filmler, yukleniyor, hata }}>
      {children}
    </FilmContext.Provider>
  );
}

export function useFilmler() {
  return useContext(FilmContext);
}