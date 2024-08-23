import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import busd from "../../assets/img/dashboard/icons/tticon.svg";
import level1 from "../Dashboard/Mint/Images/level1.svg";
import level2 from "../Dashboard/Mint/Images/level2.svg";
import level3 from "../Dashboard/Mint/Images/level3.svg";
import level4 from "../Dashboard/Mint/Images/level4.svg";
import level5 from "../Dashboard/Mint/Images/level5.svg";
import level6 from "../Dashboard/Mint/Images/level6.svg";
import level7 from "../Dashboard/Mint/Images/level7.svg";
import level8 from "../Dashboard/Mint/Images/level8.svg";
import { setCheckReferrer, setMintNft } from "../../ContractAction/EVCNFTContractAction";
import { getHasToken } from "../../ContractAction/EVCNFTContractAction";
import { setBUSD_NFTApprove } from "../../ContractAction/BUSDContractAction";
import { abiBUSD } from "../../ContractAction/ABI/BUSD";
import { Height } from "@mui/icons-material";
import { allowanceBUSD } from "../../ContractAction/BUSDContractAction";
import { Button, Modal } from "react-bootstrap";
import { useWeb3Onboard } from "../../config/context";
import { fetchDataContext } from "../../ContractAction/EVCNFTContractAction";
import { ContractAddressUSDC, ContractAddressTTAVATARS, BaseExplorerUrl } from "../../ContractAction/ContractDependency";
import { useTranslation } from "react-i18next";




//dev: TT Avatars
const evc_avatars = [
  {
    thumb: level1,
    title: "Crypto Newbies",
    APRUpto: "APR: Up to 84%",
    evc_no: "#EVC 1",
    price: "$110",
    bv: "$100",
  },
  {
    thumb: level2,
    title: "Crypto Enthusiast",
    APRUpto: "APR: Up to 108%",
    evc_no: "#EVC 2",
    price: "$550",
    bv: "$500",
  },
  {
    thumb: level3,
    title: "Crypto Entrepreneur",
    APRUpto: "APR: Up to 132%",
    evc_no: "#EVC 3",
    price: "$1,100",
    bv: "$1,000",
  },
  {
    thumb: level4,
    title: "Crypto Investor",
    APRUpto: "APR: Up to 156%",
    evc_no: "#EVC 4",
    price: "$2,750",
    bv: "$2,5OO",
  },
  {
    thumb: level5,
    title: "Crypto King",
    APRUpto: "APR: Up to 180%",
    evc_no: "#EVC 5",
    price: "$5,500",
    bv: "$5,000",
  },
  {
    thumb: level6,
    title: "Blockchain Mogul",
    APRUpto: "APR: Up to 204%",
    evc_no: "#EVC 6",
    price: "$11,000",
    bv: "$10,000",
  },
  {
    thumb: level7,
    title: "Bitcoin Billionaire",
    APRUpto: "APR: Up to 228%",
    evc_no: "#EVC 7",
    price: "$27,500",
    bv: "$25,000",
  },
  {
    thumb: level8,
    title: "CryptoCap Tycoon",
    APRUpto: "APR: Up to 252%",
    evc_no: "#EVC 8",
    price: "$55,000",
    bv: "$50,000",
  },
];


const ModalAlert = props => {

  return (

    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "gray" }} id="contained-modal-title-vcenter">
          Connect Wallet{' '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: "gray" }}>Your  sponsor  address  and  connected  address  is  same  please  change  wallet  address</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary-bg-custom" onClick={() => props.onHide(false)}>
          OK
        </button>
        {/* <Button variant="secondary" onClick={()=>props.onClick()} >Connect Wallet</Button> */}
      </Modal.Footer>
    </Modal>
  );
};



