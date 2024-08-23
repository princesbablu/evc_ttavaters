import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  allowanceBUSD,
  setBUSD_NFTStakeApprove,
} from "../../../ContractAction/BUSDContractAction";
import {
  setRepurchaseNFT,
  getCheckRepurchase,
} from "../../../ContractAction/EVCNFTStakeContractAction";
import { Box, Card } from "@chakra-ui/react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import StakeNft from "./StakeNft";
import { getWalletOfOwner } from "../../../ContractAction/EVCNFTContractAction";
import {
  getTokensOfStaker,
  setClaimReward,
  getUnClaimableReward,
  getCurrentAPROfNFTLevel,
  getNextClaimingTime,
  getRewardPercentage,
} from "../../../ContractAction/EVCNFTStakeContractAction";
import { setWithdrawNFT } from "../../../ContractAction/EVCNFTStakeContractAction";
import { ContractAddressTTAVATARSSTAKE } from "../../../ContractAction/ContractDependency";
import { getIsApprovedForAll } from "../../../ContractAction/EVCNFTContractAction";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import level1 from "../Mint/Images/level1.png";
import level2 from "../Mint/Images/level2.png";
import level3 from "../Mint/Images/level3.png";
import level4 from "../Mint/Images/level4.png";
import level5 from "../Mint/Images/level5.png";
import level6 from "../Mint/Images/level6.png";
import level7 from "../Mint/Images/level7.png";
import level8 from "../Mint/Images/level8.png";
import card1 from "../../../assets/img/dashboard/img/cardimgavtoe.png"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "yellow" : "#308fe8",
  },
}));

