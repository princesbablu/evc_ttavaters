import React, { useState, useEffect, useRef } from "react";
import * as CanvasJS from "@canvasjs/charts";
import "bootstrap-icons/font/bootstrap-icons.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import settings from "../../assets/img/dashboard/img/setting.png";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faCircleDollarToSlot,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import {
  allowanceEvcTokentoEvcRouter,
  allowanceBusdtoEvcRouter,
  setEVCTokenApproveEvcRouter,
  getValueOutEvcToBusd,
  getValueOutBusdToEvc,
  setSwapTokensForStable,
  setBUSDApproveRouter,
  setSwapStableForTokens,
  estimateGasFeeForSwap,
  estimateGasFeeForSwapBUSDToEVC,
} from "../../ContractAction/EVCRouterContractAction";
import { getEVCBalance } from "../../ContractAction/EVCStakeContractAction";
import { getBUSDBalance, getNetworkExplorerUrl } from "../../ContractAction/BUSDContractAction";
import { getSwapTradeHistory } from "../../ContractAction/EVCNFTContractAction";
import { ReactComponent as Icon1 } from "../../assets/img/dashboard/icons/tokend-icon-1.svg";
// import { makeStyles } from '@mui/styles';

//table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
//assets
import dropdown from "../../assets/img/dashboard/icons/dropdown.png";
import sprint from "../../assets/img/dashboard/icons/sprint.png";
import ethicon from "../../assets/img/icons/ethicon.svg";
import swapicon from "../../assets/img/dashboard/img/swipicon.png";
import busd from "../../assets/img/dashboard/icons/tticon.svg";
import Setting from "./Setting";
import { BaseExplorerUrl } from "../../ContractAction/ContractDependency";
import { useTranslation } from "react-i18next";
import SwipIcon from "../../assets/img/dashboard/img/swapicon.png"
import Sponsor2 from "../../assets/img/dashboard/img/Sponsor2.svg"

const styles = {
  graphChart: {
    backgroundColor: "#151515",
    marginBottom: "40px",
    border: "1px solid #112a21",
    borderRadius: "10px",
  },

  treadHistoryTable: {
    backgroundColor: "#111111",
    border: "1px solid #112a21",
    borderRadius: "10px",
    overflowY: "scroll",
    height: "331px",
  },
  swapSidebar: {
    position: "fixed",
    top: "72px",
    left: 0,
    height: "calc(100vh - 72px)",
    overflowY: "auto",
    width: "248px",
    backgroundColor: "#12121A",
    zIndex: 99,
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    overflow: "-moz-scrollbars-none",
    "&::-webkit-scrollbar": {
      width: "0 !important",
    },
    "@media screen and (max-width: 991px)": {
      transform: "translateX(-248px)",
      transition: "all .25s linear",
    },
  },
  /* Add more styles here */
};

