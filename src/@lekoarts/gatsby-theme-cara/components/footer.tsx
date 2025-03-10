/** @jsx jsx */
import { Box, Flex, Link, useColorMode, jsx } from "theme-ui";

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode<"light" | "dark">();
  const isDark = colorMode === `dark`;

  return (
    <Box as="footer" variant="footer">
      <button
        sx={{ variant: `buttons.toggle`, fontWeight: `semibold`, display: `block`, mx: `auto`, mb: 3 }}
        onClick={() => {
          const next = isDark ? `light` : `dark`;
          setColorMode(next);
          document.documentElement.classList.value = `theme-ui-${next}`;
        }}
        type="button"
        data-testid="color-mode-toggle"
        aria-label={isDark ? `Ativar Modo Claro` : `Ativar Modo Escuro`}
      >
        {isDark ? `Modo Claro` : `Modo Escuro`}
      </button>
      Copyright &copy; {new Date().getFullYear()}. Todos os direitos reservados.
      <br />
      <Flex
        sx={{
          justifyContent: `center`,
          alignItems: `center`,
          mt: 3,
          color: `text`,
          fontWeight: `semibold`,
          a: { color: `text` },
        }}
      >
        {isDark ? (
          <img width="30" height="30" src="https://img.lekoarts.de/gatsby/logo_v2-light_w30.png" alt="LekoArts Logo" />
        ) : (
          <img width="30" height="30" src="https://img.lekoarts.de/gatsby/logo_v2_w30.png" alt="LekoArts Logo" />
        )}
        {` `}
        <Link
          aria-label="Link para o repositório do tema no GitHub"
          sx={{ ml: 2 }}
          href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-cara"
        >
          Tema
        </Link>
        <div sx={{ mx: 1 }}>por</div>
        {` `}
        <Link
          aria-label="Link para o site do autor do tema"
          href="https://www.lekoarts.de?utm_source=cara&utm_medium=Theme"
        >
          LekoArts
        </Link>
        <div sx={{ mx: 1 }}>, modificado por</div>
        <Link
          aria-label="Link para o meu site"
          href="https://portfolio-gatsby-two-sable.vercel.app/"
        >
          Matheus Reif
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
