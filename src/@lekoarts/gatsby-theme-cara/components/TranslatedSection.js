import React, { useContext } from "react";
import { LanguageContext } from "/src/context/LanguageContext";
import TypewriterText from "./TypewriterText";

export default function TranslatedSection({ pt, en }) {
  const context = useContext(LanguageContext);

  if (!context) {
    return <TypewriterText keyProp="pt">{pt}</TypewriterText>;
  }

  const { language } = context;
  return <TypewriterText keyProp={language}>{language === "en" ? en : pt}</TypewriterText>;
}


