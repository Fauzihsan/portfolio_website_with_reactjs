import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import LoadingAnimation from "../components/LoadingAnimation";
import { useQuery } from "@apollo/client";
import { GetPortfolioById, GetPortfolioCategory } from "../graphql/query";

function PortfolioDetailPage() {
  const params = useParams();
  const id = params.id;
  const { data, loading } = useQuery(GetPortfolioById, { variables: { portfolio_id: id } });
  const { data: portfolioCategory } = useQuery(GetPortfolioCategory);

  if (loading) return <LoadingAnimation />;
  return (
    <>
      <div className="container lg:py-5 md:py-3 py-1 mx-auto">
        <Link to="/portfolio">
          <button className="p-3 hover:bg-gray-200">
            <FaArrowLeft style={{ color: "#24507b", fontSize: "24px" }} />
          </button>
        </Link>
        <div className="card-story flex flex-col justify-center items-center py-10 px-5 mx-auto mt-10 gap-y-5">
          <Slider image={data?.portfolio[0].imagePortfolio} />
          <div className="flex flex-col lg:w-1/2 w-full gap-y-2">
            <p className="title-detail-portfolio text-center lg:text-2xl text-sm">{data?.portfolio[0].title}</p>
            {portfolioCategory?.portfolio_category.map(
              (item) =>
                item.id === data?.portfolio[0].categories_id && (
                  <p key={item.id} className="category-detail-portfolio text-start text-sm">
                    {item.name_category}
                  </p>
                )
            )}
            <p className="description-detail-portfolio text-justify">{data?.portfolio[0].description}</p>
          </div>
        </div>
      </div>
      <Footer dark="true" />
    </>
  );
}

export default PortfolioDetailPage;
