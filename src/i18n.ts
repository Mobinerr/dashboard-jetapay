import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEn from 'locales/en/translation.json';
import translationFa from 'locales/fa/translation.json';

// translations
const resources = {
    en: {
        translation: translationEn,
    },
    fa: {
        translation: translationFa,
    },
};

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en', // use en if detected lng is not available
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
