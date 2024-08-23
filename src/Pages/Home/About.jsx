import React from "react";
import LazyLoadImage from "../../Components/Global/LazyImage";
import SectionTitle from "../../Components/Single/SectionTitle";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
//dev: ASSETS
import aboutImage from "../../assets/img/regular/about.svg";
import { Navigation } from "swiper";
import { Height } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//dev: start About Page
const About = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width:991px)");
  return (
    <div
      className="section-gap position-relative theme-about"
      id="About"
      style={{ marginTop: "0px", padding: "80px 0px 80px 0px" }}
    >
      <div className="container" style={{ marginTop: "0px" }}>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center">
            <div
              className="image-effect"
              style={{
                // marginTop: '10vh',
                "@media (max-width: 900px)": {
                  marginTop: "0",
                  important: true,
                },
              }}
            >
              <LazyLoadImage
                src={aboutImage}
                style={{
                  borderRadius: "3% 3%",
                  height: "400px",
                  "@media (max-width: 991.98px)": {
                    height: "0",
                  },
                }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div class="mt-2">
              <SectionTitle
                pre={t("ABOUT")}
                main={t("Welcome to the")}
                main1={t("World of TT Avatar.")}
                subFull
                mainTitleSize={"68px"}
                subWidth1={"49vw"}
                subTitleSize={isMobile ? "96px" : "68px"}
                subTitleSize1={isMobile ? "96px" : "68px"}
                // subWidth={'49vw'}
                mainColor={"#4E8664"}
                fontweightmain={"700"}
                fontweightpre={"700"}
                marginTop={["-45px", "0"]}
                marginLeft={["-96px", "0"]}
                mainMarginTop={"-8px"}
              />
            </div>
            <div>
              <div className="about-slider-area">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: ".about-swiper-button-next",
                    prevEl: ".about-swiper-button-prev",
                  }}
                >
                  <SwiperSlide>
                    <p style={{ fontSize: isMobile ? "30px" : "20px",textAlign:"center" }}>
                      {" "}
                      {t(
                        "The revolutionary blockchain-based ecosystem that brings together the potential of web 3.0 advertising, all-in-one product creation, and expansive cross-chain avatars. When you hold a TT avatar, you not only gain access to exclusive features but also get rewarded Trend tokens that fuels your journey within our vibrant community."
                      )}
                    </p>
                  </SwiperSlide>
                  <SwiperSlide style={{ fontSize: isMobile ? "30px" : "20px",textAlign:"center" }}>
                    {t(
                      "Our platform simplifies website creation & the token creation process, allowing you to unleash your creativity and customize your token to reflect your vision. In addition, our platform offers seamless integration with Trend Decentralized Exchange, providing a secure and efficient marketplace for trading your token."
                    )}
                  </SwiperSlide>
                  <SwiperSlide style={{ fontSize: isMobile ? "30px" : "20px",textAlign:"center" }}>
                    {" "}
                    {t(
                      "To further boost your project's visibility, our platform also extends its support to the Trend Web3 Ads platform, where you can advertise your token and reach a wider audience within the web3 crypto community."
                    )}
                  </SwiperSlide>
                  <SwiperSlide style={{ fontSize: isMobile ? "30px" : "20px",textAlign:"center" }}>
                    {t(
                      "By leveraging these powerful tools, crypto startups can effectively jumpstart their projects and accelerate their journey towards success."
                    )}
                  </SwiperSlide>
                  {/* <SwiperSlide style={{ fontSize: isMobile ? "30px" : "20px",textAlign:"center" }}>
                    {t(
                      "By leveraging these powerful tools, crypto startups can effectively jumpstart their projects and accelerate their journey towards success."
                    )}
                  </SwiperSlide> */}
                </Swiper>
              </div>
              <div className="slider-controls">
                <div className= {isMobile ? "d-flex gap-3 align-items-center justify-content-center" : "d-flex gap-3 align-items-center" }>
                  <div className="icon-square icon-md icon-circle icon-gradient cursor-pointer about-swiper-button-prev">
                    <FaCaretLeft className="me-1" />
                  </div>
                  <div className="icon-square icon-md icon-circle icon-gradient cursor-pointer about-swiper-button-next">
                    <FaCaretRight className="ms-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
