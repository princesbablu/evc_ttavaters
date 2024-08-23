import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { allowanceBUSD, setBUSD_NFTStakeApprove } from "../../../ContractAction/BUSDContractAction";
import { setRepurchaseNFT, getCheckRepurchase } from "../../../ContractAction/EVCNFTStakeContractAction";
import { Box, Card } from "@chakra-ui/react";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import StakeNft from "./StakeNft";
import { getWalletOfOwner } from "../../../ContractAction/EVCNFTContractAction";
import { getTokensOfStaker, setClaimReward, getUnClaimableReward, getCurrentAPROfNFTLevel, getNextClaimingTime, getRewardPercentage } from "../../../ContractAction/EVCNFTStakeContractAction";
import { setWithdrawNFT } from "../../../ContractAction/EVCNFTStakeContractAction";
import { getIsApprovedForAll } from "../../../ContractAction/EVCNFTContractAction";
import { ContractAddressTTAVATARSSTAKE } from "../../../ContractAction/ContractDependency";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import card1 from "../../../assets/img/dashboard/img/cardimgavtoe.png"



function Repurchase() {
  const navigate = useNavigate()
  const [walletOwner, SetWalletOwner] = useState();
  const [rewardObj, setRewardObj] = useState({});
  const [rewardPercentageObj, setRewardPercentageObj] = useState({});
  const [claimTimeObj, setClaimTimeObj] = useState({});
  const [checkRepurchaseForId, setCheckRepurchaseForId] = useState({});
  const [BusdAllowanceNftStake, setBusdAllowanceNftStake] = useState();
  const [stakeOfOwnerNFTIDs, setStakeOfOwnerNFTIDs] = useState([]);
  const imgUrl = "https://ipfs.io/ipfs/QmcMJqnnQeZeNnnnDh4Dar2HuxrnibFzLxjG9BanHPcGq4/";
  const [isApproved, setApproved] = useState();
  console.log("isApproved", isApproved);
  const [apy, setApy] = useState({});

  console.log("stakeOfOwnerNFTIDs_Repurchase", stakeOfOwnerNFTIDs)

  const redirectToBuyAvatars = () => {
    navigate("/dashboard/tt-avatars")
  }


  useEffect(() => {
    //dev: Get the  NFT Staking Data
    const getNFTStakingData = async () => {
      const WalletOfOwner = await getWalletOfOwner();
      const StakeOfOwnerNFTIDs = await getTokensOfStaker();
      const approved = await getIsApprovedForAll();
      const allowanceBusdToNftstake = await allowanceBUSD(ContractAddressTTAVATARSSTAKE);
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
          const rewardPercentage = await getRewardPercentage(stakeOfOwnerNFTIDs[i]);
          const timeInfo = await getNextClaimingTime(stakeOfOwnerNFTIDs[i]);
          const checkRepurchaseForIdBool = await getCheckRepurchase(stakeOfOwnerNFTIDs[i]);
          const apyInfo = await getCurrentAPROfNFTLevel(stakeOfOwnerNFTIDs[i]);
          setRewardObj((prevRewardObj) => ({
            ...prevRewardObj,
            [stakeOfOwnerNFTIDs[i]]: Number(rewardinfo).toLocaleString(undefined, { maximumFractionDigits: 10 }),
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
    return () => clearInterval(updateLocalValueGetReward)
  }, [stakeOfOwnerNFTIDs]);


  const ClaimRewards = async (data2) => {

    if (claimTimeObj[data2] <= epoch) {
      const response = await setClaimReward(data2)
      console.log("ClaimRewards response", response)
    } else {
      alert("wait till next claimable timing")
    }

  }




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


  console.log("rewardObj", rewardObj)
  console.log("rewardPercentageObj", rewardPercentageObj)
  console.log("claimTimeObj", claimTimeObj)
  console.log("checkRepurchaseForId", checkRepurchaseForId)


  const getImgUrlId = (data2) => {

    console.log("data2", data2)

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


  return (


    <>
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
      <div className="row" style={{ marginLeft: "10px", width: "100%" }}>
        {checkRepurchaseForId == false ?
          <div class="card mt-5" style={{ width: "50%", height: "90px", }}>
            <div class="card-body d-flex ">
              <p className="card-text me-5">For Staking Need to buy avatars</p>
              <button onClick={() => redirectToBuyAvatars()} style={{ background: "linear-gradient(149.3deg, #02DB5B -29.94%, #4977C1 135.03%", color: "white" }} className="btn btn-primary-bg-custom mb-5 p-2">Buy Avatars</button>
            </div>
          </div>
          :
          stakeOfOwnerNFTIDs.map((data2, index) => (
            <div className="col-sm-6 col-xl-3 col-xxl-3 mt-3 col-sm-12" key={index}>
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
                      src={`${imgUrl}${getImgUrlId(data2)}.png`}
                      alt=""
                      className="img-fluid"
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "10px",
                        marginBottom: "5%"
                      }}
                    />
                    <br></br>
                    {/* <span >
                        APR :{" "}
                        <span>
                          {apy[data2]}
                          %{" "}
                        </span>
                      </span> */}
                    {/* <div className="d-flex ">
                        <span> TRND Earned : </span>
                        <span>{rewardObj[data2]} </span>
                      </div> */}
                  </div>

                  {/* <Box sx={{ flexGrow: 1 }}>
  
                      <ProgressBar
                        bgcolor="#64dd17"
                        progress={rewardPercentageObj[data2]}
                        height={20}
                      />
                    </Box> */}
                  <br></br>

                  {checkRepurchaseForId[data2] ?
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
                                    : 0) <= Number(BusdAllowanceNftStake) ?

                      (
                        <div style={{ marginTop: "-15" }}>
                          <button className="btn btn-primary-bg-custom bt-sm w-100" onClick={() => setRepurchaseNFT(data2)} style={{
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
                            marginTop: "-15"
                          }}>Repurchase</button>
                        </div>
                      ) : (
                        <div style={{ marginTop: "-15" }}>
                          <button className="btn btn-primary-bg-custom  btn-sm w-100" onClick={() => setBUSD_NFTStakeApprove()}
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
                          >Approve Repurchase</button>
                        </div>
                      )

                    :
                    null
                  }
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Repurchase