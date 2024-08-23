import React from "react";
import SectionTitle from "../../Components/Single/SectionTitle";
import TokenomicsChart from "../../Components/Single/Chart";
import { ReactComponent as HeroVectorLeft } from "../../assets/img/vectors/hero-right-blur.svg";
import { ReactComponent as HeroVectorRight } from "../../assets/img/vectors/hero-right-blur.svg";
import tokenomics from "../../assets/img/regular/tokenomics.svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
//dev: Start Tockenomics Page
const Tockenomics = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width:991px)");

  return (
    <div
      className="section-gap position-relative-bg-custom"
      id="tok"
      style={{ backgroundImage: `url(${tokenomics})`, paddingTop: "120px" }}
    >
      <div
        className="container align-items-center justify-content-center mb-0"
        style={{ marginBottom: "0px", paddingBottom: "0px" }}
      >
        <SectionTitle
          pre={t("Tokenomics")}
          main={t("Trend Token serves as the native currency within our")}
          main1={t(
            "ecosystem, enabling you to engage with a range of exciting"
          )}
          main2={t("products services and benefits.")}
          fontweightmain1={"500"}
          fontweightmain={"500"}
          className="text-center"
          fontweightpre={"700"}
          mainTitleSize={"64px"}
          subTitleSize={isMobile ? "24px" : "16px"}
          subTitleSize1={isMobile ? "24px" : "16px"}
          subFull={"text-center"}
        />
      </div>
      {/* dev:TokenomicsChart  */}
      <div className="d-flex flex-row align-item-center justify-content-center mt-5 w-100">
        <TokenomicsChart />
      </div>
    </div>
  );
};

export default Tockenomics;
