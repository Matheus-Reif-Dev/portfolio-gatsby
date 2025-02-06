import React, { useContext } from "react";
import { LanguageContext } from "/src/context/LanguageContext";

export default function InlineTranslatedSection({ pt, en }) {
  const context = useContext(LanguageContext);

  if (!context) {
    return pt; // Caso não tenha contexto, exibe o PT padrão
  }

  const { language } = context;
  return language === "en" ? en : pt;
}
