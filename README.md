# 🎬 Film Arşivim

Kişisel film arşivi mobil uygulaması — React Native & Expo ile geliştirildi. TMDB API'den gelen güncel film verilerini listeler, kullanıcıya özel favori sistemi sunar ve Türkçe/İngilizce dil desteği içerir.

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TMDB%20API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white" />
</p>

---

## ✨ Özellikler

- 🔐 **Kayıt & Giriş** — form doğrulama, şifre gücü göstergesi, kullanıcıya özel hesap
- 🔑 **Oturum Hatırlama** — uygulamayı kapatıp açsan da giriş yapmış kalırsın
- 🎞️ **Gerçek Film Verisi** — TMDB API üzerinden popüler filmler, posterler, puanlar
- ❤️ **Kullanıcıya Özel Favoriler** — her kullanıcının favori listesi birbirinden bağımsız
- 🔍 **Arama, Filtreleme, Sıralama** — isme/puana/yıla/türe göre
- 🌐 **Çoklu Dil Desteği** — Türkçe / İngilizce, arayüz ve film verisi dahil
- 💾 **Yerel Depolama** — AsyncStorage ile cihazda kalıcı veri, sunucu gerektirmez

---

## 🛠️ Kullanılan Teknolojiler

| Katman | Teknoloji |
|---|---|
| Framework | React Native (Expo) |
| Navigasyon | React Navigation (Native Stack) |
| Veri Kaynağı | TMDB API |
| Yerel Depolama | AsyncStorage |
| Durum Yönetimi | React Context API |
| Dropdown/Seçici | @react-native-picker/picker |

---

## 📂 Proje Yapısı

```
film-app/
├── screens/        # Kayıt, Giriş, Liste, Detay, Favoriler ekranları
├── context/        # Auth, Film ve Dil yönetimi (Context API)
├── components/      # Tekrar kullanılan arayüz parçaları
├── data/            # Tür ve çeviri tabloları
└── App.js           # Navigasyon ve Context kurulumu
```

---

## 🚀 Kurulum

```bash
git clone https://github.com/yagmursultanekin/film-app.git
cd film-app
npm install
```

`.env` dosyası oluştur ve TMDB API anahtarını ekle:
```
EXPO_PUBLIC_TMDB_API_KEY=senin_api_anahtarin
```

Uygulamayı başlat:
```bash
npx expo start
```

---

## 📱 Ekranlar

| Giriş | Liste | Detay | Favoriler |
|---|---|---|---|
| Form doğrulama + şifre gücü | Arama, filtre, sıralama | Poster, puan, açıklama | Kullanıcıya özel favori listesi |

---

## 📄 Lisans

Bu proje eğitim/staj amaçlı geliştirilmiştir.
