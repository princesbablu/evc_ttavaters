import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import TokenChart from "./Charts/TokenChart";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
//dev: import Icons
import { ReactComponent as Icon1 } from "../../assets/img/dashboard/icons/tokend-icon-1.svg";
import { ReactComponent as Icon2 } from "../../assets/img/dashboard/icons/tokend-icon-2.svg";
import { ReactComponent as Icon3 } from "../../assets/img/dashboard/icons/tokend-icon-3.svg";
// import { ReactComponent as Icon4 } from "../../assets/img/dashboard/icons/tokend-icon-4.svg";  //before
import { ReactComponent as Sidebar10 } from "../../assets/img/dashboard/icons/sidebar-10.svg";  //after
import { ReactComponent as Icon5 } from "../../assets/img/dashboard/icons/tokend-icon-5.svg";
import { ReactComponent as Icon6 } from "../../assets/img/dashboard/icons/tokend-icon-5.svg";
import Icon7 from "../../assets/img/dashboard/icons/tokend-icon-7.png";
import Icon8 from "../../assets/img/dashboard/icons/tokend-icon-8.png";
import { ReactComponent as IconEx } from "../../assets/img/dashboard/icons/tokend-icon-ex.svg";
import { ReactComponent as IconCopy } from "../../assets/img/dashboard/icons/tokend-icon-copy.svg";
import { getVestingBalanceEVC, getOwnerBalance, getEVCTotalSupply, getTotalEvcCirculatingSupply } from "../../ContractAction/EVCStakeContractAction";
import { getValueOutEvcToBusd } from "../../ContractAction/EVCRouterContractAction";
import { ContractAddressTRNDToken } from "../../ContractAction/ContractDependency";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trendlogo from "../../assets/img/dashboard/icons/TrendLogo.png";
import { useTranslation } from "react-i18next";
import icon1 from "../../assets/img/dashboard/img/tokenicon-1.png"
import icon2 from "../../assets/img/dashboard/img/tokenicon-2.png"
import icon3 from "../../assets/img/dashboard/img/tokenicon-3.png"
import icon4 from "../../assets/img/dashboard/img/tokenicon-4.png"

