import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as Icon1 } from "../../assets/img/dashboard/icons/tokend-icon-1.svg";
import ReactSpeedometer from "react-d3-speedometer";
import busd from "../../assets/img/dashboard/icons/tticon.svg";
import evcLogo from "../../assets/img/dashboard/icons/evc-logo.png";
import evcLogoLg from "../../assets/img/dashboard/icons/evc-logo-lg.png";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import icon1 from "../../assets/img/dashboard/img/rank-icon1.png"
import icon2 from "../../assets/img/dashboard/img/rank-icon2.png"
import icon3 from "../../assets/img/dashboard/img/rank-icon3.png"

import {
  getRBEarning,
  getUniLevelEarning,
} from "../../ContractAction/EVCNFTContractAction";
import {
  getRemainingRbEvcValue,
  getClaimedRbEvcValue,
  getRbClaimPerc,
  setClaimRB,
} from "../../ContractAction/PoolContractAction";
import AdPopup from "../../Components/Single/adPopup";
import {
  APIGETADS,
  BaseExplorerUrl,
} from "../../ContractAction/ContractDependency";
import { useTranslation } from "react-i18next";
//dev: start RankBonus Page
const useStyles = makeStyles({
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
});

const RankBonus = ({ title }) => {
  //dev: Get the address for local storage
  const [RBEarningBUSDValue, setRBEarningBUSDValue] = useState(0);
  const [uniLevelEarningValue, setUniLevelEarningValue] = useState(0);
  const [remainingEvcRbValue, setRemainingEvcRbValue] = useState(0);
  const [RBClaimedEVCValue, setRBClaimedEVCValue] = useState(0);
  const [RbClaimPerc, setRbClaimPerc] = useState(0);
  const [overallRewardUSDC, setOverallRewardUSDC] = useState(0);
  const [segmentColors, setSegmentColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adsData, setAdsData] = useState();
  const [showPopup, setShowPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [adsStatus, setAdsStatus] = useState(
    JSON.parse(localStorage.getItem("adsStatus")) || false
  );
  const { t } = useTranslation();
  const classes = useStyles();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  console.log("showPopup", showPopup);
  const setClaimrB = async () => {
    let txHash = await setClaimRB();
    handleTxhashShow(txHash);
  };

  const handleTxhashShow = async (e) => {
    toast.success(
      <div>
        Transaction Receipt: <br />
        <a
          href={`${BaseExplorerUrl}tx/${e}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Block Explorer
        </a>
      </div>,
      {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const fetchSegmentColors = async () => {
    try {
      const percValue = await getRbClaimPerc();
      const totalSegments = 10; // Total number of segments
      const coloredSegments = Math.ceil((percValue / 100) * totalSegments);
      const newSegmentColors = Array(totalSegments).fill("#FFFFFF1F");
      for (let i = 0; i < coloredSegments; i++) {
        newSegmentColors[i] = "#306FFF";
      }
      setSegmentColors(newSegmentColors);
    } catch (error) {
      console.error("Error fetching segment colors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch segment colors when the component mounts
    fetchSegmentColors();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const RBBUSDInfo = await getRBEarning();
      const uniLevelInfo = await getUniLevelEarning();
      setUniLevelEarningValue(uniLevelInfo);
      setOverallRewardUSDC(Number(RBBUSDInfo) + Number(uniLevelInfo));
      setRBEarningBUSDValue(Number(RBBUSDInfo));
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const RBBUSDInfo = await getRBEarning();
      setRBEarningBUSDValue(RBBUSDInfo);
      const uniLevelInfo = await getUniLevelEarning();
      console.log("i am bonous", uniLevelInfo);
      setUniLevelEarningValue(uniLevelInfo);
      setOverallRewardUSDC(Number(RBBUSDInfo) + Number(uniLevelInfo));
      const RBEVCInfo = await getClaimedRbEvcValue();
      setRBClaimedEVCValue(Number(RBEVCInfo).toFixed(4));
      const remainingRbInfo = await getRemainingRbEvcValue();
      setRemainingEvcRbValue(Number(remainingRbInfo).toFixed(4));
      const rbClaimPerc = await getRbClaimPerc();
      // setRbClaimPerc(Number(rbClaimPerc));

      if (remainingRbInfo == 0) {
        setRbClaimPerc(0);
      } else {
        setRbClaimPerc(Number(rbClaimPerc));
      }
    };
    getData();
  }, []);

  useEffect(() => {
    document.title = title ? title : "TT Avatars | Rank Bonus";
    document.querySelector(".page-title").innerText = "Rank Bonus";
  }, []);

  //21 ads
  const fetch21Ads = async () => {
    try {
      const walletAddress = localStorage.getItem("connectedAccount");
      const response = await axios.get(
        // "https://viewer.trendads.ai/api/tt/getCount/0xa20579A8625d1EFe7a668cd0EBc161388A9e637D"
        `https://viewer.trendads.ai/api/tt/getCount/${walletAddress}`
      );
      if (response?.data?.statusCode === 200) {
        setAdsData(response?.data);
        localStorage.setItem(
          "adsStatus",
          JSON.stringify(response?.data?.watchedAdsStatus)
        );
        localStorage.setItem("watchedAds", response?.data?.watchedAds);
        localStorage.setItem("remainedAds", response?.data?.remainedAds);
        console.log("adsData", response?.data);
      }
      if (response?.data?.errorCode === 404) {
        setAdsStatus(false);
        localStorage.setItem(
          "adsStatus",
          JSON.stringify(response?.data?.watchedAdsStatus)
        );
        localStorage.setItem("watchedAds", response?.data?.watchedAds);
        localStorage.setItem("remainedAds", response?.data?.remainedAds);
      }
    } catch (error) {
      console.log("Error fetching 21 ads:", error);
    }
  };
  console.log("adsStatus", adsStatus);

  useEffect(() => {
    if (adsStatus === false) {
      fetch21Ads();
    }
  }, []);
  const fetch21Adstrue = async () => {
    if (adsStatus === true) {
      try {
        const walletAddress = localStorage.getItem("connectedAccount");
        const response = await axios.get(
          // "https://viewer.trendads.ai/api/tt/getCount/0xa20579A8625d1EFe7a668cd0EBc161388A9e637D"
          `https://viewer.trendads.ai/api/tt/getCount/${walletAddress}`
        );
        if (response?.data?.statusCode === 200) {
          setAdsData(response?.data);
          localStorage.setItem(
            "adsStatus",
            JSON.stringify(response?.data?.watchedAdsStatus)
          );
          localStorage.setItem("watchedAds", response?.data?.watchedAds);
          localStorage.setItem("remainedAds", response?.data?.remainedAds);
          console.log("adsData", response?.data);
        }
        if (response?.data?.errorCode === 404) {
          setAdsStatus(false);
          localStorage.setItem(
            "adsStatus",
            JSON.stringify(response?.data?.watchedAdsStatus)
          );
          localStorage.setItem("watchedAds", response?.data?.watchedAds);
          localStorage.setItem("remainedAds", response?.data?.remainedAds);
        }
      } catch (error) {
        console.log("Error fetching 21 ads:", error);
      }
    }
  }

  return (
    <div style={{ background: "#201f24", minHeight: "100vh" }} className="rank-bonus-section">
      <div className="dashboard-wrap">
        <div className="dash-content-area p-0 mt-2">
          <div className="container-fluid g-0">
            {/* dev: Total Commission Earned  */}
            <div className="row ">
              <div className="col-md-6 col-lg-4 mb-3 mb-lg-0">
                <div className="dash-global-wrap">
                  <div className="dash-global-inner">
                    <div className="d-flex align-items-center gap-2 mb-3 mb-md-4">
                      <div className="rank-image me-1"><img src={icon1} alt="" /></div>
                      <div className="rank-bonus line-effect text-muted">
                        {t("Total Unilevel Commission Earned")}
                        (USDC)
                      </div>
                    </div>
                    <div className="rank-bonus-num mb-2 pb-1 text-muted count-text">
                      {t("Level")} 1 - 10
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img src={busd} alt="" className="img-fluid logo-img" />
                      <span className="rank-bonus-num font-gilroy value h3 mb-0">
                        {uniLevelEarningValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3 mb-lg-0">
                <div className="dash-global-wrap">
                  <div className="dash-global-inner">
                    <div className="d-flex align-items-center gap-2 mb-3 mb-md-4">
                      <div className="rank-image me-1"><img src={icon2} alt="" /></div>
                      <div className="rank-bonus line-effect text-muted">
                      {t("Total Rank Bonus Commission")}
                      (USDC)
                      </div>
                    </div>
                    <div className="rank-bonus-num mb-2 pb-1 text-muted count-text">
                    {t("Rank Bonus")}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img src={busd} alt="" className="img-fluid logo-img" />
                      <span className="rank-bonus-num font-gilroy value h3 mb-0">
                      {RBEarningBUSDValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="dash-global-wrap">
                  <div className="dash-global-inner">
                    <div className="d-flex align-items-center gap-2 mb-3 mb-md-4">
                      <div className="rank-image me-1"><img src={icon3} alt="" /></div>
                      <div className="rank-bonus line-effect text-muted">
                      {t("Total Rank Bonus Commission Claimed")} (TRND)
                      </div>
                    </div>
                    <div className="rank-bonus-num mb-2 pb-1 text-muted count-text">
                    {t("Rank Bonus")}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img src={busd} alt="" className="img-fluid logo-img" />
                      <span className="rank-bonus-num font-gilroy value h3 mb-0">
                      {RBEarningBUSDValue}
                      </span>
                    </div>
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

export default RankBonus;
