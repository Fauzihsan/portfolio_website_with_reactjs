import React from "react";
import { useParams } from "react-router-dom";

function PortfolioDetailPage() {
  const params = useParams();
  return <h1>Portfolio Detail Page {params.portfolioId}</h1>;
}

export default PortfolioDetailPage;