// dev: Start TokenDetails Page
const TokenDetails = ({ title }) => {
  //dev: Get the address for Local storage
  const totalEVCSUpply = 1000000000;
  const [vestingBalance, setVestingBalance] = useState(0);
  const [ownerBalance, setOwnerBalance] = useState(0);
  // const [totalStaked, setTotalStaked] = useState(0);
  const [farmedValue, setFarmedValue] = useState(0);
  const [EVCTotalSupply, setEVCTotalSupply] = useState();
  const [EVCCirculatingSupply, setEVCCirculatingSupply] = useState();
  const { t } = useTranslation();
  const [EVCPrice, setEVCPrice] = useState();
  console.log("vestingBalance", vestingBalance)

  useEffect(() => {
    const getData = async () => {
      const vestingBalanceInfo = await getVestingBalanceEVC();
      const ownerBalanceINfo = await getOwnerBalance();
      const EVCTotalsupply = await getEVCTotalSupply();
      const EVCCirculatingsupply = await getTotalEvcCirculatingSupply();
      let evcAmount = 1
      const EVCPriceInBusd = await getValueOutEvcToBusd(evcAmount)
      // const stakedInfo = await getTotalStakedEVC();
      setVestingBalance(vestingBalanceInfo); //NOTE: Substract as per bucket value
      setOwnerBalance(ownerBalanceINfo);
      setEVCTotalSupply(EVCTotalsupply)
      setEVCCirculatingSupply(EVCCirculatingsupply)
      setEVCPrice(EVCPriceInBusd)
      // setTotalStaked(stakedInfo);
    }
    getData();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(`${text}`);
    toast.success("Copied!", { autoClose: 1000 });
  };

  useEffect(() => {
    document.title = title ? title : "TT Avatars | Token Details";
    document.querySelector(".page-title").innerText = "Token Details";
  }, []);

  return (
    <div style={{ background: "#201f24", minHeight: "100vh" }}>
      {/* dev: Token Details */}
      <ToastContainer />
      <div className="dashboard-wrap" style={{ backgroundColor: "#201F24", height: "100vh" }}>
        <div className="dash-content-area-shree mt-1" style={{ backgroundColor: "#201f24", height: "100vh" }}>
          <TokenChart />

          <div className="card-bottom-section mt-3 mt-md-4">
            <p className="title mb-3">{t("General Stats")}</p>
            <div className="" style={{ backgroundColor: "transparent" }}>
              <div className="row g-2" >
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0" >
                  <div className="dash-token-card" >
                    <div className="icon-square ">
                      <img src={icon1} alt="" />
                    </div>
                    <div className="card-title">
                      <div className="pre-title">{t("Symbol")}</div>
                      <div className="main-title">{t("$ TRND Token")}</div>
                    </div>
                    <div className="card-tooltip">
                      <OverlayTrigger
                        placement={`top`}
                        overlay={
                          <Tooltip id={`tooltip-top`} style={{ backgroundColor: "#9F9F9F" }}>
                            {t("Trend Token Symbol")}
                          </Tooltip>
                        }
                      >
                        <div>
                          <IconEx />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0">
                  <div className="dash-token-card" >
                    <div className="icon-square icon-md">
                      <img src={icon2} alt="" />
                    </div>
                    <div className="card-title">
                      <div className="pre-title">{t("Total Supply")}</div>
                      <div className="main-title">{Number(EVCTotalSupply).toFixed(4)}</div>
                      {/* <div className="main-title">21,000,000</div> */}
                    </div>
                    <div className="card-tooltip">
                      <OverlayTrigger
                        placement={`top`}
                        overlay={
                          <Tooltip id={`tooltip-top`} style={{ backgroundColor: "#9F9F9F" }}>
                            {t("Total TRND Supply.")}
                          </Tooltip>
                        }
                      >
                        <div>
                          <IconEx />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0">
                  <div className="dash-token-card" >
                    <div className="icon-square icon-md">
                      <img src={icon3} alt="" />
                    </div>
                    <div className="card-title">
                      <div className="pre-title">{t("Circulating Supply")}</div>
                      <div className="main-title">{Number(EVCCirculatingSupply).toFixed(4)}</div>
                      {/* <div className="main-title">21,000,000</div> */}
                    </div>
                    <div className="card-tooltip">
                      <OverlayTrigger
                        placement={`top`}
                        overlay={
                          <Tooltip id={`tooltip-top`} style={{ backgroundColor: "#9F9F9F" }}>
                            {t("Total TRND in Circulation.")}
                          </Tooltip>
                        }
                      >
                        <div>
                          <IconEx />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                  <div className="dash-token-card" >
                    <div className="icon-square icon-md">
                      <img src={icon4} alt="" />
                    </div>
                    <div className="card-title">
                      <div className="pre-title">{t("TRND Price")}</div>
                      <div className="main-title">${Number(EVCPrice).toFixed(6)}</div>
                      {/* <div className="main-title">$0.21</div> */}
                    </div>
                    <div className="card-tooltip">
                      <OverlayTrigger
                        placement={`top`}
                        overlay={
                          <Tooltip id={`tooltip-top`} style={{ backgroundColor: "#9F9F9F" }}>
                            {t("Current Price of TRND in BUSD")}
                          </Tooltip>
                        }
                      >
                        <div>
                          <IconEx />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3 mt-md-4" >
              <div className="col-xl-8 mb-3 mb-xl-0">
                <div className="dash-global-wrap h-100">
                  <div className="card-area">
                    <p className=" mb-3 fw-semibold card-title">
                      {t("TRND Token Contract Address(Base)")}
                    </p>
                    <div className="d-flex gap-3 align-items-center flex-wrap" >
                      {/* NOTE: Leave this Pancake and KuCoin as Commented as DEX may be available in the future */}
                      <div className="d-flex align-items-center copy-area">
                        <div className="overflow-hidden text-nowrap copy-text" >
                          CA: 0x0000000000000000000000000000000000000000
                          {/* NOTE: update the address with latest one */}
                        </div>
                        <div className="icon-square icon-sm ms-auto cursor-pointer ">
                          <OverlayTrigger
                            placement={`top`}
                            overlay={<Tooltip id={`tooltip-top`}>{t("Copy")}</Tooltip>}
                          >
                            <div className="copy-btn d-flex align-items-center justify-content-center" >
                              <IconCopy onClick={() => handleCopy(`${ContractAddressTRNDToken}`)} />
                            </div>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4" >
                <div className="dash-global-wrap">
                  <div className="card-area">
                    <p className=" mb-3 fw-semibold card-title">{t("Taxation")}</p>
                    <div className="d-grid gap-2 btns">
                      <button className="btnitem btn1 mb-2 mb-1">3% Buy</button>
                      <button className="btnitem btn2" >3% Sell</button>
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

export default TokenDetails;