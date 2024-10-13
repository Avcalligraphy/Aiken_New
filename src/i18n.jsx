import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// Ambil preferensi bahasa dari localStorage, jika ada
const savedLanguage = localStorage.getItem("language") || "en"; // Default ke 'en' jika tidak ada

i18n
  .use(initReactI18next) // Menghubungkan dengan React
  .use(LanguageDetector) // Deteksi bahasa dari browser atau preferensi pengguna
  .use(HttpApi) // Mengambil file terjemahan dari server (public folder)
  .init({
    lng: savedLanguage, // Menggunakan bahasa dari localStorage
    supportedLngs: ["en", "id", "ar"], // Bahasa yang didukung
    fallbackLng: "en", // Bahasa default jika bahasa yang diinginkan tidak tersedia
    debug: true, // Aktifkan log untuk debugging
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Lokasi file terjemahan
    },
    interpolation: {
      escapeValue: false, // React sudah otomatis aman, jadi ini false
    },
  });

export default i18n;
