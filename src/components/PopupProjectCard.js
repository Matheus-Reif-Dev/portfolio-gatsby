import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Ícone de fechar
import "./PopupProjectCard.css";

export default function PopupProjectCard({ title, bg, skills, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10); // Inicia a animação após abrir
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300); // Aguarda a animação antes de fechar
  };

  return (
    <>
      {/* Cartão do Projeto */}
      <div className="popup-project-card" style={{ background: bg }} onClick={openModal}>
        <h3>{title}</h3>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="popup-modal-overlay" onClick={closeModal}>
          <div
            className={`popup-modal-content ${isAnimating ? "open" : "close"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-modal-close" onClick={closeModal}>
              <FaTimes size={20} />
            </button>

            {children}

            {/* Competências dentro do pop-up */}
            <div className="popup-skills-container">
              {skills.map((skill, index) => (
                <span key={index} className="popup-skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
