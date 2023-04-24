import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import viJson from './vi.json'
import enJson from './en.json'
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)


const resources = {
  en: enJson,
  vi:viJson
};


console.log(resources)
i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "vi", 
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;