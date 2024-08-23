import React from 'react'
import { ToastContainer } from 'react-toastify'
import "../../assets/scss/theme/dashboard/TrendProducts.scss"
import trendadlogo from "../../assets/img/dashboard/icons/trendads.png"
import trenddx from "../../assets/img/dashboard/icons/trenddxlogo.png"
import trendifyweblogo from "../../assets/img/dashboard/icons/trendifyweblogo.png"
import trendpad from "../../assets/img/dashboard/icons/trendpad.png"
import trendifyTokenLogo from "../../assets/img/dashboard/icons/TrendifyTokenLogo.png"
import trendifywebCover from "../../assets/img/dashboard/icons/TrendifyWeb.png"
import trendifyTokenCover from "../../assets/img/dashboard/icons/TrendifyTokenCover.png"
import trendpadCover from "../../assets/img/dashboard/icons/TrendPadbg.png"
import trenddxCover from "../../assets/img/dashboard/icons/trenddxCover.png"
import trendadsCover from "../../assets/img/dashboard/icons/TrendadCover.png"
import { redirect } from 'react-router-dom'
import { useTranslation } from "react-i18next"



function TrendProducts() {
  const { t } = useTranslation();
  const redirectToWebsite = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ background: "#201f24", minHeight: "100vh" }}>
      {/* dev: Token Details */}
      <ToastContainer />
      <div className="dashboard-wrap" >
        <div className="dash-content-area-shree mt-2 p-0">
          <div className="row g-4">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 d-flex">
              <div className="trendproduct-card box-wraper w-100">
                <div className="top-images">
                  <div className="trendproduct-card-img-overlay overlay-button">
                    <img src={trendifyweblogo} className="trendproduct-card-title" alt="trendifyweb" />
                  </div>
                  <div className="thumbnail-img">
                    <img src={trendifywebCover} className="trendproduct-card-img-top" alt="trendifywebCover" />
                  </div>
                </div>
                <div className="trendproduct-card-body">
                  <p className="trendproduct-card-text card-text mb-4 pt-3">{t("Get your Website Designed and Published using Al, with TrendifyWeb.")}</p>
                  <button onClick={() => redirectToWebsite("https://trendifyweb.ai/")} className="evc-bv-title btn btn-primary-bg-custom trendproduct-button">{t("Explore Now")}</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 d-flex">
              <div className="trendproduct-card box-wraper w-100">
                <div className="top-images">
                  <div className="trendproduct-card-img-overlay overlay-button">
                    <img src={trendifyTokenLogo} className="trendproduct-card-title" alt="trendifyTokenLogo" />
                  </div>
                  <div className="thumbnail-img">
                    <img src={trendifyTokenCover} className="trendproduct-card-img-top" alt="trendifyTokenCover" />
                  </div>

                </div>
                <div className="trendproduct-card-body">
                  <p className="trendproduct-card-text card-text mb-4 pt-3">{t("Create & manage your own crypto tokens across multiple blockchain networks.")}</p>
                  <button
                    onClick={() => redirectToWebsite("https://trendifytokens.io/")}
                    className="evc-bv-title btn btn-primary-bg-custom  trendproduct-button">{t("Explore Now")}</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 d-flex">
              <div className="trendproduct-card box-wraper w-100">
                <div className="top-images">
                  <div className="trendproduct-card-img-overlay overlay-button">
                    <img src={trendpad} className="trendproduct-card-title" alt="Trenddx" />
                  </div>
                  <div className="thumbnail-img">
                    <img src={trendpadCover} style={{ borderRadius: "2px" }} className="trendproduct-card-img-top" alt="..." />
                  </div>
                </div>
                <div className="trendproduct-card-body">
                  <p className="trendproduct-card-text card-text mb-4 pt-3">{t("TrendPad: Empowering Innovations - Your Gateway to the Future of Crypto.")}</p>
                  <button
                    // onClick={() => redirectToWebsite("https://trenddx.io/")}
                    className="evc-bv-title btn btn-primary-bg-custom trendproduct-button">{t("Coming Soon")}</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 d-flex">
              <div className="trendproduct-card box-wraper w-100">
                <div className="top-images">
                  <div className="trendproduct-card-img-overlay overlay-button">
                    <img src={trenddx} className="trendproduct-card-title" alt="Trenddx" />
                  </div>
                  <div className="thumbnail-img">
                    <img src={trenddxCover} className="trendproduct-card-img-top" alt="..." />
                  </div>
                </div>
                <div className="trendproduct-card-body">
                  <p className="trendproduct-card-text card-text mb-4 pt-3">{t("Swap your any Coin with your favorite once now with Trenddx.")}</p>
                  <button onClick={() => redirectToWebsite("https://trenddx.io/")} className="evc-bv-title btn btn-primary-bg-custom trendproduct-button">{t("Explore Now")}</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 d-flex">
              <div className="trendproduct-card box-wraper w-100">
                <div className="top-images">
                  <div className="trendproduct-card-img-overlay overlay-button">
                    <img src={trendadlogo} className="trendproduct-card-title" alt="Trendads" />
                  </div>
                  <div className="thumbnail-img">
                    <img src={trendadsCover} className="trendproduct-card-img-top" alt="..." />
                  </div>
                </div>
                <div className="trendproduct-card-body ">
                  <p className="trendproduct-card-text card-text mb-4 pt-3">{t("Watch Ads and earn rewards or be a Advertisers only on Trendads.")}</p>

                  <button onClick={() => redirectToWebsite("https://trendads.ai/")} className="evc-bv-title btn btn-primary-bg-custom trendproduct-button">{t("Explore Now")}</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendProducts