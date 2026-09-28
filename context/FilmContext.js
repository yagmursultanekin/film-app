import { createContext, useState, useContext } from 'react';
import filmlerVerisi from '../data/filmler';

const FilmContext = createContext();

export function FilmProvider({ children }) {
  const [filmler, setFilmler] = useState(filmlerVerisi);

  function filmEkle(yeniFilm) {
    setFilmler((oncekiListe) => [...oncekiListe, yeniFilm]);
  }

  return (
    <FilmContext.Provider value={{ filmler, filmEkle }}>
      {children}
    </FilmContext.Provider>
  );
}

export function useFilmler() {
  return useContext(FilmContext);
}