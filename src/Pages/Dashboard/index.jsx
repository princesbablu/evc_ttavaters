import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import profilePic from "../../assets/img/dashboard/img/avatar-1.png";
import busd from "../../assets/img/dashboard/icons/tticon.svg";
import dashCardIcon1 from "../../assets/img/dashboard/icons/dash-card-icon-1.svg";
import dashCardIcon2 from "../../assets/img/dashboard/icons/dash-card-icon-2.svg";
import dashIcon1 from "../../assets/img/dashboard/icons/dash-icon-1.svg";
import dashIcon2 from "../../assets/img/dashboard/icons/dash-icon-2.svg";
import dashIcon3 from "../../assets/img/dashboard/icons/dash-icon-3.svg";
import dashIcon4 from "../../assets/img/dashboard/icons/dash-icon-4.svg";
import DashChart from "./Charts/OverviewChart";
import clock from "../../assets/img/icons/clock.svg";
import {
  getWalletOfOwner,
  getHasToken,
  getRecentlyJoined,
  getRBEarning,
  getUniLevelEarning,
  getEvcRank,
  getTotalPaidUniLevelRewards,
  checkReferrer,
  getUserPendingRewards,
} from "../../ContractAction/EVCNFTContractAction";
import {
  getEVCBalance,
  getTotalEvcCirculatingSupply,
} from "../../ContractAction/EVCStakeContractAction";
import { getNetworkExplorerUrl } from "../../ContractAction/BUSDContractAction";
import { getamountsoutEVCToBUSD } from "../../ContractAction/EVCNFTStakeContractAction";
import { getValueOutEvcToBusd } from "../../ContractAction/EVCRouterContractAction";
import { getUserBlankNFT } from "../../ContractAction/EVCBlankNFTContractAction";
import { getActiveBlankNFT } from "../../ContractAction/EVCBlankNFTContractAction";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Loader from "../../Components/Global/Loader";
import { ReactComponent as Icon1 } from "../../assets/img/dashboard/icons/tokend-icon-1.svg";

import level1 from "./Mint/Images/level1.svg";
import level2 from "./Mint/Images/level2.svg";
import level3 from "./Mint/Images/level3.svg";
import level4 from "./Mint/Images/level4.svg";
import level5 from "./Mint/Images/level5.svg";
import level6 from "./Mint/Images/level6.svg";
import level7 from "./Mint/Images/level7.svg";
import level8 from "./Mint/Images/level8.svg";
import blankImg from "./Mint/Images/blankImg.png";

import blankLevel1 from "./Mint/Images/BlankLevel/1.svg";
import blankLevel2 from "./Mint/Images/BlankLevel/2.svg";
import blankLevel3 from "./Mint/Images/BlankLevel/3.svg";
import blankLevel4 from "./Mint/Images/BlankLevel/4.svg";
import blankLevel5 from "./Mint/Images/BlankLevel/5.svg";
import blankLevel6 from "./Mint/Images/BlankLevel/6.svg";
import blankLevel7 from "./Mint/Images/BlankLevel/7.svg";
import blankLevel8 from "./Mint/Images/BlankLevel/8.svg";
import { useTranslation } from "react-i18next";
const blankLevelImages = {
  1: blankLevel1,
  2: blankLevel2,
  3: blankLevel3,
  4: blankLevel4,
  5: blankLevel5,
  6: blankLevel6,
  7: blankLevel7,
  8: blankLevel8,
};
const blankLevelImagesTitle = {
  1: "Crypto Newbies",
  2: "Crypto Enthusiast",
  3: "Crypto Entrepreneur",
  4: "Crypto Investor",
  5: "Crypto King",
  6: "Blockchain Mogul",
  7: "Bitcoin Billionaire",
  8: "CryptoCap Tycoon",
};

//import blankImg from "./Mint/Images/blankImg.png"
//dev: HighNftToken Array
const HighNftToken = [];
console.log("HighNftToken", HighNftToken);
var lastElement;

const useStyles = makeStyles((theme) => ({
  tableRow: {
    "&:hover": {
      backgroundColor: "#3a3a3a", // Change background color on hover
      borderColor: "#02DB5B", // Change border color on hover
    },
  },
}));

