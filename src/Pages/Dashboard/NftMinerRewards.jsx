import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ReactSpeedometer from "react-d3-speedometer";
import { ReactComponent as IconEx } from "../../assets/img/dashboard/icons/tokend-icon-ex.svg";
import evcLogo from "../../assets/img/dashboard/icons/busd.svg";
import Trendlogo from "../../assets/img/dashboard/icons/TrendLogo.png"
import { ReactComponent as Icon1 } from "../../assets/img/dashboard/icons/tokend-icon-1.svg";
import EvcChart from "./Charts/EvcChart";
import { getHasToken, getOwnerBalance, getTrendAvatarsCost } from "../../ContractAction/EVCNFTContractAction";
import { getCurrentAPROfNFTLevel, getamountsoutEVCToBUSD } from "../../ContractAction/EVCNFTStakeContractAction";
// import { getamountsoutEVCToBUSD } from "../../ContractAction/EVCFarmingContractAction";
import { getWalletOfOwner } from "../../ContractAction/EVCNFTContractAction";
import { getUnClaimableReward, getTokensOfStaker, getTokenInfos } from "../../ContractAction/EVCNFTStakeContractAction";
import { getValueOutBusdToEvc } from "../../ContractAction/EVCRouterContractAction";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";


const NftMinerRewards = ({ title }) => {
  // dev: get the address for Local Storage
  const newAddress = window.localStorage.getItem("connectedAccount");

  const [NFTBalance, setNFTBalance] = useState(0);
  const [APRValue, setAPRValue] = useState("");
  const [rewardPerSecond, setRewardPerSecond] = useState(0);
  const [dailyRewardInEVC, setDailyRewardInEVC] = useState(0);
  const [weeklyRewardInEVC, setWeeklyRewardInEVC] = useState(0);
  const [monthlyRewardInEVC, setMonthlyRewardInEVC] = useState(0);
  const [yearlyRewardInEVC, setYearlyRewardInEVC] = useState(0);
  const [dailyRewardInBUSD, setDailyRewardInBUSD] = useState(0);
  const [weeklyRewardInBUSD, setWeeklyRewardInBUSD] = useState(0);
  const [monthlyRewardInBUSD, setMonthlyRewardInBUSD] = useState(0);
  const [yearlyRewardInBUSD, setYearlyRewardInBUSD] = useState(0);
  const [totalClaimedRewardValue, setTotalClaimedRewardValue] = useState(0);
  const [unclaimedRewardValue, setUnclaimedRewardValue] = useState(0);

  const [evcAmount, setEvcAmount] = useState();
  const [BusdValue, setBusdValue] = useState();
  const [aprInput, setAprInput] = useState();
  const { t } = useTranslation();


  console.log({ NFTBalance })

  useEffect(() => {
    const getData = async () => {
      const NFTBalanceInfo = await getOwnerBalance();
      console.log({ NFTBalanceInfo })
      setNFTBalance(NFTBalanceInfo);
      const hasTokenArrayList = await getHasToken();
      console.log({ hasTokenArrayList })
      const hasTrendAvatarCost = await getTrendAvatarsCost();
      let APRInfo = 0;
      let hasTokensCounter = 0;
      const levelMappings = [1, 600001, 900001, 1100001, 1200001, 1250001, 1270001, 1280001];
      for (let i = 0; i < hasTokenArrayList.length; i++) {
        if (hasTokenArrayList[i] === true) {
          hasTokensCounter++;
          APRInfo += Number(await getCurrentAPROfNFTLevel(levelMappings[i]) * hasTrendAvatarCost[i] / 100);
        }
      }
      console.log("APRInfo", APRInfo);
      console.log("hasTokensCounter", hasTokensCounter);
      // const aprValue = hasTokensCounter === 0 ? 0 : APRInfo / hasTokensCounter; //before
      const aprValue = hasTokensCounter === 0 ? 0 : APRInfo;  //after
      console.log("aprValue", aprValue);

      setAPRValue(aprValue)
    };
    getData();
  }, []);


  useEffect(() => {
    const calculateReward = async () => {
      try {
        let validAPRValue = APRValue; // Initialize a variable to store the valid APRValue
        if (APRValue === '' || isNaN(APRValue)) {
          // Handle the case where APRValue is empty or not a valid number
          // For example, you can set it to a default value or display an error message.
          validAPRValue = 0; // Setting it to a default value of 0
        }
        const dailAPRValueUSD = (Number(validAPRValue) / 365).toFixed(6);
        console.log("dailAPRValueUSD", dailAPRValueUSD);
        const APRValueBusdToEvc = await getValueOutBusdToEvc(dailAPRValueUSD);
        const rewardPerSecond = Number(APRValueBusdToEvc) / 86400;
        console.log("rewardPerSecond", rewardPerSecond);
        setRewardPerSecond(rewardPerSecond.toLocaleString(undefined, { maximumFractionDigits: 8 }));
        const rewardDaily = rewardPerSecond * 86400;
        setDailyRewardInEVC(rewardDaily.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        const rewardWeekly = rewardDaily * 7;
        setWeeklyRewardInEVC(rewardWeekly.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        const rewardMonthly = rewardDaily * 30;
        setMonthlyRewardInEVC(rewardMonthly.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        const rewardYearly = rewardDaily * 365;
        setYearlyRewardInEVC(rewardYearly.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        if (rewardDaily > 0) {
          let APRValueInBUSD = validAPRValue;
          console.log("APRValueInBUSD", APRValueInBUSD);
          const APRValueInBUSDPerSecond = Number(APRValueInBUSD) / 31536000;
          console.log("APRValueInBUSDPerSecond", APRValueInBUSDPerSecond);
          const rewardDailyBUSDInfo = await ((APRValueInBUSDPerSecond * 86400).toString());
          setDailyRewardInBUSD((Number(rewardDailyBUSDInfo)).toLocaleString(undefined, { maximumFractionDigits: 2 }));
          const weeklyRewardBUSDInfo = await ((APRValueInBUSDPerSecond * 86400 * 7).toString());
          setWeeklyRewardInBUSD((Number(weeklyRewardBUSDInfo)).toLocaleString(undefined, { maximumFractionDigits: 2 }));
          const monthlyRewardBUSDInfo = await ((APRValueInBUSDPerSecond * 86400 * 30).toString());
          setMonthlyRewardInBUSD((Number(monthlyRewardBUSDInfo)).toLocaleString(undefined, { maximumFractionDigits: 2 }));
          const yearlyRewardBUSDInfo = await ((APRValueInBUSDPerSecond * 86400 * 365).toString());
          setYearlyRewardInBUSD((Number(yearlyRewardBUSDInfo)).toLocaleString(undefined, { maximumFractionDigits: 2 }));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    calculateReward();
  }, [APRValue]);


  // NOTE: Change after deploying new contracts
  useEffect(() => {
    const getData = async () => {
      let totalUnclaimedReward = 0;
      const userOwnedIdInfo = await getWalletOfOwner();
      const userStakedIdInfo = await getTokensOfStaker();
      for (let i = 0; i < userStakedIdInfo.length; i++) {
        const unclaimedRewardInfo = await getUnClaimableReward(userStakedIdInfo[i]);
        totalUnclaimedReward += Number(unclaimedRewardInfo);
        setUnclaimedRewardValue(totalUnclaimedReward.toLocaleString(undefined, { maximumFractionDigits: 6 }));
        console.log("unclaimedRewardInfo", unclaimedRewardInfo);
      }
      console.log("userStakedIdInfo", userStakedIdInfo);
      console.log("totalUnclaimedReward", totalUnclaimedReward);

      let totalClaimedReward = 0;
      for (let i = 0; i < userOwnedIdInfo.length; i++) {
        const totalClaimedRewardInfo = await getTokenInfos(userOwnedIdInfo[i]);
        // console.log("totalClaimedRewardInfo", Object.values(totalClaimedRewardInfo));
        totalClaimedReward += Number(totalClaimedRewardInfo[2]) / 10 ** 18;
        setTotalClaimedRewardValue(totalClaimedReward.toLocaleString(undefined, { maximumFractionDigits: 6 }))
        console.log("totalClaimedReward", totalClaimedReward)
      }
    }
    getData();
  }, [])


  const updateEvcValue = async () => {
    try {
      // Parse the input value to a float
      const valueInEvc = parseFloat(BusdValue);
      if (!isNaN(valueInEvc)) {
        // Call the function to get the Evc value
        const usdtamount = await getValueOutBusdToEvc(valueInEvc);
        if (usdtamount > 0) {  // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          let usdtAmount = parseFloat(usdtamount).toFixed(6);
          if (aprInput > 0) {
            usdtAmount = Number(usdtAmount) + Number((usdtAmount * aprInput / 100));
          }
          setEvcAmount(usdtAmount);
        } else {
          setEvcAmount('0');  // Set to empty if the result is negative
        }
      } else {
        setEvcAmount('');  // Set to empty if busdvalue is empty or not a number
      }
    } catch (error) {
      console.error('Error updating USDC value:', error);
    }
  };
  useEffect(() => {
    updateEvcValue();
  }, [BusdValue, aprInput]);


  useEffect(() => {
    document.title = title ? title : "TT Avatars | AVATAR MINTING REWARDS";

    document.querySelector(".page-title").innerText = "AVATAR MINTING REWARDS";
  }, []);

  // console.log("perSecondReward", perSecondReward)
  console.log("APR", typeof dailyRewardInEVC)
  console.log("unclaimedRewardValue", unclaimedRewardValue)
  console.log("totalClaimedRewardValue", totalClaimedRewardValue)

  return (
    <div style={{ background: "#201f24", height: "100vh" }}>
      {/* dev: Token Details */}
      <ToastContainer />
      <div className="dashboard-wrap" >
        <div className="dash-content-area p-0 pt-4 mt-3" >
          {/* <div className="d-flex justify-content-center ms-5">
            <div className="ms-2 mb-2">
              <OverlayTrigger
                placement={`top`}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    Avg. Rewards for Purchased NFTs
                  </Tooltip>
                }
              >
                <div className="d-inline-flex">
                  <IconEx />
                </div>
              </OverlayTrigger>
            </div>
          </div> */}



          <div className="dash-box-wrap">


            {/* <div className="col-xxl-8 col-xxxl-8 "> */}
            <div className="row g-4">
              <div className="col-md-6 col-xxxl-3 m-0">
                <div className="inner-box">
                  <div className="d-flex">
                    <p className="mb-3 avatar-title">{t("Your Avatars")}</p>
                    <div className="ms-auto">
                      <OverlayTrigger
                        placement={`top`}
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            {("NFT Owned by User")}
                          </Tooltip>
                        }
                      >
                        <div className="d-inline-flex">
                          <IconEx />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <div>
                      {/* <img src={evcLogo} alt="" className="img-fluid" /> */}
                    </div>
                    <span className="fw-semibold avatar-number">{NFTBalance} / 8</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xxxl-3 m-0">
                <div className="inner-box">
                  <div className="d-flex">
                    <p className="mb-3 avatar-title">
                      {t("Rewards Per Second")}
                    </p>
                    <div className="ms-auto">
                      <OverlayTrigger
                        placement={`top`}
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            {t("Rewards Per Second")}
                          </Tooltip>
                        }
                      >
                        <div className="d-inline-flex">
                          <IconEx />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <Icon1 height={25} />
                    <span className="fw-semibold avatar-number">{rewardPerSecond}</span>
                  </div>
                </div>
              </div>
              {/* dev: Total Claimed */}
              <div className="col-md-6 col-xxxl-3 m-0">
                <div className="inner-box">
                  <div className="d-flex">
                    <p className="mb-3 avatar-title">{t("Total claimed")}</p>
                    <div className="ms-auto">
                      <OverlayTrigger
                        placement={`top`}
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            {t("Total claimed")}
                          </Tooltip>
                        }
                      >
                        <div className="d-inline-flex">
                          <IconEx />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <Icon1 height={25} />
                    <span className="fw-semibold avatar-number">{totalClaimedRewardValue}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xxxl-3 m-0">
                <div className="inner-box">
                  <div className="d-flex">
                    <p className="mb-3 avatar-title">
                      {t("Total Pending Rewards")}
                    </p>
                    <div className="ms-auto">
                      <OverlayTrigger
                        placement={`top`}
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            {t("Total Pending Rewards")}
                          </Tooltip>
                        }
                      >
                        <div className="d-inline-flex">
                          <IconEx />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <Icon1 height={25} />
                    <span className="fw-semibold avatar-number">{unclaimedRewardValue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* dev: Daily Rewards */}
            <div className="rwowrds-box p-4 mt-4">
              <div className="row g-4">
                <div className="col-md-6 col-xl-3">
                  <div className="d-flex flex-column border-right">
                    <p className="mb-3 avatar-title">{t("Daily Rewards")}</p>
                    <div className="h5 avatar-number">{dailyRewardInEVC}</div>
                    <div className="text-14 avatar-price">{dailyRewardInBUSD}$</div>
                  </div>
                </div>
                {/* dev:Weekly Rewards */}
                <div className="col-md-6 col-xl-3">
                  <div className="d-flex flex-column border-right align-items-center">
                    <div className="rwowrds-boxs">
                    <p className="mb-3 avatar-title">{t("Weekly Rewards")}</p>
                    <div className="h5 avatar-number">{weeklyRewardInEVC}</div>
                    <div className="text-14 avatar-price">{weeklyRewardInBUSD}$</div>
                    </div>
                  </div>
                </div>
                {/* dev: Monthly Rewards */}
                <div className="col-md-6 col-xl-3">
                  <div className="d-flex flex-column border-right align-items-center">
                    <div className="rwowrds-boxs">
                    <p className="mb-3 avatar-title">{t("Monthly Rewards")}</p>
                    <div className="h5 avatar-number">{monthlyRewardInEVC}</div>
                    <div className="text-14 avatar-price">{monthlyRewardInBUSD}$</div>
                    </div>
                  </div>
                </div>
                {/* dev:Yearly Rewards */}
                <div className="col-md-6 col-xl-3">
                  <div className="d-flex flex-column border-right align-items-end border-0">
                    <div className="rwowrds-boxs">
                    <p className="mb-3 avatar-title">{t("Yearly Rewards")}</p>
                    <div className="h5 avatar-number">{yearlyRewardInEVC}</div>
                    <div className="text-14 avatar-price">{yearlyRewardInBUSD}$</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="data-shorting mt-4">
          <div className="row p-4">
            <div className="col-12">
              <TableContainer component={Paper} >
                <Table>
                  <TableHead>
                    <TableRow style={{ background: "#42424A", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
                      <TableCell className="avatar-mint-num" style={{ color: "white" }}>{t("Date")}</TableCell>
                      <TableCell className="avatar-mint-num" style={{ color: "white" }}>{t("Type(Unilevel,RB)")}</TableCell>
                      <TableCell clclassName="avatar-mint-num" style={{ color: "white" }}>{t("To")}</TableCell>
                      <TableCell className="avatar-mint-num" style={{ color: "white" }}>{t("Amount")}</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody style={{backgroundColor:"#2c2b2f"}}>
        {swapData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={index} className={classes.tableRow} style={{backgroundColor:"#272729"}}>
                <TableCell style={{color:"white"}}>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell style={{color:"white"}}>{item.type}</TableCell>
                <TableCell><a href="#" className="text-decoration-none" style={{color:"white"}}>
                          {item.maker.slice(0, 8)}...{item.maker.slice(-6)}
                        </a></TableCell>
                <TableCell style={{color:"white"}}>{item.from}</TableCell>
                <TableCell style={{color:"white"}}>{item.to}</TableCell>
                <TableCell style={{color:"white"}}>{item.price}</TableCell>
              </TableRow>
            ))}
        </TableBody> */}
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  // count={swapData?.length}
                  // rowsPerPage={rowsPerPage}
                  // page={page}
                  // onPageChange={handleChangePage}
                  // onRowsPerPageChange={handleChangeRowsPerPage}
                  className="mt-3 shorting-area"
                  style={{ backgroundColor: "#272729", color: "white" }}
                />
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default NftMinerRewards;
