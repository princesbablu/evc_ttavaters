import React from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../Components/Single/SectionTitle";
import {useTranslation} from 'react-i18next';

//dev: Start Roadmap Page
const Roadmap = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="section-gap bg-pattern roadmap ">
      <div className="container">
        <SectionTitle
          main={t("ROADMAP")}
          sub={t("Our Roadmap to Decentralizing Infrastructures")}
          className="text-center"
        />
      </div>
      <div className="overflow-hidden">
        <div className="container">
          <div className="timeline-vertical mx-3">
            <Swiper
              spaceBetween={40}
              // slidesPerView={4}
              breakpoints={{
                595: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1080: {
                  slidesPerView: 4,
                },
               
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".roadmap-swiper-button-next",
                prevEl: ".roadmap-swiper-button-prev",
              }}


            >
              {/* dev: Swiper Slider */}
              <SwiperSlide>
                <div 
                class="card-step" 
                >
                  <span></span>
                  <div className="mx-5" style={{ marginTop: "-25px" }}>
                    <div className="card-title font-gilroy mb-3">{t("Q1 2024")}</div>
                    <ul>
                      <li>{t("Creation & Launch of website.")}</li>
                      <li >{t("Smart Contract Audit.")}</li>
                      <li >{t("Smart Contract Deployment.")}</li>
                      <li>{("Quality assurance and")}<br />{t("testing of complete platform")}</li>
                    </ul>


                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card-step">
                  <span></span>
                  <div className="mx-5" style={{ marginTop: "-25px" }}>
                    <div className="card-title font-gilroy mb-3">{t("Q2 2024")}</div>
                    <ul>
                      <li>{t("Launch of Trend Swap.")}</li>
                      <li>{t("Listing on Trend Swap.")}</li>
                      <li>{t("Launch AI Website creator.")}</li>
                      {/* <li>Global Marketing Campaign.</li> */}

                    </ul>
                  </div>

                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card-step-unchecked">
                  <span></span>
                  <div className="mx-5" style={{ marginTop: "-25px" }}>
                    <div className="card-title font-gilroy mb-3">{t("Q3 2024")}</div>
                    <ul>
                      <li>{t("Launch of Trend Web3 ads portal.")}</li>
                      <li>{t("Launch of TrendPad.")}</li>
                      <li>{t("Launch of AI Smart contract creator.")}</li>
                      <li>{t("Tier 2 CEX Listing.")}</li>
                      <li>{t("Partnerships.")}</li>


                    </ul>
                  </div>

                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card-step-unchecked">
                  <span></span>
                  <div className="mx-5" style={{ marginTop: "-25px" }}>
                    <div className="card-title font-gilroy mb-3">{t("Q4 2024")}</div>
                    <ul>
                      <li>{t("Tier 1 CEX Lisiting.")}</li>
                      <li >{t("More Partnership.")}</li>
                      <li >{t("Launch our first blockchain game.")} </li>
                    </ul>
                  </div>

                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card-step-unchecked">
                  <span></span>
                  <div className="mx-5" style={{ marginTop: "-25px" }}>

                  <div className="card-title font-gilroy mb-3">{t("Q5 2025")}</div>
                  <ul>
                    <li >{t("Launch of Cross Chain")}<br />{t("Avatar")}</li>
                     <li>{t("Global Marketing Campaign.")}</li> 

                  </ul>
                </div>

                </div>
              </SwiperSlide>
              {/* <SwiperSlide>
                <div className="card-step">
                  <span></span>
                  <div className="card-title font-gilroy mb-3">Q4 2024</div>
                  <ul>
                    <li>Launch of Cross <br></br>Chain NFT Avatar</li>
                  </ul>
                </div>
              </SwiperSlide> */}
            </Swiper>

          </div>
          <div className="slider-controls mt-5 ">
            <div className="d-flex gap-3 align-items-center justify-content-center">
              <div className="icon-square icon-md icon-circle icon-gradient cursor-pointer roadmap-swiper-button-prev">
                <FaCaretLeft className="me-1" />
              </div>
              <div className="icon-square icon-md icon-circle icon-gradient cursor-pointer roadmap-swiper-button-next">
                <FaCaretRight className="ms-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;