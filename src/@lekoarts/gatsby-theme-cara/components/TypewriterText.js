import React from "react";
import { motion } from "framer-motion";

const TypewriterText = ({ children, keyProp }) => {
  if (!children) {
    console.warn("TypewriterText recebeu um valor inválido:", children);
    return null;
  }

  return (
    <motion.div
      key={keyProp} // Garante que o efeito reinicie ao mudar de idioma
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1, // O texto aparece totalmente em 2s
        ease: "easeOut",
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1, // Cada bloco de texto aparece rapidamente
            delay: index * 0.1, // Pequeno delay entre parágrafos
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TypewriterText;
