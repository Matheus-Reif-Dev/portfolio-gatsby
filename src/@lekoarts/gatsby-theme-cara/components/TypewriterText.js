import React from "react";
import { motion } from "framer-motion";

// Cada palavra terá uma transição rápida (0.1s)
const wordVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.1 } // Duração de 0.15s para cada palavra
  }
};

// O container define o delay entre as palavras (0.05s)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03, // Delay entre cada palavra para efeito fluído
    },
  },
};

// Função que divide o texto em palavras, preservando os espaços
const renderTextAsWords = (text) => {
  return text.split(/(\s+)/).map((word, index) => {
    return (
      <motion.span
        key={index}
        variants={wordVariants}
        style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      >
        {word}
      </motion.span>
    );
  });
};

/**
 * Função recursiva que processa cada nó:
 * - Se for uma string, transforma em um container de palavras animadas.
 * - Se for um elemento React e seu conteúdo for uma string, clona o elemento e substitui o conteúdo pela versão animada.
 * - Se for um elemento React com filhos (como array ou fragment), processa recursivamente cada filho.
 */
const processNode = (node) => {
  if (typeof node === "string") {
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "inline" }}
      >
        {renderTextAsWords(node)}
      </motion.span>
    );
  }

  if (React.isValidElement(node)) {
    const { children } = node.props;

    if (typeof children === "string") {
      return React.cloneElement(
        node,
        { key: node.key },
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline" }}
        >
          {renderTextAsWords(children)}
        </motion.span>
      );
    } else if (Array.isArray(children)) {
      const newChildren = React.Children.map(children, (child) =>
        processNode(child)
      );
      return React.cloneElement(node, { key: node.key }, newChildren);
    }
    return node;
  }

  return node;
};

const TypewriterText = ({ children, keyProp }) => {
  if (!children) {
    console.warn("TypewriterText recebeu um valor inválido:", children);
    return null;
  }

  return (
    <motion.div key={keyProp} style={{ display: "inline-block" }}>
      {React.Children.map(children, (child) => processNode(child))}
    </motion.div>
  );
};

export default TypewriterText;