const Dashboard = ({ title }) => {
  const classes = useStyles();

  const elementData = [
    { id: 1, img: level1, title: "Crypto Newbies", price: "110", bv: "100" },
    { id: 2, img: level2, title: "Crypto Enthusiast", price: "550", bv: "500" },
    {
      id: 3,
      img: level3,
      title: "Crypto Entrepreneur",
      price: "1,100",
      bv: "1,000",
    },
    {
      id: 4,
      img: level4,
      title: "Crypto Investor",
      price: "2,750",
      bv: "2,500",
    },
    { id: 5, img: level5, title: "Crypto King", price: "5,500", bv: "5,000" },
    {
      id: 6,
      img: level6,
      title: "Blockchain Mogul",
      price: "11,000",
      bv: "10,000",
    },
    {
      id: 7,
      img: level7,
      title: "Bitcoin Billionaire",
      price: "27,500",
      bv: "25,000",
    },
    {
      id: 8,
      img: level8,
      title: "CryptoCap Tycoon",
      price: "55,000",
      bv: "50,000",
    },
  ];
  const { t } = useTranslation();
  const [NFTData, setNFTData] = useState([]);
  console.log("NFTData", NFTData);

  const matchedElements = elementData.filter((element) =>
    NFTData.includes(element.id)
  );
  console.log("matchedElements", matchedElements);

  useEffect(() => {
    //dev: Get the  NFT Staking Data
    const getNFTStakingData = async () => {
      const WalletOfOwner = await getWalletOfOwner();
      SetWalletOwner(WalletOfOwner);
      const recentlyJoinedInfo = await getRecentlyJoined();
      console.log({ recentlyJoinedInfo });
      setRecentlyJoined(recentlyJoinedInfo);
      const evcRankInfo = await getEvcRank();
      setEvcRank(evcRankInfo);
    };
    getNFTStakingData();

    //dev: Find Highest NFT
    const Token = async () => {
      const hastoken = await getHasToken();
      console.log("hastokenDashboard", hastoken);
      // setHighNft(nft1);
      for (let i = 0; i <= hastoken.length; i++) {
        if (hastoken[i] === true) {
          HighNftToken.push(i + 1);
          console.log("TotalBuyedNftToken", HighNftToken);
        }
      }
      setNFTData(HighNftToken);
    };
    Token();

    document.title = title ? title : "TT Avatars | Dashboard";
    document.querySelector(".page-title").innerText = "DASHBOARD";
  }, []);

  // useEffect(() => {

  //   console.log("UpdatedNFT",UpdatedNFT)

  // }, [highNft])

  const [walletOwner, SetWalletOwner] = useState();
  const maxNft = Math.max(walletOwner);
  console.log("maxNft", maxNft);
  const [recentlyJoined, setRecentlyJoined] = useState([]);
  const [evcRank, setEvcRank] = useState();
  const [evcBalanceValue, setEvcBalanceValue] = useState(0);
  const [evcToBusdMintedValue, setEvcToBusdMintedValue] = useState(0);
  const [totalpaidUniLevelRewards, setTotalpaidUniLevelRewards] = useState(0);
  const [userPendingRewards, setUserPendingRewards] = useState(0);
  const [totalledEVCMinted, setTotalledEVCMinted] = useState(0);
  const [userTotalledEVCMintedInBusd, setUserTotalledEVCMintedInBusd] =
    useState(0);
  const [RBEarningValue, setRBEarningValue] = useState("");
  const [uniLeveEarningValue, setUniLeveEarningValue] = useState(0);
  const [userBlankNFTId, setUserBlankNFTId] = useState("");
  const [overallUserBlankNFT, setOverallUserBlankNFT] = useState("");
  const [nftImage, setNftImage] = useState(null);
  const [blankNFTdatanew, setBlankNFTdatanew] = useState([]);
  console.log("overallUserBlankNFT", overallUserBlankNFT);

  console.log({ recentlyJoined });

  useEffect(() => {
    const getData = async () => {
      const totalpaiduniLevelRewards = await getTotalPaidUniLevelRewards();
      const uniLevelEarningInfo = await getUniLevelEarning();
      const userpendingrewards = await getUserPendingRewards();
      console.log("uniLevelEarningInfo", uniLevelEarningInfo);
      console.log("totalpaiduniLevelRewards", totalpaiduniLevelRewards);
      setUserPendingRewards(userpendingrewards);
      setUniLeveEarningValue(uniLevelEarningInfo);
      setTotalpaidUniLevelRewards(totalpaiduniLevelRewards);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const evcBalanceInfo = await getEVCBalance();
      // const fixStakedInfo = await getUserStakedFix();
      // const flexStakedInfo = await getUserStakedFlex();
      const RBEarningInfo = await getRBEarning();
      const mintedValueEVCtoBusd = await getamountsoutEVCToBUSD(
        evcBalanceInfo.toString()
      );

      const companytotalledEVCMinted = await getTotalEvcCirculatingSupply();
      setEvcBalanceValue(
        evcBalanceInfo.toLocaleString(undefined, { maximumFractionDigits: 4 })
      );
      // setFixStakedDetails(fixStakedInfo);
      // setFlexStakedDetails(flexStakedInfo);
      setRBEarningValue(RBEarningInfo);
      setEvcToBusdMintedValue(
        Number(mintedValueEVCtoBusd).toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })
      );
      setTotalledEVCMinted(companytotalledEVCMinted);
    };
    getData();
  }, []);

  console.log("RBEarningValue", RBEarningValue);
  console.log("uniLeveEarningValue", uniLeveEarningValue);

  useEffect(() => {
    const fetchUserBlankNFT = async () => {
      try {
        const response = await getUserBlankNFT();
        if (response?.status) {
          const { blankTokenId, status } = response.data[0];
          console.log("blankTokenId", blankTokenId, status);
          const userBlanknftId = status ? blankTokenId : 0;
          setUserBlankNFTId(userBlanknftId);
          console.log("response123", response);
          setOverallUserBlankNFT(response.data[0]);
          setNftImage(response?.imageurl);
        }
        console.log("userBlankNFTIdss", userBlankNFTId);
        console.log("OverallUserBlankNFT", overallUserBlankNFT);
      } catch (error) {
        console.error("ErrorfetchinguserblankNFT:", error);
      }
    };
    fetchUserBlankNFT();
  }, []);

  useEffect(() => {
    const fetchActiveBlankNFTnew = async () => {
      try {
        const blankNFTresponse = await getActiveBlankNFT();
        setBlankNFTdatanew(blankNFTresponse);
        console.log("blankNFTresponse", blankNFTresponse);
      } catch (error) {
        console.log("Error fetching user blank NFT:", error);
      }
    };

    fetchActiveBlankNFTnew();
  }, []);

  return (
    <div style={{ background: "#201f24", height: "100%" }}>
      <div className="dashboard-wrap mt-0">
        <div className="dash-content-area pt-3 p-0 mt-1">
          <div className="px-4 px-lg-0 pt-4 pt-lg-0">
            <div className="container-fluid g-0 my-4">
              <div className="row">
                {/* Card 1 */}
                <div className="col-12 col-md-6 col-xl-3 mb-4 mb-xl-0 d-flex">
                  <div className="dashboard-card w-100">
                    <div className="dashboard-card-inner">
                      <div className="icon">
                        <Icon1 />
                      </div>
                      <p className="lalala lead fs-6">
                        {t("Total TRND Supply")}
                      </p>
                      <div className="lalala fs-6">
                        {Number(totalledEVCMinted).toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="col-12 col-md-6 col-xl-3 mb-4 mb-xl-0 d-flex">
                  <div className="dashboard-card w-100">
                    <div className="dashboard-card-inner">
                      <div className="icon">
                        <Icon1 />
                      </div>
                      <p className="lalala lead fs-6">
                        {t("Personal TRND Minted")}
                      </p>
                      <div className="lalala fs-6">
                        {evcBalanceValue} (${evcToBusdMintedValue})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="col-12 col-md-6 col-xl-3 mb-4 mb-xl-0 d-flex">
                  <div className="dashboard-card w-100">
                    <div className="dashboard-card-inner">
                      <div className="icon">
                        <img src={dashIcon3} alt="" className="img-fluid" />
                      </div>
                      <p className="lalala lead fs-6">
                        {t("Maximum Earning Capacity")}
                      </p>
                      <div className="lalala fs-6">
                        <img src={busd} alt="" className="img-fluid me-1" />
                        {userPendingRewards}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="col-12 col-md-6 col-xl-3 mb-4 mb-xl-0 d-flex">
                  <div className="dashboard-card w-100">
                    <div className="dashboard-card-inner">
                      <div className="icon">
                        <img src={dashIcon4} alt="" className="img-fluid" />
                      </div>
                      <p className="lalala lead fs-6">
                        {t("Personal Commission Earned")}
                      </p>
                      <div className="lalala fs-6">
                        <img src={busd} alt="" className="img-fluid me-1" />
                        {Number(RBEarningValue) +
                          Number(uniLeveEarningValue)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              {walletOwner &&
                matchedElements?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="col-sm-6 col-xl-3 col-xxl-3 g-3"
                    >
                      <div
                        className="card-evc d-flex flex-column"
                        style={{ height: "100%", width: "100%" }}
                      >
                        <div className="evc-avatar">
                          <img
                            src={item?.img}
                            alt=""
                            className="img-fluid w-100"
                          />
                        </div>
                        <div className="evc-info p-2 px-0 px-1 pb-0 h-100 d-flex flex-column ">
                          <a
                            href="#"
                            style={{ fontSize: "18px" }}
                            className="evc-title"
                          >
                            {t(item.title)}
                          </a>
                          <div className="d-flex justify-content-between">
                            <div className="evc-price d-flex align-items-center">
                              <div
                                className="evc-price-title"
                                style={{ fontSize: "11px" }}
                              >
                                {t("PRICE")}
                              </div>
                              <div style={{ fontSize: "12px" }}>
                                <img
                                  src={busd}
                                  alt=""
                                  className="img-fluid"
                                  style={{ height: 14, width: 20 }}
                                />
                                {t(item?.price)}
                              </div>
                            </div>
                            <div className="evc-bv d-flex align-items-center">
                              <div
                                className="evc-bv-title"
                                style={{ fontSize: "11px" }}
                              >
                                {t("BV")}
                              </div>
                              <div style={{ fontSize: "12px" }}>
                                <img
                                  src={busd}
                                  alt=""
                                  className="img-fluid"
                                  style={{ height: 14, width: 20 }}
                                />
                                {t(item?.bv)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {blankNFTdatanew?.map((item, index) => (
                <div key={index} className="col-sm-6 col-xl-3 col-xxl-3 g-3">
                  <div
                    className="card-evc d-flex flex-column"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div className="evc-avatar">
                      <img
                        src={blankLevelImages[item?.blankLevel]}
                        alt=""
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="evc-info p-2 px-0 px-1 pb-0 h-100 d-flex flex-column">
                      <a
                        href="#"
                        style={{ fontSize: "18px" }}
                        className="evc-title"
                      >
                        {t(blankLevelImagesTitle[item?.blankLevel])}
                      </a>
                      <div className="d-flex justify-content-between">
                        <div className="evc-price d-flex align-items-center">
                          <div
                            className="evc-price-title"
                            style={{ fontSize: "11px" }}
                          >
                            {t("PRICE")}
                          </div>
                          <div style={{ fontSize: "12px" }}>
                            <img
                              src={busd}
                              alt=""
                              className="img-fluid"
                              style={{ height: 14, width: 20 }}
                            />
                            {Math.round(item?.levelprice * 1.1)}
                          </div>
                        </div>
                        <div className="evc-bv d-flex align-items-center">
                          <div
                            className="evc-bv-title"
                            style={{ fontSize: "11px" }}
                          >
                            {t("BV")}
                          </div>
                          <div style={{ fontSize: "12px" }}>
                            <img
                              src={busd}
                              alt=""
                              className="img-fluid"
                              style={{ height: 14, width: 20 }}
                            />
                            {t(item?.levelprice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              <div className=" table-overlay-shape">
                <div className="w-100 overflow-auto example">
                  <div className="evc-rank table-area">
                    <div
                      className="lalala h4 evc-rank-top w-100"
                      style={{ border: "1px solid #282828", fontSize: "20px" }}
                    >
                      {t("RANK-TT")} {evcRank}
                    </div>
                    <TableContainer
                      component={Paper}
                      style={{ background: "transparent" }}
                    >
                      <Table
                        className="table"
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                      >
                        <TableHead
                          style={{ background: "#2E2E32", borderRadius: "8px" }}
                        >
                          <TableRow
                            style={{
                              background:
                                "linear-gradient(149.3deg, #02DB5B -29.94%, #4977C1 135.03%)",
                            }}
                          >
                            <TableCell
                              className="lalala col"
                              align="center"
                              style={{ color: "white", fontWeight: "400" }}
                            >
                              {t("Joined Since")}
                            </TableCell>
                            <TableCell
                              className="lalala col"
                              align="center"
                              style={{ color: "white", fontWeight: "400" }}
                            >
                              {t("Recently Joined")}
                            </TableCell>
                            <TableCell
                              className="lalala col"
                              align="center"
                              style={{ color: "white", fontWeight: "400" }}
                            >
                              {t("TT Avatar Bought")}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: "#2c2b2f" }}>
                          {recentlyJoined.length > 0 &&
                            recentlyJoined.map((address, i) => (
                              <TableRow
                                key={address.address}
                                className="tableRow"
                                style={{
                                  position: "relative",
                                  zIndex: 100,
                                }}
                              >
                                <TableCell
                                  align="center"
                                  className="d-flex flex-row justify-content-center"
                                >
                                  <img src={clock} alt="clock" />
                                  <div
                                    className="mx-1"
                                    style={{ color: "#9F9F9F" }}
                                  >
                                    {address.joinTime}
                                  </div>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{
                                    color: "#9F9F9F",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    getNetworkExplorerUrl(address.address)
                                  }
                                >
                                  {address.address}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ color: "#9F9F9F" }}
                                >
                                  {address.ttavatarsboughtname}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-lg-12 col-xl-12 col-xxxl-9"> */}

          {/* dev: DashChart  */}
          {/* <div className="mt-5">
              <div className="dash-global-wrap pb-2">
                <DashChart />
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
