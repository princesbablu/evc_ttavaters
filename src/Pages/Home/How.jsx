import React from "react";
import { ReactComponent as HeroVectorLeft } from "../../assets/img/vectors/work-left-blur.svg";
import { ReactComponent as HeroVectorRight1 } from "../../assets/img/vectors/work-right-blur-1.svg";
import { ReactComponent as HeroVectorRight2 } from "../../assets/img/vectors/work-right-blur-2.svg";

// ASSETS
import { ReactComponent as IconLink } from "../../assets/img/icons/icon-link.svg";
import { ReactComponent as IconCart } from "../../assets/img/icons/icon-cart.svg";
import { ReactComponent as IconMint } from "../../assets/img/icons/icon-mint.svg";
import { ReactComponent as IconEarn } from "../../assets/img/icons/icon-earn.svg";
import { ReactComponent as IconSwap } from "../../assets/img/icons/icon-swap.svg";
import { ReactComponent as IconStack } from "../../assets/img/icons/icon-stack.svg";
import how1 from "../../assets/img/icons/how1.svg";
import how2 from "../../assets/img/icons/how2.svg";
import how3 from "../../assets/img/icons/how3.svg";
import how4 from "../../assets/img/icons/how4.svg";
import how5 from "../../assets/img/icons/how5.svg";
import how6 from "../../assets/img/icons/how6.svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import howitworks from "../../assets/img/regular/howitworks.svg";
import howbg from "../../assets/img/regular/howbg.png";

//dev: List for works
const howList = [
  {
    icon: how1,
    title: "Connect",
    text: "Choose a crypto wallet like Metamask or Trust Wallet",
  },
  {
    icon: how2,
    title: "Contribute",
    text: "Choose your desire TRND Avatar & contribute USDC (BASE)",
  },
  {
    icon: how3,
    title: "Stake",
    text: "Stake Your Avatar",
  },
  {
    icon: how4,
    title: "Earn",
    text: "Earn daily rewards in Trend Token",
  },
  {
    icon: how5,
    title: "Swap",
    text: "Swap your Trend token in Trendswap",
  },
  {
    icon: how6,
    title: "HODL",
    text: "Earn APR by holding onto your Trend Token.",
  },
];

const How = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width:991px)");

  return (
    <div
      className="section-gap position-relative"
      id="how"
      style={{ backgroundImage: `url(${howitworks})` }}
    >
      <div className="z-n1 position-absolute top-100 start-0 translate-middle-y">
        {" "}
        <HeroVectorLeft />{" "}
      </div>
      <div className="z-n1 position-absolute top-100 end-0 translate-middle-y">
        {" "}
        <HeroVectorRight1 />{" "}
      </div>
      <div className="z-n1 position-absolute top-0 end-0 translate-middle-y">
        {" "}
        <HeroVectorRight2 />{" "}
      </div>

      <div className="container my-5">
        <div className="row align-items-center">
          <div className="text-center">
            <div
              className="display-3 fw-bold font-gilroy"
              style={{ fontSize: "64px" }}
            >
              {t("HOW IT WORKS")}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className="row g-5 "
          style={{ paddingLeft: "9%", paddingRight: "9%" }}
        >
          {howList.map((el, i) => {
            return (
              <div className="col-12 col-sm-12 col-lg-4 text-center" key={i}>
                <div
                  className="card-how text-center  "
                  style={{
                    minHeight: "250px",
                  }}
                >
                  <div class="d-flex justify-content-center">
                    <img src={el.icon} alt="" />
                  </div>
                  <div
                    className="card-title font-gilroy mt-1"
                    style={{ fontSize: isMobile ? "48px" : "32px" }}
                  >
                    {t(el.title)}
                  </div>
                  <p
                    className="text-secondary mt-1"
                    style={{ fontSize: isMobile ? "34px" : "18px" }}
                  >
                    {t(el.text)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default How;
