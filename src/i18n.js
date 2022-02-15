import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { lang } from './lib/param'

// import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import it from './locales/it.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
//import nl from './locales/nl.json'

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  pt: {
    translation: pt,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  de: {
    translation: de,
  },
  /* nl: {
    translation: nl,
  }, */
}

//i18n.use(LanguageDetector) //嗅探当前浏览器语言 zh-CN
i18n
  .use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({
    //初始化
    resources, //本地多语言数据
    fallbackLng: 'en', //默认的语言
    lng: lang,
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    },
  })

export default i18n
