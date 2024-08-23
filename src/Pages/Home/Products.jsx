import React from "react";
import ProductsComponent from "./ProductsComponent";
import project1 from "../../assets/img/icons/project1.svg";
import project2 from "../../assets/img/icons/project2.svg";
import project3 from "../../assets/img/icons/project3.svg";
import project4 from "../../assets/img/icons/project4.svg";
import project5 from "../../assets/img/icons/project5.svg";
import project6 from "../../assets/img/icons/project6.svg";
import project7 from "../../assets/img/icons/project7.svg";
import project8 from "../../assets/img/icons/project8.svg";
import project9 from "../../assets/img/icons/project9.svg";
import { Scrollbar, Navigation, Pagination } from "swiper";
import productsImage from "../../assets/img/regular/Products.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaCaretLeft, FaCaretRight, FaEthereum } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Products() {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width:991px)");

  return (
    <div id="Products">
      <div
        className=""
        style={{
          backgroundImage: `url(${productsImage})`,
          paddingTop: "120px",
           paddingBottom: "120px"
        }}
      >
        <div
          className="d-flex align-item-center justify-content-center fw-bold "
          style={{ fontSize: "64px", fontWeight: "500" }}
        >
          {t("PRODUCTS")}
        </div>
        <div
          className="overflow-hidden"
          style={{ marginTop: isMobile ? "50px" : "104px" }}
        >
          <div className="container overflow-swiper ">
            <Swiper
              scrollbar={{
                el: ".nft-scrollbar",
              }}
              //  spaceBetween={"auto"}
              //  slidesPerView={3}
              breakpoints={{
                595: {
                  slidesPerView: 1,
                },
                768: {
                  // spaceBetween: 60,
                  slidesPerView: 1,
                },
                1080: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                },
              }}
              pagination={{
                clickable: true,
              }}
              className="nft-swiper"
              modules={[Scrollbar, Navigation, Pagination]}
              navigation={{
                nextEl: ".nft-swiper-button-next",
                prevEl: ".nft-swiper-button-prev",
              }}
            >
              <SwiperSlide>
                <ProductsComponent
                  Icon={project1}
                  Title={t("Website Creator")}
                  Description={t(
                    "Quickly generate AI-powered websites in just minutes."
                  )}
                  url={"https://trendifyweb.ai/"}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductsComponent
                  Icon={project2}
                  Title={t("Token Creator")}
                  Description={t(
                    "Develop custom tokens for traditional or innovative projects, including unique Genesis minting tokens for passive rewards in the crypto space."
                  )}
                  url={"https://trendifytokens.io/"}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductsComponent
                  Icon={project3}
                  Title={t("TrendPad")}
                  Description={t(
                    "Simplify fundraising and token launches with seamless processes."
                  )}
                  text="(Coming Soon)"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductsComponent
                  Icon={project4}
                  Title={t("TrendSwap")}
                  Description={t(
                    "Experience the next generation of token swapping with special features like adjustable token burn and the ability to send to a genesis address for increased price stability."
                  )}
                  url={"https://trenddx.io/"}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductsComponent
                  Icon={project5}
                  Title={t("Trend Web3 Ads Portal")}
                  Description={t(
                    "Reach a targeted audience in the Web3 community through an advertising platform that not only connects you with potential users but also offers rewards for viewing ads."
                  )}
                  url={"https://trendads.ai/"}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductsComponent
                  Icon={project6}
                  Title={t("Staking")}
                  Description={t(
                    "Earn additional rewards by participating in long-term holding of assets."
                  )}
                  text="(Coming Soon)"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductsComponent
                  Icon={project7}
                  Title={t("Games")}
                  Description={t(
                    "Enjoy entertaining games that also offer opportunities to earn rewards while playing."
                  )}
                  text="(Coming Soon)"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductsComponent
                  Icon={project8}
                  Title={t("Cross Chain Avatar")}
                  Description={t(
                    "Create your personalized 3D avatar using your own photo, allowing it to traverse various Metaverses across different chains."
                  )}
                  text="(Coming Soon)"
                />
              </SwiperSlide>
              {/* <SwiperSlide>
                <ProductsComponent Icon={project9} Title="Trend Blockchain" Description="A cutting-edge blockchain solution with rapid transaction speeds, minimal fees, and advanced features for developing..." text="(Coming Soon)" />
              </SwiperSlide> */}
            </Swiper>
            <div className="slider-controls mt-4 ">
              <div className="d-flex gap-3 align-items-center justify-content-center">
                <div className="icon-square icon-md icon-circle icon-gradient cursor-pointer nft-swiper-button-prev">
                  <FaCaretLeft className="me-1" />
                </div>
                <div className="icon-square icon-md icon-circle icon-gradient cursor-pointer nft-swiper-button-next">
                  <FaCaretRight className="ms-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
