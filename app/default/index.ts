import React from "react";
import DefaultPortfolio01 from "./v1.0.0/portfolio-01/src/pages/home";
import DefaultPortfolio02 from "./v1.0.0/portfolio-02/src/pages/home";
import DefaultPortfolio03 from "./v1.0.0/portfolio-03/src/pages/home";
import DefaultPortfolio04 from "./v1.0.0/portfolio-04/src/pages/home";
import DefaultPortfolio05 from "./v1.0.0/portfolio-05/src/pages/home";
import DefaultPortfolio06 from "./v1.0.0/portfolio-06/src/pages/home";
import DefaultPortfolio07 from "./v1.0.0/portfolio-07/src/pages/home";

export {
  DefaultPortfolio01,
  DefaultPortfolio02,
  DefaultPortfolio03,
  DefaultPortfolio04,
  DefaultPortfolio05,
  DefaultPortfolio06,
  DefaultPortfolio07,
};

const DefaultPortfolios: { [key: string]: [string,React.ComponentType] } = {
  "Portfolio01": ["portfolio01",DefaultPortfolio01],
  "Portfolio02": ["portfolio02",DefaultPortfolio02],
  "Portfolio03": ["portfolio03",DefaultPortfolio03],
  "Portfolio04": ["portfolio04",DefaultPortfolio04],
  "Portfolio05": ["portfolio05",DefaultPortfolio05],
  "Portfolio06": ["portfolio06",DefaultPortfolio06],
  "Portfolio07": ["portfolio07",DefaultPortfolio07],
};

export default DefaultPortfolios;
