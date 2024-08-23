import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import StakeNft from "./StakeNft";
import { getWalletOfOwner } from "../../../ContractAction/EVCNFTContractAction";
import {
  getTokensOfStaker,
  getUnClaimableReward,
  getNextClaimingTime,
} from "../../../ContractAction/EVCNFTStakeContractAction";
import {
  getIsApprovedForAll,
  setNFTApprovalForAll,
} from "../../../ContractAction/EVCNFTContractAction";
import UnstakeComp from "./UnstakeComp";
import StakeComp from "./StakeComp";
import Repurchase from "./Repurchase";
import { useTranslation } from "react-i18next";
import { color } from "framer-motion";

var rewardobj = {};
var claimTimeobj = {};

function MintNew({ title }) {
  const [walletOwner, SetWalletOwner] = useState();
  const [activeTab, setActiveTab] = useState("home");
  const [stakeOfOwnerNFTIDs, setStakeOfOwnerNFTIDs] = useState();
  const [isApproved, setApproved] = useState();
  const { t } = useTranslation();
  console.log("isApproved", isApproved);

  useEffect(() => {
    document.title = title ? title : "TT Avatars | MINTER AVATARS";
    document.querySelector(".page-title").innerText = "MINTER AVATARS";
    window.localStorage.setItem("walletOwner", walletOwner);
  }, []);

  useEffect(() => {
    //dev: Get the  NFT Staking Data
    const getNFTStakingData = async () => {
      const WalletOfOwner = await getWalletOfOwner();
      const StakeOfOwnerNFTIDs = await getTokensOfStaker();
      const approved = await getIsApprovedForAll();
      SetWalletOwner(WalletOfOwner);
      setStakeOfOwnerNFTIDs(StakeOfOwnerNFTIDs);
      setApproved(approved);
    };
    getNFTStakingData();
  }, []);

  //dev: Define  Next Claim Time
  const nextClaimTime = window.localStorage.getItem("nextClaim ");
  console.log("nextClaimTime", nextClaimTime);

  //dev: Show the Current Time
  const start = Date.now();
  let epoch = start / 1000;
  let myepoch = epoch.toFixed(0);
  console.log("epoch...", myepoch);

  useEffect(() => {
    //dev: get the  Reward
    const getReward = async () => {
      if (typeof stakeOfOwnerNFTIDs !== "undefined") {
        for (let i = 0; i < stakeOfOwnerNFTIDs.length; i++) {
          const rewardinfo = await getUnClaimableReward(stakeOfOwnerNFTIDs[i]);
          rewardobj[stakeOfOwnerNFTIDs[i]] = Number(rewardinfo).toLocaleString(
            undefined,
            { maximumFractionDigits: 2 }
          );
        }
      }
    };
    getReward();
    console.log("rewardobj", rewardobj);

    //dev: Get the Claim Time
    const getClaimTime = async () => {
      if (typeof stakeOfOwnerNFTIDs !== "undefined") {
        for (let i = 0; i < stakeOfOwnerNFTIDs.length; i++) {
          const timeInfo = await getNextClaimingTime(stakeOfOwnerNFTIDs[i]);
          claimTimeobj[stakeOfOwnerNFTIDs[i]] = timeInfo;
        }
      }
    };
    getClaimTime();
    console.log("claimTimeobj", claimTimeobj);
  }, [stakeOfOwnerNFTIDs]);

  return (

    <div style={{ background: "#201f24", height: "100vh", marginTop: "50px" }}>
      <div className="dashboard-wrap ">
        <div className="dashboard-wrap-area">
          <div className="d-flex align-items-center justify-content-center mb-4 mb-md-5">
            <ul className="nav nav-tabs p-2" id="myTab" role="tablist">
              <li className="nav-item w-30 avatar-mint-reward" role="presentation">
                <button
                  className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                  id="home-tab"
                  onClick={() => setActiveTab("home")}
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected={activeTab === "home"}
                >
                  {t("Stake")}
                </button>
              </li>
              <li className="nav-item avatar-mint-reward" role="presentation">
                <button
                  className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                  id="profile-tab"
                  onClick={() => setActiveTab("profile")}
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected={activeTab === "profile"}
                >
                  {t("UnStake")}
                </button>
              </li>
              <li className="nav-item avatar-mint-reward" role="presentation">
                <button
                  className={`nav-link ${activeTab === "Repurchase" ? "active" : ""
                    }`}
                  id="Repurchase-tab"
                  onClick={() => setActiveTab("Repurchase")}
                  type="button"
                  role="tab"
                  aria-controls="Repurchase"
                  aria-selected={activeTab === "Repurchase"}
                >
                  {t("Repurchase")}
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content" id="myTabContent">
            <div
              className={`tab-pane fade ${activeTab === "home" ? "show active" : ""
                }`}
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <StakeComp />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""
                }`}
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <UnstakeComp />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "Repurchase" ? "show active" : ""
                }`}
              id="Repurchase"
              role="tabpanel"
              aria-labelledby="Repurchase-tab"
            >
              <Repurchase />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintNew;
