import { Link } from "react-router-dom";
import logo from "../../../assets/img/dashboard/dash-logo.svg";
// import logo from "../../../assets/img/logo.png"
import { ReactComponent as EvcIcon } from "../../../assets/img/dashboard/icons/evc-icon.svg";
import { ReactComponent as Icon1 } from "../../../assets/img/dashboard/icons/tokend-icon-1.svg";
import icon_2 from '../../../assets/img/dashboard/tread-logo.png'
import { VscBell, VscListSelection } from "react-icons/vsc";
import { FaWallet, FaUserCircle } from "react-icons/fa";
import Web3 from "web3";
import { useState, useEffect, useRef } from "react";
import { getAccountNotification } from "../../../ContractAction/EVCNFTContractAction";
import { getBalanceEVC } from "../../../ContractAction/EVCStakeContractAction";
import ConnectButton from "../../../Pages/Home/ConnectButton";
import Home from "../../Home";
// import Connect from '../Connect';
import icon from "../../../assets/img/icons/icon.png";
import { useTranslation } from "react-i18next";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  DELETENOTIFICATIONBYID,
  DELETENOTIFICATIONBYADDRESS,
} from "../../../ContractAction/ContractDependency";
import axios from "axios";
import NavDropdown from "react-bootstrap/NavDropdown";
import useMediaQuery from "@mui/material/useMediaQuery";
const Navbar = ({ sideToggle, setSideToggle }) => {
  const [box, setBox] = useState(false); //
  const [isConnected, setIsConnected] = useState(false); //
  const [address, setAddress] = useState(""); //
  const [userEVCBalance, setUserEVCBalance] = useState("");
  const isMobile = useMediaQuery("(max-width:991px)");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [updated, setUpdated] = useState(false);

  const { t, i18n } = useTranslation();
  const dropdownRef = useRef(null);
  const languages = [
    { name: "EN", code: "en" },       // English
    { name: "DE", code: "de" },       // German
    { name: "RU", code: "ru" },       // Russian
    { name: "VI", code: "vi" },       // Vietnamese
    { name: "ZH", code: "zh" },       // Chinese
    { name: "ES", code: "es" },       // Spanish
    { name: "KO", code: "ko" },       // Korean
    { name: "JA", code: "ja" },       // Japanese
    { name: "TH", code: "th" },       // Thai
    { name: "FR", code: "fr" }        // French
  ];
  // const AfterClaim = localStorage.getItem("ClaimedValueAfterClaim")
  // const AfterWithdrawn = localStorage.getItem("ClaimedValueAfterWithdrawn")
  // console.log("AfterClaim",AfterClaim)
  // console.log("AfterWithdrawn",AfterWithdrawn)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const getAccountNotifications = async () => {
      const notificationData = await getAccountNotification();
      console.log("notificationData", notificationData);
      setNotifications(notificationData || []);
    };
    getAccountNotifications();
  }, []);

  //dev: Use useEffect
  useEffect(() => {
    const AvailableBalanceEVC = async () => {
      let EVCBalance = await getBalanceEVC();
      setUserEVCBalance(EVCBalance);
    };
    AvailableBalanceEVC();
    const updateLocalValueClaimOrWithdraw = setInterval(
      AvailableBalanceEVC,
      10000
    );
    return () => clearInterval(updateLocalValueClaimOrWithdraw);
  }, []);

  //dev: detect Current Provider Metamask
  const detectCurrentProviderMetamask = (e) => {
    //
    e.preventDefault(); //
    let provider; //
    // if (typeof window.ethereum !== 'undefined') { //
    //   provider = window.ethereum.providers.find((provider) => provider.isMetaMask); //
    // }
    if (typeof window.ethereum !== "undefined") {
      //
      provider = window.ethereum.providers.find(
        (provider) => provider.isMetaMask
      ); //
    } else {
      //
      console.log("Non-ethereum browser detected. You should install Metamask"); //
    } //
    return provider; //
  };

  //dev: Connect Metamask Wallet
  const onConnectMetamask = async (e) => {
    e.preventDefault();
    try {
      const currentProvider = detectCurrentProviderMetamask(e);
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        console.log("Accounts", account);
        setAddress(account);
        setIsConnected(true);
        setBox(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //dev:  Disconnect Metamask Wallet
  const onDisconnect = () => {
    setIsConnected(false);
    // setEthBalance();
  };

  const wallet = () => {
    //
    setBox(true); //
  };

  const cancel = () => {
    //
    setBox(false); //
  }; //

  //dev: Toggle Sidebar

  const sidebarToggle = (e) => {
    setSideToggle(!sideToggle);
  };
  const handleSelect = (eventKey) => {
    const selectedLang = languages.find((lang) => lang.code === eventKey);
    setSelectedLanguage(selectedLang);
    changeLanguage(eventKey);
  };
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLangCode = localStorage.getItem("i18nextLng");
    return savedLangCode
      ? languages.find((lang) => lang.code === savedLangCode)
      : languages[0];
  });
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleDeleteNotificationById = async (id) => {
    try {
      const response = await axios({
        url: `${DELETENOTIFICATIONBYID}/${id}`,
        method: "DELETE",
      });
      console.log("response", response?.data?.status);
      if (response?.data?.status === true) {
        toast.success("Notification deleted successfully");
        setUpdated(true); // Trigger re-fetch of notifications
      }
    } catch (err) {
      console.error("Error deleting notification:", err);
      // Optionally handle error with a toast or other feedback
    }
  };
  const handleDeleteAllNotifications = async () => {
    try {
      const address = window.localStorage.getItem("connectedAccount");
      const response = await axios({
        url: `${DELETENOTIFICATIONBYADDRESS}/${address}`,
        method: "DELETE",
      });
      console.log("responsebyall", response?.data?.status);
      if (response?.data?.status === true) {
        toast.success("Notifications deleted successfully");
        setUpdated(true); // Trigger re-fetch of notifications
      }
    } catch (err) {
      console.error("Error deleting all notifications:", err);
      // Optionally handle error with a toast or other feedback
    }
  };

  return (
    <div className="cbd-navbar">
        <div className="d-flex align-items-start justify-content-between">
          <div className="cbd-navbar-left">
            <Link to="/" className="d-flex px-sm-2">
              <img src={logo} alt="" className="img-fluid nav-logo" />
            </Link>
          </div>
          <div className="cbd-navbar-right d-flex align-items-center">
            <div className="d-flex align-items-center gap-3 me-auto">
              <div className="page-title  me-auto d-none d-md-flex flex-left">
                {t("Dashboard")}
              </div>
              <div className="cbd-navbar-profile d-flex align-items-center gap-2 d-none d-sm-flex">
                <div className="cursor-pointer icon-user p-2 d-none d-lg-flex">
                  <img src={icon} alt="" />
                </div>
                <div>
                  <div className="nav-tata text-sm opacity-75">
                    {t("HOLDER")}
                  </div>
                  <div className="nav-tata text-sm">0</div>
                </div>
              </div>
              <div className="cbd-navbar-profile d-flex align-items-center gap-2 d-none d-sm-flex">
                <div className="cursor-pointer icon-user d-none d-lg-flex">
                  <img src={icon_2} alt="" />
                </div>
                <div style={{ width: isMobile ? "100px" : "initial" }}>
                  <div className="nav-tata text-uppercase text-sm opacity-75" >
                    {t("TRND TOKEN")}
                  </div>
                  <div className="nav-tata text-sm">
                    {Number(userEVCBalance).toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}
                  </div>
                </div>
                {/* {!isMobile && (
                  <div>
                    <NavDropdown
                      title={selectedLanguage.name}
                      id="navbarScrollingDropdown"
                      onSelect={handleSelect}
                      style={{ fontSize: "15px" }}
                    >
                      {languages.map((lang) => (
                        <NavDropdown.Item key={lang.code} eventKey={lang.code}>
                          {lang.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  </div>
                )} */}
              </div>
            </div>
            <div className="mobile-icons custom-gap-md d-flex align-items-center justify-content-end ">
              <div className="position-relative me-2 me-sm-3 me-lg-4" ref={dropdownRef}>
                <div className="cursor-pointer icon-square icon-circle icon-notification" onClick={toggleDropdown}>
                  <VscBell />
                </div>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  <span style={{ fontSize: "10px" }}>
                    {notifications.length}
                  </span>
                </span>
                {isDropdownOpen && notifications.length > 0 && (
                  <div
                    className="dropdown-content bg-light border p-2 position-absolute top-100 end-0"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    <div className="d-flex justify-content-center">
                      <button
                        className="d-flex align-items-center "
                        style={{ color: "black", margin: "auto" }}
                        onClick={() => handleDeleteAllNotifications()}
                      >
                        Clear All
                        <MdDelete />
                      </button>
                    </div>

                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="notification-item position-relative py-2 px-3"
                      >
                        <div className="notification-text">
                          {index + 1}. {notification.notification}
                        </div>
                        <div className="notification-time text-muted">
                          {/* Add timestamp or time ago */}
                        </div>
                        <div className="notification-delete position-absolute">
                          <RxCross2
                            style={{ fontSize: "10px", color: "grey" }}
                            onClick={() =>
                              handleDeleteNotificationById(notification.id)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ConnectButton />
              <div className="position-relative">
                <div className={`cursor-pointer position-absolute top-0 start-0 h-100 w-100 ${sideToggle ? "" : "d-none"}`}></div>
                <div className="cursor-pointer icon-square d-flex d-lg-none p-2" onClick={sidebarToggle}>
                  <VscListSelection />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Navbar;
