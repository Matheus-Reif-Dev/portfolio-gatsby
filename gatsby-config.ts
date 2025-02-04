import type { GatsbyConfig, PluginRef } from "gatsby";
import "dotenv/config";

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

const config: GatsbyConfig = {
  siteMetadata: {
    siteTitle: `Meu Portfólio`,
    siteTitleAlt: `Portfólio - Desenvolvedor Full Stack`,
    siteHeadline: `Portfólio - Projetos e Experiência`,
    siteUrl: `https://seu-site.com`,
    siteDescription: `Portfólio moderno criado com Gatsby, apresentando projetos e habilidades com animações e efeitos visuais dinâmicos.`,
    siteImage: `/banner.jpg`,
    siteLanguage: `pt-br`,
    author: `@matheusReif`,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-cara`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Meu Portfólio - Desenvolvedor Full Stack`,
        short_name: `Portfólio`,
        description: `Portfólio moderno criado com Gatsby, apresentando projetos e habilidades com animações e efeitos visuais dinâmicos.`,
        start_url: `/`,
        background_color: `#121212`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
};

export default config;