const EvcAvatars = ({ title }) => {


  const [mintStatus, setmintStatus] = useState();
  const [approveStatus, setapproveStatus] = useState();
  const [approveBUSDValue, setApproveBUSDValue] = useState();
  const [modalShow, setModalShow] = useState(false);
  const { wallet, connecting, connect, disconnect, provider } = useWeb3Onboard();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      if (wallet && provider) {
        await fetchDataContext(wallet, provider);
        console.log("provider2809", wallet);
      } else {
        fetchDataContext(null);
      }
    };

    fetchData();
  }, [wallet, provider, fetchDataContext]);
  console.log("approveBUSDValue.................", approveBUSDValue);

  const [hasToken, setHasToken] = useState([])
  const userAddress = localStorage.getItem("connectedAccount")

  // dev: Sponsor/Reference Address
  const queryString = window.location.search;
  console.log("queryString ", (queryString).slice(0, 6));
  const parameters = new URLSearchParams(queryString);
  console.log("parameters ", parameters);
  const value = parameters.get("ref");
  console.log("value", value);
  if (queryString.slice(0, 6) === "?ref=$") {
    window.localStorage.setItem("sponsorAddress", value.slice(1));
  }

  console.log("value", value)

  useEffect(() => {

    if (value?.slice(1) == null) {

    } else if (value?.slice(1) == userAddress) {
      setModalShow(true)
    } else {
      // const setRefferalAddress = async()=>{
      //   const requestBody = {
      //     sponsoraddress: value?.slice(1),
      //     myaddress:userAddress
      //   };
      //   const apiResponse = await fetch(`${URLDOMAIN}api/reffral`, {
      //     method: 'POST', border-g
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(requestBody),
      //   });
      //   const responseData = await apiResponse.json();
      //   console.log("Refferal responseData",responseData,"requestBody",requestBody)
      // }
      // setRefferalAddress()
    }

  }, [value])



  useEffect(() => {

    const allowanceBUSD = async () => {
      try {

        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          // Get the selected account
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          const account = accounts[0];
          console.log("account...00", account)
          const contracts = new web3.eth.Contract(abiBUSD, ContractAddressUSDC);
          const response = await contracts.methods.allowance(account, ContractAddressTTAVATARS).call();
          console.log("RespallowanceBUSDBuyAvatarsPage", response)
          // const allowance = (web3.utils.fromWei(response, 'ether'))
          const allowance = Number(response) / 10 ** 6
          console.log("allowanceBUSDBuyAvatarsPage22", allowance);
          setApproveBUSDValue(allowance);

        }
      } catch (error) {
        return error;
      }
    };
    allowanceBUSD()
  }, [])




  const setBUSD_NFTapprove = async () => {
    let txHash = await setBUSD_NFTApprove();
    console.log("evcavatar_txHash", txHash)
    if (txHash.status == true || 1) {
      handleTxhashShow(txHash.transactionHash)
      setapproveStatus(txHash.status)
    } else if (txHash == undefined) {
      toast.error("Apprrove Rejected")
    }
  }

  const setMintnft = async (e) => {
    try {
      console.log("setMintnft");
      const txHash = await setMintNft(e);
      console.log("evcavatar_txHash", txHash);

      if (txHash?.status === true || txHash?.status === 1) {
        handleTxhashShow(txHash.transactionHash);
        setmintStatus(txHash.status);
      } else if (txHash === undefined) {
        toast.error("Transaction Rejected");
      }
    } catch (error) {
      console.error("Error in setMintnft:", error);
      toast.error("An error occurred during the transaction. Please try again.");
    }
  };

  const handleTxhashShow = async (e) => {
    toast.success(
      <div>Transaction Receipt: <br />
        <a href={`${BaseExplorerUrl}tx/${e}`} target="_blank" rel="noopener noreferrer">View on Block Explorer</a>
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


  useEffect(() => {

    //dev: get Data
    const getData = async () => {
      let hasTokenInfo = await getHasToken();
      setHasToken(hasTokenInfo);
    };
    getData();
  }, [mintStatus, approveStatus,hasToken]);

  useEffect(() => {
    document.title = title ? title : "TT Avatars | Buy TT Avatars";
    document.querySelector(".page-title").innerText = "Buy TT Avatars";
  }, []);

  console.log("check", evc_avatars[2].price.slice(1))

  useEffect(() => {
    const checkRef = async () => {
      await setCheckReferrer();
    };
    checkRef();
  }, []);

  return (
    <div style={{ height: "100%", background: "#201f24" }}>
      <div className="dashboard-wrap">
        <ToastContainer />
        <ModalAlert
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <div className="dash-content-area-shree ">
          <div className="row ">
            {/*dev: Level_1 */}
            <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
              <div className="card-evc ">
                <div className="evc-avatar">
                  <img
                    src={evc_avatars[0].thumb}
                    alt=""
                    className="img-fluid "
                  // style={{ width: "160px", height: "220px" }}
                  />
                </div>
                <div className="evc-info  h-100 d-flex flex-column ">
                  <a href="#" className="evc-title ">
                    {t(evc_avatars[0].title)}
                  </a>
                   <div className="line mt-2 mb-2 w-100"></div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div className="evc-no">{t(evc_avatars[0].APRUpto)}</div>
                    <div className="evc-tit lead text-md text-lg text-sm-md">{t("Max Cap 250%")}</div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="evc-price d-flex align-items-center">
                      <div className="evc-price-title">{t("PRICE")}:</div>
                      <div className="evc-tit">
                        <img src={busd} alt="" className="img-fluid evc-price-title"/>
                        {t(evc_avatars[0].price)}
                      </div>
                    </div>
                    <div className="evc-bv d-flex align-items-center">
                      <div className="evc-bv-title">{t("BV")}:</div>
                      <div className="evc-tit">
                        <img src={busd} alt="" className="img-fluid evc-price-title"/>
                        {t(evc_avatars[0].bv)}
                      </div>
                    </div>
                  </div>
                  {hasToken[0] === true ? (
                    //dev: Buy Button
                    <div className="d-grid gap-2 border-g">
                      <button className="btn btn-dark-bg-custom evc-title p-2 overflow-hidden" type="button"
                        disabled>
                        {t("Buy")}
                      </button>
                    </div>
                  ) : Number(approveBUSDValue) < 110 ? (
                    <div className="d-grid gap-2 border-g">
                      {/* dev: Approve Button */}
                      <button
                        className="btn btn-primary-bg-custom evc-title p-2 overflow-hidden"
                        type="button"
                        onClick={() => setBUSD_NFTapprove()}>
                        {t("Approve")}
                      </button>
                    </div>) : (
                    <div className="d-grid gap-2 border-g">
                      <button
                        className="btn btn-primary-bg-custom evc-title p-2 overflow-hidden"
                        type="button"
                        onClick={() => setMintnft(1)}>
                        {t("Buy")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*dev:Level_2 */}
            <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
              <div className="card-evc " >
                <div className="evc-avatar">
                  <img
                    src={evc_avatars[1].thumb}
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <div className="evc-info  h-100 d-flex flex-column ">

                  <a href="#" className="evc-title">
                    {t(evc_avatars[1].title)}
                  </a>
                  <div className="line mt-2 mb-2 w-100"></div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div className="evc-no">{t(evc_avatars[1].APRUpto)}</div>
                    <div className="evc-tit">{t("Max Cap 250%")}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {/* Price section */}
                    <div className="evc-price d-flex align-items-center">
                      <div className="evc-price-title" >{t("PRICE")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid" />
                        {t(evc_avatars[1].price)}
                      </div>
                    </div>
                    {/* BV section */}
                    <div className="evc-bv d-flex align-items-center">
                      <div className="evc-bv-title">{("BV")}</div>
                      <div className="evc-tit">
                        <img src={busd} alt="" className="img-fluid"/>
                        {t(evc_avatars[1].bv)}
                      </div>
                    </div>
                  </div>
                  {hasToken[1] === true ? (
                    <div className="d-grid  border-g">
                      {/* Dev:  Buy Button */}
                      <button className="btn btn-dark-bg-custom evc-title " type="button"
                        disabled>
                        {t("Buy")}
                      </button>
                    </div>
                  ) : Number(approveBUSDValue) < 550 ? (
                    <div className="d-grid border-g">
                      {/* dev:Approve Button   */}
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setBUSD_NFTapprove()}
                      >
                        {t("Approve")}
                      </button>
                    </div>
                  ) : (
                    <div className="d-grid border-g">
                      <button
                        className="btn btn-primary-bg-custom evc-title "
                        type="button"
                        onClick={() => setMintnft(2)}
                      >
                        {t("Buy")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*dev: Level_3 */}
            <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
              <div className="card-evc ">
                <div className="evc-avatar">
                  <img
                    src={evc_avatars[2].thumb}
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <div className="evc-info  h-100 d-flex flex-column ">
                  <div className="d-flex  flex-wrap justify-content-between ">
                    <a href="#" className="evc-title">
                      {t(evc_avatars[2].title)}
                    </a>
                    <div className="line mt-2 mb-2 w-100"></div>
                  </div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div className="evc-no">{t(evc_avatars[2].APRUpto)}</div>
                    <div className="evc-tit" >{t("Max Cap 250%")}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {/* Price section */}
                    <div className="evc-price d-flex align-items-center">
                      <div className="evc-price-title"  >{t("PRICE")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[2].price)}
                      </div>
                    </div>
                    {/* BV section */}
                    <div className="evc-bv d-flex align-items-center">
                      <div className="evc-bv-title" >{t("BV")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[2].bv)}
                      </div>
                    </div>
                  </div>
                  {hasToken[2] === true ? (
                    <div className="d-grid  border-g">
                      {/* Dev:  Buy Button */}
                      <button className="btn btn-dark-bg-custom evc-title " type="button"
                  
                        disabled>
                        {t("Buy")}
                      </button>
                    </div>
                  ) : Number(approveBUSDValue) < 1100 ? (
                    <div className="d-grid border-g">
                      {/* dev:Approve Button   */}
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setBUSD_NFTapprove()}
                   
                      >
                        {t("Approve")}
                      </button>
                    </div>
                  ) : (
                    <div className="d-grid border-g">
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setMintnft(3)}
               
                      >
                        {t("Buy")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*dev: Level_4 */}
            <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
              <div className="card-evc " >
                <div className="evc-avatar">
                  <img
                    src={evc_avatars[3].thumb}
                    alt=""
                    className="img-fluid w-100"
                  />
                </div>
                <div className="evc-info  h-100 d-flex flex-column ">
                  <div className="d-flex gap-2 flex-wrap justify-content-between ">
                    <a href="#" className="evc-title">
                      {t(evc_avatars[3].title)}
                    </a>
                    <div className="line mt-2 mb-2 w-100"></div>
                  </div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div className="evc-no">{t(evc_avatars[3].APRUpto)}</div>
                    <div className="evc-tit" >{t("Max Cap 250%")}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {/* Price section */}
                    <div className="evc-price d-flex align-items-center">
                      <div className="evc-price-title"  >{t("PRICE")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[3].price)}
                      </div>
                    </div>
                    {/* BV section */}
                    <div className="evc-bv d-flex align-items-center">
                      <div className="evc-bv-title" >{t("BV")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[3].bv)}
                      </div>
                    </div>
                  </div>
                  {hasToken[3] === true ? (
                    <div className="d-grid  border-g">
                      {/* Dev:  Buy Button */}
                      <button className="btn btn-dark-bg-custom evc-title " type="button"
                   
                        disabled>
                        {t("Buy")}
                      </button>
                    </div>
                  ) : Number(approveBUSDValue) < 2750 ? (
                    <div className="d-grid border-g">
                      {/* dev:Approve Button   */}
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setBUSD_NFTapprove()}
                   
                      >
                        {t("Approve")}
                      </button>
                    </div>
                  ) : (
                    <div className="d-grid border-g">
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setMintnft(4)}
               
                      >
                        {t("Buy")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*dev: Level_5 */}
            <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
              <div className="card-evc " >
                <div className="evc-avatar">
                  <img
                    src={evc_avatars[4].thumb}
                    alt=""
                    className="img-fluid w-100"
                  />
                </div>
                <div className="evc-info  h-100 d-flex flex-column ">
                  <div className="d-flex gap-2 flex-wrap justify-content-between ">
                    <a href="#" className="evc-title">
                      {t(evc_avatars[4].title)}
                    </a>
                    <div className="line mt-2 mb-2 w-100"></div>
                  </div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div className="evc-no">{t(evc_avatars[4].APRUpto)}</div>
                    <div className="evc-tit" >{t("Max Cap 300%")}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {/* Price section */}
                    <div className="evc-price d-flex align-items-center">
                      <div className="evc-price-title"  >{t("PRICE")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[4].price)}
                      </div>
                    </div>
                    {/* BV section */}
                    <div className="evc-bv d-flex align-items-center">
                      <div className="evc-bv-title" >{t("BV")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[4].bv)}
                      </div>
                    </div>
                  </div>
                  {hasToken[4] === true ? (
                    <div className="d-grid  border-g">
                      {/* Dev:  Buy Button */}
                      <button className="btn btn-dark-bg-custom evc-title" type="button"
                   
                        disabled>
                        {t("Buy")}
                      </button>
                    </div>
                  ) : Number(approveBUSDValue) < 5500 ? (
                    <div className="d-grid border-g">
                      {/* dev:Approve Button   */}
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setBUSD_NFTapprove()}
                  
                      >
                        {t("Approve")}
                      </button>
                    </div>
                  ) : (
                    <div className="d-grid border-g">
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setMintnft(5)}
                
                      >
                        {t("Buy")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*dev: Level_6 */}
            <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
              <div className="card-evc " >
                <div className="evc-avatar">
                  <img
                    src={evc_avatars[5].thumb}
                    alt=""
                    className="img-fluid w-100"
                  />
                </div>
                <div className="evc-info  h-100 d-flex flex-column ">
                  <div className="d-flex gap-2 flex-wrap justify-content-between ">
                    <a href="#" className="evc-title">
                      {t(evc_avatars[5].title)}
                    </a>
                    <div className="line mt-2 mb-2 w-100"></div>
                  </div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div className="evc-no">{t(evc_avatars[5].APRUpto)}</div>
                    <div className="evc-tit" >{t("Max Cap 300%")}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {/* Price section */}
                    <div className="evc-price d-flex align-items-center">
                      <div className="evc-price-title"  >{t("PRICE")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[5].price)}
                      </div>
                    </div>
                    {/* BV section */}
                    <div className="evc-bv d-flex align-items-center">
                      <div className="evc-bv-title" >{t("BV")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[5].bv)}
                      </div>
                    </div>
                  </div>
                  {hasToken[5] === true ? (
                    <div className="d-grid  border-g">
                      {/* Dev:  Buy Button */}
                      <button className="btn btn-dark-bg-custom evc-title" type="button"
                   
                        disabled>
                        {t("Buy")}
                      </button>
                    </div>
                  ) : Number(approveBUSDValue) < 11000 ? (
                    <div className="d-grid border-g">
                      {/* dev:Approve Button   */}
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setBUSD_NFTapprove()}
                    
                      >
                        {t("Approve")}
                      </button>
                    </div>
                  ) : (
                    <div className="d-grid border-g">
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setMintnft(6)}
                
                      >
                        {t("Buy")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*dev: Level_7 */}
            <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
              <div className="card-evc " >
                <div className="evc-avatar">
                  <img
                    src={evc_avatars[6].thumb}
                    alt=""
                    className="img-fluid w-100"
                  />
                </div>
                <div className="evc-info  h-100 d-flex flex-column ">
                  <div className="d-flex gap-2 flex-wrap justify-content-between ">
                    <a href="#" className="evc-title">
                      {t(evc_avatars[6].title)}
                    </a>
                    <div className="line mt-2 mb-2 w-100"></div>
                  </div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div className="evc-no">{t(evc_avatars[6].APRUpto)}</div>
                    <div className="evc-tit" >{t("Max Cap 300%")}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {/* Price section */}
                    <div className="evc-price d-flex align-items-center">
                      <div className="evc-price-title"  >{t("PRICE")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[6].price)}
                      </div>
                    </div>
                    {/* BV section */}
                    <div className="evc-bv d-flex align-items-center">
                      <div className="evc-bv-title" >{("BV")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[6].bv)}
                      </div>
                    </div>
                  </div>
                  {hasToken[6] === true ? (
                    <div className="d-grid  border-g">
                      {/* Dev:  Buy Button */}
                      <button className="btn btn-dark-bg-custom evc-title " type="button"
               
                        disabled>
                        {t("Buy")}
                      </button>
                    </div>
                  ) : Number(approveBUSDValue) < 27500 ? (
                    <div className="d-grid border-g">
                      {/* dev:Approve Button   */}
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setBUSD_NFTapprove()}
                   
                      >
                        {t("Approve")}
                      </button>
                    </div>
                  ) : (
                    <div className="d-grid border-g">
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setMintnft(7)}
                  
                      >
                        {("Buy")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*dev: Level_8 */}
            <div class="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3 mb-md-4">
              <div className="card-evc " >
                <div className="evc-avatar">
                  <img
                    src={evc_avatars[7].thumb}
                    alt=""
                    className="img-fluid w-100"
                  />
                </div>
                <div className="evc-info  h-100 d-flex flex-column ">
                  <div className="d-flex gap-2 flex-wrap justify-content-between ">
                    <a href="#" className="evc-title">
                      {t(evc_avatars[7].title)}
                    </a>
                    <div className="line mt-2 mb-2 w-100"></div>
                  </div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div className="evc-no">{t(evc_avatars[7].APRUpto)}</div>
                    <div className="evc-tit" >{t("Max Cap 300%")}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {/* Price section */}
                    <div className="evc-price d-flex align-items-center">
                      <div className="evc-price-title"  >{t("PRICE")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[7].price)}
                      </div>
                    </div>
                    {/* BV section */}
                    <div className="evc-bv d-flex align-items-center">
                      <div className="evc-bv-title" >{t("BV")}</div>
                      <div className="evc-tit" >
                        <img src={busd} alt="" className="img-fluid"  />
                        {t(evc_avatars[7].bv)}
                      </div>
                    </div>
                  </div>
                  {hasToken[7] === true ? (
                    <div className="d-grid  border-g">
                      {/* Dev:  Buy Button */}
                      <button className="btn btn-dark-bg-custom evc-title" type="button"
                   
                        disabled>
                        {t("Buy")}
                      </button>
                    </div>
                  ) : Number(approveBUSDValue) < 55000 ? (
                    <div className="d-grid border-g">
                      {/* dev:Approve Button   */}
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setBUSD_NFTapprove()}
                   
                      >
                        {t("Approve")}
                      </button>
                    </div>
                  ) : (
                    <div className="d-grid border-g">
                      <button
                        className="btn btn-primary-bg-custom evc-title"
                        type="button"
                        onClick={() => setMintnft(8)}
                   
                      >
                        {t("Buy")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default EvcAvatars;