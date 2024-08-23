import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import StakeNft from "./StakeNft";
import { getWalletOfOwner } from "../../../ContractAction/EVCNFTContractAction";
import { getTokensOfStaker, getUnClaimableReward, getNextClaimingTime, getRewardPercentage } from "../../../ContractAction/EVCNFTStakeContractAction";
import { setStakeNFT } from "../../../ContractAction/EVCNFTStakeContractAction";
import { getIsApprovedForAll, setNFTApprovalForAll } from "../../../ContractAction/EVCNFTContractAction";
import busd from "../../../assets/img/dashboard/icons/tticon.svg"
import { useNavigate } from "react-router-dom";

import level1 from "../Mint/Images/level1.png"
import level2 from "../Mint/Images/level2.png"
import level3 from "../Mint/Images/level3.png"
import level4 from "../Mint/Images/level4.png"
import level5 from "../Mint/Images/level5.png"
import level6 from "../Mint/Images/level6.png"
import level7 from "../Mint/Images/level7.png"
import level8 from "../Mint/Images/level8.png"
import card1 from "../../../assets/img/dashboard/img/cardimgavtoe.png"

var rewardobj = {};
var claimTimeobj = {};
var rewardPercentageobj = {};

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


//dev: Progressbar for  TT NFT
const Progressbar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 0,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    padding: 10,
    color: "black",
    fontWeight: 900,
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
function StakeComp() {



  const navigate = useNavigate()
  const [walletOwner, SetWalletOwner] = useState();
  const [stakeOfOwnerNFTIDs, setStakeOfOwnerNFTIDs] = useState();
  const imgUrl = "https://ipfs.io/ipfs/QmcMJqnnQeZeNnnnDh4Dar2HuxrnibFzLxjG9BanHPcGq4/";
  const [isApproved, setApproved] = useState();

  console.log("walletOwner", walletOwner)

  useEffect(() => {
    //set the walletOwner on Local Storage
    window.localStorage.setItem("walletOwner", walletOwner);
  }, []);

  //dev: TT Chart Data
  const EvcChart = {
    series: [
      {
        name: "Claim Perc",
        data: [
          44, 55, 57, 56, 61, 58, 63, 60, 66, 40, 44, 55, 57, 44, 55, 57, 56,
          61, 58, 63, 60, 66, 40, 44, 55, 57, 44, 55, 57, 56, 61, 58, 63,
        ],
      },
      {
        name: "Total Perc",
        data: [
          3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54,
          57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99,
        ],
      },
    ],
    options: {
      colors: ["#306FFF", "#30C9C9"],
      chart: {
        height: 250,
        type: "bar",
        background: "rgba(0, 0, 0, 0)",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
        ],
      },
      yaxis: {
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
        ],
        labels: {
          formatter: function (value) {
            return value.toFixed(2);
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#1F1F2B",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        show: false,
      },
      theme: {
        mode: "dark",
        monochrome: {
          enabled: false,
          color: "#fff",
          shadeTo: "dark",
          shadeIntensity: 0,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: ["transparent"],
        width: 0,
        dashArray: 0,
      },
      dataLabels: {
        enabled: false,
      },
    },
  };


  //dev: TT Avatars
  const evc_avatars = [
    {
      title: "Crypto Newbies",
      APRUpto: "APR: Up to 84%",
      evc_no: "#EVC 1",
      price: "$110",
      bv: "$100",
    },
    {
      title: "Crypto Enthusiast",
      APRUpto: "APR: Up to 108%",
      evc_no: "#EVC 2",
      price: "$550",
      bv: "$500",
    },
    {
      title: "Crypto Entrepreneur",
      APRUpto: "APR: Up to 132%",
      evc_no: "#EVC 3",
      price: "$1,100",
      bv: "$1,000",
    },
    {
      title: "Crypto Investor",
      APRUpto: "APR: Up to 156%",
      evc_no: "#EVC 4",
      price: "$2,750",
      bv: "$2,5OO",
    },
    {
      title: "Crypto King",
      APRUpto: "APR: Up to 180%",
      evc_no: "#EVC 5",
      price: "$5,500",
      bv: "$5,000",
    },
    {
      title: "Blockchain Mogul",
      APRUpto: "APR: Up to 204%",
      evc_no: "#EVC 6",
      price: "$11,000",
      bv: "$10,000",
    },
    {
      title: "Bitcoin Billionaire",
      APRUpto: "APR: Up to 228%",
      evc_no: "#EVC 7",
      price: "$27,500",
      bv: "$25,000",
    },
    {
      title: "CryptoCap Tycoon",
      APRUpto: "APR: Up to 252%",
      evc_no: "#EVC 8",
      price: "$55,000",
      bv: "$50,000",
    },
  ];

  useEffect(() => {
    //dev: Get the  NFT Staking Data
    const getNFTStakingData = async () => {
      const WalletOfOwner = await getWalletOfOwner();
      const StakeOfOwnerNFTIDs = await getTokensOfStaker();
      const approved = await getIsApprovedForAll();
      console.log("WalletOfOwner", WalletOfOwner)
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
          const rewardPercentage = await getRewardPercentage(stakeOfOwnerNFTIDs[i]);
          const timeInfo = await getNextClaimingTime(stakeOfOwnerNFTIDs[i]);
          rewardobj[stakeOfOwnerNFTIDs[i]] = Number(rewardinfo).toLocaleString(undefined, { maximumFractionDigits: 2 });
          rewardPercentageobj[stakeOfOwnerNFTIDs[i]] = rewardPercentage;
          claimTimeobj[stakeOfOwnerNFTIDs[i]] = timeInfo;
        }
      }
    };
    getReward();
    console.log("rewardobj", rewardobj);
    console.log("claimTimeobj", claimTimeobj);
    console.log("rewardPercentageobj", rewardPercentageobj);
  }, [stakeOfOwnerNFTIDs]);

  const [stake, setStake] = useState(false);

  const Click = () => {
    setStake(true);
  };


  const getApproved = async () => {
    setNFTApprovalForAll();
  };


  const getImgUrlId = (data1) => {
    if (data1 >= 1 && data1 <= 600000) {
      return 1;
    } else if (data1 >= 600001 && data1 <= 900000) {
      return 21;
    } else if (data1 >= 900001 && data1 <= 1100000) {
      return 31;
    } else if (data1 >= 1100001 && data1 <= 1200000) {
      return 41;
    } else if (data1 >= 1200001 && data1 <= 1250000) {
      return 51;
    } else if (data1 >= 1250001 && data1 <= 1270000) {
      return 61;
    } else if (data1 >= 1270001 && data1 <= 1280000) {
      return 71;
    } else if (data1 >= 1280001 && data1 <= 1285000) {
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

  const getPricenVolume = (data1) => {
    if (data1 >= 1 && data1 <= 600000) {
      return 0;
    } else if (data1 >= 600001 && data1 <= 900000) {
      return 1;
    } else if (data1 >= 900001 && data1 <= 1100000) {
      return 2;
    } else if (data1 >= 1100001 && data1 <= 1200000) {
      return 3;
    } else if (data1 >= 1200001 && data1 <= 1250000) {
      return 4;
    } else if (data1 >= 1250001 && data1 <= 1270000) {
      return 5;
    } else if (data1 >= 1270001 && data1 <= 1280000) {
      return 6;
    } else if (data1 >= 1280001 && data1 <= 1285000) {
      return 7;
    } else {
      // Add a default value or handle other cases as needed
      return null;
    }
  };

  const redirectToBuyAvatars = () => {
    navigate("/dashboard/tt-avatars")
  }

  return (
    <>
      <div className="card-section">
        <div className="row justify-content-center">
          <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
            <div className="card-evc ">
              <div className="evc-avatar">
                <img
                  src={card1}
                  alt=""
                  className="img-fluid "
                // style={{ width: "160px", height: "220px" }}
                />
              </div>
              <div className="evc-info  h-100 d-flex flex-column ">
                <a href="#" className="evc-title ">
                  Crypto Newbies
                </a>
                <div className="line mt-2 mb-2 w-100"></div>
                <div className="d-flex flex-row justify-content-between mb-2">
                  <div className="evc-no">APR: Up to 84%</div>
                  <div className="evc-tit lead text-md text-lg text-sm-md">Max Cap 250%</div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="evc-price d-flex align-items-center">
                    <div className="evc-price-title">PRICE:</div>
                    <div className="evc-tit">
                      <img src={busd} alt="" className="img-fluid evc-price-title" />
                      $110
                    </div>
                  </div>
                  <div className="evc-bv d-flex align-items-center">
                    <div className="evc-bv-title">BV:</div>
                    <div className="evc-tit">
                      <img src={busd} alt="" className="img-fluid evc-price-title" />
                      $110
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 border-g">
                  <button className="btn btn-dark-bg-custom evc-title p-2 overflow-hidden" type="button">APPROVE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center" style={{ marginLeft: "10px", width: "100%" }}>
        {
          walletOwner?.map((data1, index) => (
            <div className="col-sm-6 col-xl-3 col-xxl-3 mt-3 col-sm-12 mb-5" key={index}>
              <div className="card-evc h-100 d-flex flex-column">
                <div className="evc-avatar">
                  <img
                    src={getImgAsset(data1)}
                    alt=""
                    className="img-fluid w-100"
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="evc-info p-1 pb-0 h-100 d-flex flex-column justify-content-between">
                  <div className="d-flex gap-2 flex-wrap justify-content-between mb-2">
                    <a href="#" className="evc-title">
                      <h6 style={{ textAlign: "center" }}>
                        {""}
                        {(data1 >= 1 && data1 <= 600000) ? "Crypto Newbies" :
                          (data1 >= 600001 && data1 <= 900000) ? "Crypto Enthusiast" :
                            (data1 >= 900001 && data1 <= 1100000) ? "Crypto Entrepreneur" :
                              (data1 >= 1100001 && data1 <= 1200000) ? "Crypto Investor" :
                                (data1 >= 1200001 && data1 <= 1250000) ? "Crypto King" :
                                  (data1 >= 1250001 && data1 <= 1270000) ? "Blockchain Mogul" :
                                    (data1 >= 1270001 && data1 <= 1280000) ? "Bitcoin Billionaire" :
                                      (data1 >= 1280001 && data1 <= 1285000) ? "CryptoCap Tycoon" :
                                        null}
                      </h6>
                    </a>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="evc-price d-flex ">
                      <div className="evc-price-title" style={{ fontSize: "11px", }}>PRICE</div>
                      <div style={{ fontSize: "12px" }}>
                        <img src={busd} alt="" className="img-fluid" style={{ height: 14, width: 20 }} />
                        {evc_avatars[`${getPricenVolume(data1)}`].price}
                      </div>
                    </div>
                    <div className="evc-bv d-flex">
                      <div className="evc-bv-title" style={{ fontSize: "11px", }}>BV</div>
                      <div style={{ fontSize: "12px" }}>
                        <img src={busd} alt="" className="img-fluid" style={{ height: 14, width: 20 }} />
                        {evc_avatars[`${getPricenVolume(data1)}`].bv}
                      </div>
                    </div>
                  </div>

                  {isApproved === true ? (

                    <Button
                      style={{
                        background: "transparent",
                        border: "1px solid",
                        borderRadius: "8px",
                        backgroundColor: "rgba(29, 42, 42, 1)",
                        borderColor: "#25a98e",
                        borderImageSlice: 1,
                        color: "#25a98e",
                        height: "30px"
                      }}
                      onClick={() => setStakeNFT(data1)}
                      variant="contained"
                    >
                      Stake
                    </Button>
                  ) : (

                    <Button
                      onClick={() => getApproved()}
                      variant="contained"
                      style={{
                        background: "transparent",
                        border: "1px solid",
                        borderRadius: "8px",
                        backgroundColor: "rgba(29, 42, 42, 1)",
                        borderColor: "#25a98e",
                        borderImageSlice: 1,
                        color: "#25a98e"
                      }}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>

  );
}

export default StakeComp;


// onClick={() => getApproved()}