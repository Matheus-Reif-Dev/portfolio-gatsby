import React, { useContext } from "react";
import { LanguageContext } from "/src/context/LanguageContext";
import brazilFlag from "../assets/brazil-flag.png";
import usaFlag from "../assets/usa-flag.png";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <div className="language-switcher">
      <button
        className={language === "pt" ? "active" : ""}
        onClick={() => toggleLanguage("pt")}
      >
        <img src={brazilFlag} alt="Português" />
      </button>
      <button
        className={language === "en" ? "active" : ""}
        onClick={() => toggleLanguage("en")}
      >
        <img src={usaFlag} alt="English" />
      </button>
    </div>
  );
}