const Swapping = ({ title }) => {
  const settingRef = useRef(null);

  const [isDetailsVisible, setDetailsVisible] = useState(true);
  const [isMaxReturnActive, setMaxReturnActive] = useState(true);
  const [isLowGasActive, setLowGasActive] = useState(false);
  const [isCryptoActive, setCryptoActive] = useState(true);
  const [isFiatActive, setFiatActive] = useState(false);
  const [activeTime, setActiveTime] = useState("24H");
  const [evcValue, setEvcValue] = useState(null);
  const [usdtValue, setUsdtValue] = useState(null);
  const [gasFee, setGasFee] = useState(0);
  const [allowanceEvcTokentoRouter, setAllowanceEvcTokentoRouter] = useState();
  const [allowanceBusdtoRouter, setAllowanceBusdtoRouter] = useState();
  const [isRefreshClicked, setRefreshClicked] = useState(false);
  const [evcBalance, setEvcBalance] = useState(0);
  const [usdtBalance, setUSDCBalance] = useState(0);
  const [isUSDCAbove, setIsUSDCAbove] = useState(false);
  const [swapData, setSwapData] = useState([]);

  console.log("usdtValue evcValue", usdtValue, evcValue);

  const handleSwapEVCForUSDT = async () => {
    {
      let txHash;
      if (!isUSDCAbove) {
        if (evcValue > allowanceEvcTokentoRouter) {
          txHash = await setEVCTokenApproveEvcRouter(evcValue);
        } else {
          txHash = await setSwapTokensForStable(evcValue);
        }
      } else {
        // If "USDC" is above
        if (usdtValue > allowanceBusdtoRouter) {
          txHash = await setBUSDApproveRouter(usdtValue);
        } else {
          txHash = await setSwapStableForTokens(usdtValue); // Use setSwapStableForTokens
        }
      }

      if (txHash != undefined) {
        handleTxhashShow(txHash);
      }
    }
  };

  const handleTxhashShow = async (e) => {
    toast.success(
      <div>
        Transaction Receipt: <br />
        <a
          href={`${BaseExplorerUrl}tx//${e}`}
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

  const useStyles = makeStyles({
    tableRow: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#272729",
      },
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    },
  });

  const toggleDetails = () => {
    setDetailsVisible(!isDetailsVisible);
  };

  const handleMaxReturnClick = () => {
    setMaxReturnActive(true);
    setLowGasActive(false);
  };

  const handleLowGasClick = () => {
    setMaxReturnActive(false);
    setLowGasActive(true);
  };

  const handleCryptoClick = () => {
    setCryptoActive(true);
    setFiatActive(false);
  };

  const handleFiatClick = () => {
    setCryptoActive(false);
    setFiatActive(true);
  };

  const handleTimeClick = (time) => {
    setActiveTime(time);
  };

  const isSwapEnabled = () => {
    return (isUSDCAbove ? usdtValue : evcValue) > 0;
  };

  const refreshUsdtValue = async () => {
    updateUsdtValue(); // Call the existing function to update USDC
  };

  const refreshEvcValue = async () => {
    updateEvcValue(); // Call the existing function to update USDC
  };

  // Attach the refreshUsdtValue function to the "faRepeat" icon
  const handleRefreshClick = () => {
    setRefreshClicked(true);
    if (!isUSDCAbove) {
      refreshUsdtValue(); // Trigger USDC value update
    } else {
      refreshEvcValue();
    }
  };

  const handleEvcBalanceClick = () => {
    setEvcValue(Number(evcBalance).toFixed(6));
    // alert(evcValue)
  };

  const handleBusdBalanceClick = () => {
    setUsdtValue(Number(usdtBalance).toFixed(6));
  };

  const handleArrowClick = () => {
    setIsUSDCAbove(!isUSDCAbove);
  };

  const combinedFunction = () => {
    handleArrowClick(); // Call handleArrowClick
    // Introduce a 10 millisecond delay before calling handleRefreshClick
    setTimeout(() => {
      handleRefreshClick();
    }, 10);
  };

  const updateEvcValue = async () => {
    try {
      // Parse the input value to a float
      const valueInUsdt = parseFloat(usdtValue);
      if (!isNaN(valueInUsdt)) {
        // Call the function to get the EVC value
        const evcAmount = await getValueOutBusdToEvc(valueInUsdt);
        if (evcAmount > 0) {
          // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          const evcValue = parseFloat(evcAmount).toFixed(6);
          setEvcValue(evcValue);
        } else {
          setEvcValue("0"); // Set to empty if the result is negative
        }
      } else {
        setEvcValue(""); // Set to empty if usdtValue is empty or not a number
      }
    } catch (error) {
      console.error("Error updating EVC value:", error);
    }
  };

  const updateUsdtValue = async () => {
    try {
      // Parse the input value to a float
      const valueInEvc = parseFloat(evcValue);
      if (!isNaN(valueInEvc)) {
        // Call the function to get the USDC value
        const usdtamount = await getValueOutEvcToBusd(valueInEvc);
        if (usdtamount > 0) {
          // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          const usdtAmount = parseFloat(usdtamount).toFixed(6);
          setUsdtValue(usdtAmount);
        } else {
          setUsdtValue("0"); // Set to empty if the result is negative
        }
      } else {
        setUsdtValue(""); // Set to empty if evcValue is empty or not a number
      }
    } catch (error) {
      console.error("Error updating USDC value:", error);
    }
  };

  const updateGasForSwapEVCToBUSD = async () => {
    try {
      // Parse the input value to a float
      const valueInEvc = parseFloat(evcValue);
      if (!isNaN(valueInEvc)) {
        // Call the function to get the USDC value
        const gasamount = await estimateGasFeeForSwap(valueInEvc);
        if (gasamount > 0) {
          // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          const gasAmount = parseFloat(gasamount).toFixed(6);
          setGasFee(gasAmount);
        } else {
          setGasFee("0"); // Set to empty if the result is negative
        }
      } else {
        setGasFee(""); // Set to empty if evcValue is empty or not a number
      }
    } catch (error) {
      console.error("Error updating Gas value for Swap EVC-BUSD:", error);
    }
  };

  const updateGasForSwapBUSDToEVC = async () => {
    try {
      // Parse the input value to a float
      const valueInBusd = parseFloat(usdtValue);
      if (!isNaN(valueInBusd)) {
        // Call the function to get the USDC value
        const gasamount = await estimateGasFeeForSwapBUSDToEVC(valueInBusd);
        if (gasamount > 0) {
          // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          const gasAmount = parseFloat(gasamount).toFixed(6);
          setGasFee(gasAmount);
        } else {
          setGasFee("0"); // Set to empty if the result is negative
        }
      } else {
        setGasFee(""); // Set to empty if evcValue is empty or not a number
      }
    } catch (error) {
      console.error("Error updating Gas value for Swap BUSD-EVC:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allowanceEvcTokenRouter = await allowanceEvcTokentoEvcRouter();
      setAllowanceEvcTokentoRouter(allowanceEvcTokenRouter);
      const allowanceBusdRouter = await allowanceBusdtoEvcRouter();
      setAllowanceBusdtoRouter(allowanceBusdRouter);

      const evcBalanceInfo = await getEVCBalance();
      const evcBalanceVal = evcBalanceInfo != undefined ? evcBalanceInfo : 0;
      console.log("evcBalanceVal", evcBalanceVal);
      setEvcBalance(evcBalanceVal);

      const usdtBalanceInfo = await getBUSDBalance();
      setUSDCBalance(usdtBalanceInfo);

      if (!isUSDCAbove) {
        updateUsdtValue();
        updateGasForSwapEVCToBUSD();
      } else {
        updateGasForSwapBUSDToEVC();
      }

      if (isUSDCAbove) {
        updateEvcValue();
      }
    };

    fetchData();
  }, [isUSDCAbove, evcValue, usdtValue]);

  useEffect(() => {
    const getSwapTradeHistoryData = async () => {
      try {
        const data = await getSwapTradeHistory(); // Fetch swap trade history data using the provided function
        console.log("getSwapTradeHistoryData:", data);
        setSwapData(data);
      } catch (error) {
        console.error("getSwapTradeHistoryDataERROR:", error);
      }
    };

    getSwapTradeHistoryData();
  }, []);

  useEffect(() => {
    document.title = title ? title : "TT Avatars | Swap";

    document.querySelector(".page-title").innerText = "Swap";
  }, []);

  //table

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isOpen3, setIsOpen3] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { t } = useTranslation();

  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingRef.current && !settingRef.current.contains(event.target)) {
        setIsOpen3(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingRef]);

  return (
    <div style={{ background: "#201f24", height: "100vh" }}>
      {/* dev: Token Details */}
      <ToastContainer />
      <div className="dashboard-wrap" style={{ backgroundColor: "#201F24" }}>
        <div className="dash-content-area mt-1" style={{ backgroundColor: "#201f24" }}>
          <div className="swap-section">
            <div className="row justify-content-center ">
              <div className=" col-12 col-lg-6 col-md-12 mb-4 d-flex justify-content-center ">
                <div className="swap-sidebar">
                  <div className="d-flex align-items-center justify-content-between mb-3 mb-md-4">
                    <span className="text-light swap-heading">{t("Swap")}</span>
                    <div onClick={() => toggleDropdown3()} className="swap-setting d-flex align-items-center justify-content-center">
                      <img src={settings} alt="" />
                    </div>
                  </div>
                  <div className="enpFfZ">
                    {isOpen3 && <Setting />}
                    <div className="highlight iUsjHb hhoFBL1  morphism">
                      <div className="d-flex align-items-center justify-content-between top-text">
                        <div className="dollarValue">{t("You Pay")}</div>
                        <button
                          className="max-parent max-parent-swap my-0 btn"
                          onClick={() => handleEvcBalanceClick()}
                        >
                          <p className="max my-0  dollarValue">{t("Max")}</p>
                        </button>
                      </div>
                      <div className="d-flex align-item-center justify-content-between select-item">
                        <div className="d-flex justify-content-center align-items-center" >
                          {/* <input
                            type="text"
                            className="currency-input-new"
                            placeholder="0"
                            id="amountA"
                            value={isNaN(evcValue) ? null : evcValue}
                            onChange={(e) =>
                              setEvcValue(parseFloat(e.target.value))
                            }
                          /> */}
                          <button className="d-flex align-items-center gap-2 form-select justify-content-center">
                            <img src={SwipIcon} alt="" />TRND
                            <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_3388_7904)">
                                <path d="M3.28906 5.14343L9.28906 11.1434L15.2891 5.14343" stroke="#92929A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3388_7904">
                                  <rect width="16" height="16" fill="white" transform="translate(0.289062 0.210083)" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>
                        <div className="mony-value">
                          <span>1.0000</span>
                          <p className="p-0 mb-0">1.0000</p>
                        </div>
                        {/* <div>
                          <button
                            className="ws"
                            type="button"
                          //  style={buttonStyle}
                          >
                            <>
                              <Icon1
                                style={{ height: "24px", maxWidth: "22px" }}
                              />
                              <span className="text-light ms-2 dollarValue">
                                {t("TRND")}
                              </span>
                            </>
                          </button>
                        </div> */}
                      </div>
                    </div>

                    {/* Swapp Section */}
                    <div className="text-center mt-3 mb-3 d-flex justify-content-center ">
                      <button className="swip-btn d-flex align-items-center justify-content-center">
                        <img
                          src={swapicon}
                          alt=""
                        //  onClick={props.handelAmountInput}
                        />
                      </button>
                    </div>

                    {/* USDC Section */}
                    <div className=" hhoFBL1 highlight iUsjHb  morphism ">
                      <div className="d-flex align-items-center justify-content-between top-text">
                        <div className="dollarValue">{t("You Received")}</div>
                        <button
                          className="max-parent max-parent-swap my-0 btn"
                          onClick={() => handleEvcBalanceClick()}
                        >
                          <p className="max my-0  dollarValue">{t("Max")}</p>
                        </button>
                      </div>
                      <div className="d-flex align-item-center justify-content-between select-item">
                        <div className="d-flex justify-content-center align-items-center" >
                          {/* <input
                            type="text"
                            className="currency-input-new"
                            placeholder="0"
                            id="amountA"
                            value={isNaN(evcValue) ? null : evcValue}
                            onChange={(e) =>
                              setEvcValue(parseFloat(e.target.value))
                            }
                          /> */}
                            <button className="d-flex align-items-center gap-2 form-select justify-content-center">
                            <img src={Sponsor2} alt="" />USDC
                            <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_3388_7904)">
                                <path d="M3.28906 5.14343L9.28906 11.1434L15.2891 5.14343" stroke="#92929A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3388_7904">
                                  <rect width="16" height="16" fill="white" transform="translate(0.289062 0.210083)" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>
                        <div className="mony-value">
                          <span>1.0000</span>
                          <p className="p-0 mb-0">1.0000</p>
                        </div>
                        {/* <div>
                          <button
                            className="ws"
                            type="button"
                          //  style={buttonStyle}
                          >
                            <>
                              <Icon1
                                style={{ height: "24px", maxWidth: "22px" }}
                              />
                              <span className="text-light ms-2 dollarValue">
                                {t("TRND")}
                              </span>
                            </>
                          </button>
                        </div> */}
                      </div>

                      {/* <div className="d-flex align-item-center justify-content-between">
                        <div style={{ width: "65%" }}>
                          <input
                            type="text"
                            className="currency-input-new"
                            placeholder="0"
                            id="amountB"
                            value={isNaN(usdtValue) ? null : usdtValue}
                            onChange={(e) =>
                              setUsdtValue(parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                            
                        </div>
                      </div> */}
                    </div>
                    <button className="btn btnb w-100 mt-4 pt-md-2">Connect Wallet</button>
                  </div>

                  <button
                    type="button"
                    hidden
                    className=" dollarValue btn btn-primary-bg-primary text-center  mt-3 "
                    disabled={evcValue == null || isNaN(evcValue) ? true : false}
                    style={{
                      padding: "7px",
                      width: "100%",
                      background: "linear-gradient(to right ,#02DB5B,#4977C1)",
                      color: "white",

                      fontWeight: 300,
                    }}
                    onClick={() => {
                      handleSwapEVCForUSDT();
                    }}
                  >
                    {/* {isUSDCAbove ? (usdtValue > allowanceBusdtoRouter ? "Approve" : "Swap") : (evcValue > allowanceEvcTokentoRouter ? "Approve" : "Swap")} */}
                    {isUSDCAbove
                      ? t(usdtValue > allowanceBusdtoRouter ? "Approve" : "Swap")
                      : evcValue > allowanceEvcTokentoRouter
                        ? t("Approve")
                        : t("Swap")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Trade history table */}
          <div className="table-area">
            <div className="row justify-content-center">
              <div className="col-12">
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow
                      >
                        <TableCell >
                          {t("Date")}
                        </TableCell>
                        <TableCell >
                          {t("Type")}
                        </TableCell>
                        <TableCell >
                          {t("Seller")}
                        </TableCell>
                        <TableCell >
                          {t("Price")}
                        </TableCell>
                        <TableCell >
                          {t("Amount TRND")}
                        </TableCell>
                        <TableCell >
                          {t("Amount USDC")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {swapData
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => (
                          <TableRow
                            key={index}
                            className={classes.tableRow}

                          >
                            <TableCell >
                              {new Date(item.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell >
                              {item.type}
                            </TableCell>
                            <TableCell>
                              <a
                                href="#"
                                className="text-decoration-none"
                                style={{ color: "white" }}
                                onClick={() => getNetworkExplorerUrl(item.maker)}
                              >
                                {item.maker.slice(0, 8)}...{item.maker.slice(-6)}
                              </a>
                            </TableCell>
                            <TableCell >
                              {item.from}
                            </TableCell>
                            <TableCell >
                              {item.to}
                            </TableCell>
                            <TableCell >
                              {item.price}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <div className="parpage mt-3">
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={swapData?.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>
                </TableContainer>
              </div>
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Swapping;
