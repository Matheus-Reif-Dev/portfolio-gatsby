import React from "react";
import { motion } from "framer-motion";

// Cada letra terá uma transição rápida (0.1s)
const letterVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.1 } // Duração de 0.1s para cada letra
  }
};

// O container define o delay entre as letras (0.02s)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.01, // Delay de 0.02s entre cada letra
    },
  },
};

// Função que divide o texto em letras, preservando os espaços
const renderTextAsLetters = (text) => {
  return text.split("").map((char, index) => {
    // Se for espaço, utiliza o espaço não separável para preservá-lo
    const content = char === " " ? "\u00A0" : char;
    return (
      <motion.span
        key={index}
        variants={letterVariants}
        style={{ display: "inline-block", whiteSpace: "pre" }}
      >
        {content}
      </motion.span>
    );
  });
};

/**
 * Função recursiva que processa cada nó:
 * - Se for uma string, transforma em um container de letras animadas.
 * - Se for um elemento React e seu conteúdo for uma string, clona o elemento e substitui o conteúdo pela versão animada.
 * - Se for um elemento React com filhos (como array ou fragment), processa recursivamente cada filho.
 */
const processNode = (node) => {
  // Se o nó for uma string, renderiza as letras com o efeito de digitação
  if (typeof node === "string") {
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      >
        {renderTextAsLetters(node)}
      </motion.span>
    );
  }

  // Se for um elemento React válido
  if (React.isValidElement(node)) {
    const { children } = node.props;

    // Se o conteúdo for uma string, clona o elemento e insere a animação
    if (typeof children === "string") {
      return React.cloneElement(
        node,
        { key: node.key },
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
        >
          {renderTextAsLetters(children)}
        </motion.span>
      );
    }
    // Se o conteúdo for um array (por exemplo, um fragmento com múltiplos filhos),
    // processa cada filho recursivamente
    else if (Array.isArray(children)) {
      const newChildren = React.Children.map(children, (child) =>
        processNode(child)
      );
      return React.cloneElement(node, { key: node.key }, newChildren);
    }
    // Se não for string nem array, retorna o nó como está
    return node;
  }

  // Se não for string nem elemento React, retorna como está
  return node;
};

const TypewriterText = ({ children, keyProp }) => {
  if (!children) {
    console.warn("TypewriterText recebeu um valor inválido:", children);
    return null;
  }

  return (
    <motion.div key={keyProp}>
      {React.Children.map(children, (child) => processNode(child))}
    </motion.div>
  );
};

export default TypewriterText;