//dev: Progressbar for  EVC NFT
const Progressbar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 0,
  };

  const Childdiv = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "left",
  };

  const progresstext = {
    paddingLeft: "25px",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

//dev: Start Mint Page
function UnstakeComp({ }) {
  //dev: Stake NFTs

  const navigate = useNavigate();
  const [walletOwner, SetWalletOwner] = useState();
  const [rewardObj, setRewardObj] = useState({});
  const [rewardPercentageObj, setRewardPercentageObj] = useState({});
  const [claimTimeObj, setClaimTimeObj] = useState({});
  const [checkRepurchaseForId, setCheckRepurchaseForId] = useState({});
  const [BusdAllowanceNftStake, setBusdAllowanceNftStake] = useState();
  const [adsStatus, setAdsStatus] = useState(
    JSON.parse(localStorage.getItem("adsStatus")) || "false"
  );
  const [adsData, setAdsData] = useState();
  const [shouldFetchAds, setShouldFetchAds] = useState(false);

  const { t } = useTranslation();
  console.log("rewardPercentageObj", rewardPercentageObj);
  //dev: Unstake NFTs
  const [stakeOfOwnerNFTIDs, setStakeOfOwnerNFTIDs] = useState([]);
  console.log("stakeOfOwnerNFTIDs......................", stakeOfOwnerNFTIDs);
  //dev: Img URL
  const imgUrl =
    "https://ipfs.io/ipfs/QmcMJqnnQeZeNnnnDh4Dar2HuxrnibFzLxjG9BanHPcGq4/";
  const [isApproved, setApproved] = useState();
  console.log("isApproved", isApproved);
  const [apy, setApy] = useState({});

  const redirectToBuyAvatars = () => {
    navigate("/dashboard/tt-avatars");
  };

  useEffect(() => {
    //dev: Get the  NFT Staking Data
    const getNFTStakingData = async () => {
      const WalletOfOwner = await getWalletOfOwner();
      const StakeOfOwnerNFTIDs = await getTokensOfStaker();
      const approved = await getIsApprovedForAll();
      const allowanceBusdToNftstake = await allowanceBUSD(
        ContractAddressTTAVATARSSTAKE
      );
      SetWalletOwner(WalletOfOwner);
      setStakeOfOwnerNFTIDs(StakeOfOwnerNFTIDs);
      setApproved(approved);
      setBusdAllowanceNftStake(allowanceBusdToNftstake);
    };
    getNFTStakingData();
  }, []);

  useEffect(() => {
    //dev: get the Reward
    const getReward = async () => {
      if (typeof stakeOfOwnerNFTIDs !== "undefined") {
        for (let i = 0; i < stakeOfOwnerNFTIDs.length; i++) {
          const rewardinfo = await getUnClaimableReward(stakeOfOwnerNFTIDs[i]);
          const rewardPercentage = await getRewardPercentage(
            stakeOfOwnerNFTIDs[i]
          );
          const timeInfo = await getNextClaimingTime(stakeOfOwnerNFTIDs[i]);
          const checkRepurchaseForIdBool = await getCheckRepurchase(
            stakeOfOwnerNFTIDs[i]
          );
          const apyInfo = await getCurrentAPROfNFTLevel(stakeOfOwnerNFTIDs[i]);
          setRewardObj((prevRewardObj) => ({
            ...prevRewardObj,
            [stakeOfOwnerNFTIDs[i]]: Number(rewardinfo).toLocaleString(
              undefined,
              { maximumFractionDigits: 10 }
            ),
          }));
          setRewardPercentageObj((prevRewardPercentageObj) => ({
            ...prevRewardPercentageObj,
            [stakeOfOwnerNFTIDs[i]]: rewardPercentage,
          }));
          setClaimTimeObj((prevClaimTimeObj) => ({
            ...prevClaimTimeObj,
            [stakeOfOwnerNFTIDs[i]]: timeInfo,
          }));
          setCheckRepurchaseForId((prevCheckRepurchaseForIdBool) => ({
            ...prevCheckRepurchaseForIdBool,
            [stakeOfOwnerNFTIDs[i]]: checkRepurchaseForIdBool,
          }));
          setApy((prevNFTLevelAPR) => ({
            ...prevNFTLevelAPR,
            [stakeOfOwnerNFTIDs[i]]: apyInfo,
          }));
        }
      }
    };
    getReward();
    const updateLocalValueGetReward = setInterval(getReward, 10000);
    return () => clearInterval(updateLocalValueGetReward);
  }, [stakeOfOwnerNFTIDs]);

  const ClaimRewards = async (data2) => {
    if (claimTimeObj[data2] <= epoch) {
      const response = await setClaimReward(data2);
      console.log("response34", response);
      if (response && localStorage.getItem("adsStatus") === "true") {
        fetchAddtrue();
      }
      console.log("ClaimRewards response", response);
    } else {
      alert("wait till next claimable timing");
    }
  };

  useEffect(() => {
    //set the walletOwner on Local Storage
    window.localStorage.setItem("walletOwner", walletOwner);
  }, []);

  //dev: Define  Next Claim Time
  const nextClaimTime = window.localStorage.getItem("nextClaim ");
  console.log("nextClaimTime", nextClaimTime);

  //dev: Show the Current Time
  const start = Date.now();
  let epoch = start / 1000;
  let myepoch = epoch.toFixed(0);
  console.log("epoch...", myepoch);

  const [stake, setStake] = useState(false);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  console.log("rewardObj", rewardObj);
  console.log("rewardPercentageObj", rewardPercentageObj);
  console.log("claimTimeObj", claimTimeObj);
  console.log("checkRepurchaseForId", checkRepurchaseForId);

  const getImgUrlId = (data2) => {
    console.log("data2", data2);

    if (data2 >= 1 && data2 <= 600000) {
      return 1;
    } else if (data2 >= 600001 && data2 <= 900000) {
      return 21;
    } else if (data2 >= 900001 && data2 <= 1100000) {
      return 31;
    } else if (data2 >= 1100001 && data2 <= 1200000) {
      return 41;
    } else if (data2 >= 1200001 && data2 <= 1250000) {
      return 51;
    } else if (data2 >= 1250001 && data2 <= 1270000) {
      return 61;
    } else if (data2 >= 1270001 && data2 <= 1280000) {
      return 71;
    } else if (data2 >= 1280001 && data2 <= 1285000) {
      return 81;
    } else {
      // Add a default value or handle other cases as needed
      return null;
    }
  };

  const getImgAsset = (data1) => {
    if (data1 >= 1 && data1 <= 600000) {
      return level1;
    } else if (data1 >= 600001 && data1 <= 900000) {
      return level2;
    } else if (data1 >= 900001 && data1 <= 1100000) {
      return level3;
    } else if (data1 >= 1100001 && data1 <= 1200000) {
      return level4;
    } else if (data1 >= 1200001 && data1 <= 1250000) {
      return level5;
    } else if (data1 >= 1250001 && data1 <= 1270000) {
      return level6;
    } else if (data1 >= 1270001 && data1 <= 1280000) {
      return level7;
    } else if (data1 >= 1280001 && data1 <= 1285000) {
      return level8;
    } else {
      // Add a default value or handle other cases as needed
      return null;
    }
  };

  const fetch21Ads = async () => {
    try {
      const walletAddress = localStorage.getItem("connectedAccount");
      const response = await axios.get(
        `https://viewer.trendads.ai/api/tt/getCount/${walletAddress}`
      );
      if (response?.data?.statusCode === 200) {
        console.log("response.data", response?.data);

        setAdsData(response?.data);

        localStorage.setItem(
          "adsStatus",
          JSON.stringify(response?.data?.watchedAdsStatus)
        );
        setAdsStatus(localStorage.getItem("adsStatus"));
        localStorage.setItem("watchedAds", response?.data?.watchedAds);
        localStorage.setItem("remainedAds", response?.data?.remainedAds);

        console.log("adsData", response?.data);
      }
      if (response?.data?.errorCode === 404) {
        console.log("Inside404");
        setAdsStatus(false);
        localStorage.removeItem("adsStatus");
        localStorage.removeItem("watchedAds");
        localStorage.setItem("remainedAds");

        toast.success(response?.data?.developermsg);
      }
    } catch (error) {
      console.log("Error fetching 21 ads:", error);
      if (error?.response?.data?.errorCode === 404) {
        console.log("Inside404");
        setAdsStatus(false);
        localStorage.removeItem("adsStatus");
        localStorage.removeItem("watchedAds");
        localStorage.removeItem("remainedAds");

        // toast.warn(error?.response?.data?.developermsg);
      }
    }
  };

  console.log("adsStatus", adsStatus);

  useEffect(() => {
    fetch21Ads();
  }, [adsStatus]);


  const handleClickToast = () => {
    console.log("radu nko");

    alert("To UnStake Watch Add's first");
  };

  const fetchAddtrue = async () => {
    const note = true;

    try {
      const walletAddress = localStorage.getItem("connectedAccount");
      const response = await axios.get(
        `https://viewer.trendads.ai/api/tt/getCount/${walletAddress}?note=${note}`
      );
      if (response?.data?.statusCode === 200) {
        console.log("insidefetchAddtrue");

        setAdsData(response?.data);
        localStorage.setItem(
          "adsStatus",
          JSON.stringify(response?.data?.watchedAdsStatus)
        );
        setAdsStatus(localStorage.getItem("adsStatus"));

        localStorage.setItem("watchedAds", response?.data?.watchedAds);
        localStorage.setItem("remainedAds", response?.data?.remainedAds);
        console.log("adsData", response?.data);
        // window.location.reload();
      }
      if (response?.data?.errorCode === 404) {
        setAdsStatus(false);
        toast.success(response?.data?.developermsg);
        localStorage.setItem(
          "adsStatus",
          JSON.stringify(response?.data?.watchedAdsStatus)
        );
        localStorage.setItem("watchedAds", response?.data?.watchedAds || 0);
        localStorage.setItem("remainedAds", response?.data?.remainedAds || 0);
      }
    } catch (error) {
      console.log("Error fetching ads:", error);
    }
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        className="row d-flex justify-content-center"
        style={{ marginLeft: "10px", width: "100%" }}
      >
        {
          //stakeOfOwnerNFTIDs.length == 0?
          // <div class="card mt-5" style={{ width: "50%", height: "90px", }}>
          //   <div class="card-body d-flex ">
          //   <p className="stake-text card-text me-5">Staking will start after 20-July-2024</p>
          //     <button onClick={() => redirectToBuyAvatars()} style={{ background: "linear-gradient(149.3deg, #02DB5B -29.94%, #4977C1 135.03%", color: "white" }} className="btn btn-primary-bg-custom mb-5 p-2">Buy Avatars</button>
          //   </div>
          // </div>
          // <></>
          // :
          stakeOfOwnerNFTIDs?.map((data2, index) => (
            <div
              className="col-sm-6 col-xl-3 col-xxl-3 mt-3 col-sm-12"
              key={index}
            >
              <div className="card-evc h-100 d-flex flex-column">
                <div className="evc-avatar">
                  <h6 style={{ textAlign: "center" }}>
                    {" "}
                    {data2 >= 1 && data2 <= 600000
                      ? "Crypto Newbies"
                      : data2 >= 600001 && data2 <= 900000
                        ? "Crypto Enthusiast"
                        : data2 >= 900001 && data2 <= 1100000
                          ? "Crypto Entrepreneur"
                          : data2 >= 1100001 && data2 <= 1200000
                            ? "Crypto Investor"
                            : data2 >= 1200001 && data2 <= 1250000
                              ? "Crypto King"
                              : data2 >= 1250001 && data2 <= 1270000
                                ? "Blockchain Mogul"
                                : data2 >= 1270001 && data2 <= 1280000
                                  ? "Bitcoin Billionaire"
                                  : data2 >= 1280001 && data2 <= 1285000
                                    ? "CryptoCap Tycoon"
                                    : null}
                  </h6>
                  <div>
                    <img
                      src={getImgAsset(data2)}
                      alt=""
                      className="img-fluid"
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "10px",
                        marginBottom: "5%",
                      }}
                    />
                    <br></br>
                    <span>
                      APR : <span>{apy[data2]}% </span>
                    </span>
                    <div className="d-flex ">
                      <span> TRND Earned : </span>
                      <span>{rewardObj[data2]} </span>
                    </div>
                  </div>

                  <Box sx={{ flexGrow: 1 }}>
                    <Progressbar
                      bgcolor="#64dd17"
                      progress={rewardPercentageObj[data2]}
                      height={20}
                    />
                  </Box>
                  <br></br>

                  {checkRepurchaseForId[data2] ? (
                    (data2 >= 1 && data2 <= 600000
                      ? 100
                      : data2 >= 600001 && data2 <= 900000
                        ? 500
                        : data2 >= 900001 && data2 <= 1100000
                          ? 1000
                          : data2 >= 1100001 && data2 <= 1200000
                            ? 2500
                            : data2 >= 1200001 && data2 <= 1250000
                              ? 5000
                              : data2 >= 1250001 && data2 <= 1270000
                                ? 10000
                                : data2 >= 1270001 && data2 <= 1280000
                                  ? 25000
                                  : data2 >= 1280001 && data2 <= 1285000
                                    ? 50000
                                    : 0) <= Number(BusdAllowanceNftStake) ? (
                      <div style={{ marginTop: "-15" }}>
                        <button
                          className="btn btn-primary-bg-custom bt-sm w-100"
                          onClick={() => setRepurchaseNFT(data2)}
                          style={{
                            background: "transparent",
                            border: "1px solid",
                            borderRadius: "8px",
                            backgroundColor: "rgba(29, 42, 42, 1)",
                            borderColor: "#25a98e",
                            height: "20px",
                            borderImageSlice: 1,
                            color: "#25a98e",
                            height: "30px",
                            fontSize: "14px",
                            marginTop: "-15",
                          }}
                        >
                          Repurchase
                        </button>
                      </div>
                    ) : (
                      <div style={{ marginTop: "-15" }}>
                        <button
                          className="btn btn-primary-bg-custom  btn-sm w-100"
                          onClick={() => setBUSD_NFTStakeApprove()}
                          style={{
                            background: "transparent",
                            border: "1px solid",
                            borderRadius: "8px",
                            backgroundColor: "rgba(29, 42, 42, 1)",
                            borderColor: "#25a98e",
                            borderImageSlice: 1,
                            color: "#25a98e",
                            height: "30px",
                            fontSize: "14px",
                          }}
                        >
                          Approve Repurchase
                        </button>
                      </div>
                    )
                  ) : (
                    <div
                      className="d-grid gap-1 d-md-flex justify-content-center "
                      style={{ marginTop: "-15px" }}
                    >
                      <button
                        className="btn btn-primary-bg-custom  btn-sm w-100"
                        type="button"
                        // onClick={() => ClaimRewards(data2)}
                        onClick={() => handleClickOpen()}
                        style={{
                          background: "transparent",
                          border: "1px solid",
                          borderRadius: "8px",
                          backgroundColor: "rgba(29, 42, 42, 1)",
                          borderColor: "#25a98e",
                          borderImageSlice: 1,
                          color: "#25a98e",
                          height: "30px",
                          fontSize: "14px",
                        }}
                      >
                        Claim
                      </button>
                      <button
                        className="btn btn-primary-bg-custom btn-sm w-100  "
                        type="button"
                        // onClick={
                        //   adsStatus
                        //     ? () =>
                        //         setWithdrawNFT(data2).then(() => fetchAddtrue())
                        //     : handleClickToast
                        // }
                        onClick={() => handleClickOpen()}
                        style={{
                          background: "transparent",
                          border: "1px solid",
                          borderRadius: "8px",
                          backgroundColor: "rgba(29, 42, 42, 1)",
                          borderColor: "#25a98e",
                          borderImageSlice: 1,
                          color: "#25a98e",
                          height: "30px",
                          fontSize: "14px",
                        }}
                      >
                        {t("Unstake")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="card-seciton">
        <div className="row justify-content-center">
          <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
            <div className="stake-card">
              <p className="card-header mb-3 pb-md-1 text-center">Crypto Enthusiast</p>
              <div className="stake-card-img"><img src={card1} alt="" /></div>
              <p className="card-title">APR : 108%</p>
              <p className="des" >TRND : Earned :73,828873</p>
              <div className="bar mb-3">
                <div className="bar-line"></div>
              </div>
              <div className="btns d-flex align-items-center gap-2">
                <div className="btn1 w-100"><button className="btn w-100">Claim</button></div>
                <div className="btn2 w-100"><button className="btn w-100">Unstake</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-lg-flex flex-row justify-content-center gap-4">
        <div className="btn-g mb-2 mb-lg-0"><button className="btn btn-bottom"> {localStorage.getItem("watchedAds")}Ads Watched</button></div>
        <div className="btn-g mb-2 mb-lg-0"><button className="btn btn-bottom">{localStorage.getItem("remainedAds")}Ads Remaining</button></div>
        <div className="btn-g"><button className="btn btn-bottom" disabled={localStorage.getItem("adsStatus") === "true"} onClick={() => window.open("https://viewer.trendads.ai/", "_blank")}>Watch Ad</button></div>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          style={{ borderRadius: "0px important" }}
        >
          <DialogContent
            style={{
              backgroundColor: "rgb(32, 31, 36)",
              borderRadius: "0px !important",
            }}
          >
            <DialogContentText
              className="text-center"
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
                color: "white",
              }}
            >
              The Claim and UnStake button will become active in a few days
              following the maintenance update.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            className="d-flex justify-content-center"
            style={{ backgroundColor: "rgb(32, 31, 36)" }}
          >
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "rgba(78, 134, 100, 1)",
                color: "black",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default UnstakeComp;
