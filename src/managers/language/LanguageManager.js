import LocalizedStrings from "react-localization";
export const Strings = new LocalizedStrings({
  en: {
  }

});

export const saveLanguage = languageCode => {
  Strings.setLanguage(languageCode);
};

export const getLaungage = () => {
  return Strings.getLanguage();
};
