import axios, { AxiosResponse } from "axios";

interface PortfolioResponse {
  success: boolean;
  message: string;
  data?: any;
}

class _Portfolio {
  async getPublicPortfolio(
    portfolioId: string,
    accessToken: string
  ): Promise<AxiosResponse<PortfolioResponse>> {
    try {
      const response = await axios.get<PortfolioResponse>(
        `/api/v1/portfolio/public/${portfolioId}/${accessToken}`
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Get Public Portfolio Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while fetching public portfolio."
      );
    }
  }
}

export const Portfolio = new _Portfolio(); 