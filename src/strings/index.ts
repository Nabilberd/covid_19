import i18n from 'i18next';
import { initReactI18next, useTranslation as useTranslationI18n } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from "./locals/fr";
import ar from "./locals/ar";

// the translations
const resources = {
    fr: {
        translation: fr
    },
    ar: {
        translation: ar,

    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources : resources,
        fallbackLng: 'ar',
        debug: true,
        cleanCode: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }

    });

export function useTranslation() {
    const [Strings, Preferences]  = useTranslationI18n();
    return {Strings, Preferences, Direction: Preferences.dir()};
}
export function getDirection() {
    return i18n.dir();
}
export function changeLanguage(lang: string){
    return i18n.changeLanguage(lang);
}
export function getLanguage(){
    return i18n.language
}