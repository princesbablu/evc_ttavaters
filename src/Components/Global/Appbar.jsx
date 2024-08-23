// //Blocknative mobile version

// import { useState, useEffect, useRef } from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { Link } from "react-scroll";
// import { FaWallet } from "react-icons/fa";
// import logo from "../../assets/img/logo.png";
// import { init, useConnectWallet } from "@web3-onboard/react";
// import metamaskModule from '@web3-onboard/metamask'
// import injectedModule from "@web3-onboard/injected-wallets";
// import { ethers } from "ethers";
// import { useNavigate } from "react-router-dom";
// import ConnectButton from "../../Pages/Home/ConnectButton";
// // import walletConnectModule from '@web3-onboard/walletconnect';
// // import metamaskSDK from '@web3-onboard/metamask'

// const apiKey = "1730eff0-9d50-4382-a3fe-89f0d34a2070";

// const injected = injectedModule();

// const infuraKey = "5a15aa3454c24ab482eefb35dc2a1f57";
// const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;
// const metamask = metamaskModule({
//   options: {
//     extensionOnly: false,
//     i18nOptions: {
//       enabled: true
//     },
//     dappMetadata: {
//       name: 'Web3Onboard React Demo'
//     }
//   }
// })
// // const walletConnect = walletConnectModule({
// //   handleUri: uri => console.log(uri),
// //   //projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
// //   projectId:'5a15aa3454c24ab482eefb35dc2a1f57',
// //   dappUrl: 'https://www.onboard.blocknative.com'
// // });
// // const metamaskSDKWallet = metamaskSDK({options: {
// //   extensionOnly: false,
// //   dappMetadata: {
// //     name: 'Demo Web3Onboard'
// //   }
// // }})
// // initialize Onboard
// const onboard = init({
//   apiKey,
//   wallets: [
//     metamask,
//     injected],
//   chains: [
//     {
//       id: "0x38",
//       token: "BNB",
//       label: "Binance Smart Chain Mainnet",
//       rpcUrl: "https://bsc-dataseed.binance.org/",
//     },
//     {
//       id: "0xa4b1",
//       token: "ARB-ETH",
//       label: "Arbitrum One",
//       rpcUrl: "https://rpc.ankr.com/arbitrum",
//     },
//     {
//       id: "0xa4ba",
//       token: "ARB",
//       label: "Arbitrum Nova",
//       rpcUrl: "https://nova.arbitrum.io/rpc",
//     },
//     {
//       id: "0x2105",
//       token: "ETH",
//       label: "Base",
//       rpcUrl: "https://mainnet.base.org",
//     },
//   ],
//   accountCenter: {
//     desktop: {
//       enabled: true,
//       position: 'topRight'
//     },
//     mobile: {
//       enabled: true,
//       position: 'topRight'
//     }
//   }
// });

// //dev: Appbar Component
// function Appbar({ mobile, ...rest }) {
//   const deSelectRef = useRef(null);
//   const [navExpand, setNavExpand] = useState(false);
//   const [box, setBox] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const [address, setAddress] = useState("");

//   const navigate = useNavigate();
//   const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
//   const [walletAddress, setWalletAddress] = useState(
//     localStorage.getItem("connectedAccount") || ""
//   );
//   console.log("walletAddress", walletAddress);
//   console.log("wallet", wallet);
//   // create an ethers provider
//   let ethersProvider = null;
//   if (wallet) {
//     ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
//   }

//   // useEffect(() => {
//   //   const savedWalletAddress = localStorage.getItem('connectedAccount')
//   //   if (savedWalletAddress && !wallet) {
//   //     connect()
//   //   }
//   // }, [connect])

//   useEffect(() => {
//     if (wallet) {
//       const address = wallet.accounts[0].address;
//       setWalletAddress(address);
//       localStorage.setItem("connectedAccount", address);
//       navigate("/dashboard/tt-avatars");
//       // Listen for account changes
//       wallet.provider.on("accountsChanged", (accounts) => {
//         if (accounts.length > 0) {
//           const newAddress = accounts[0];
//           setWalletAddress(newAddress);
//           localStorage.setItem("connectedAccount", newAddress);
//         } else {
//           setWalletAddress("");
//           localStorage.removeItem("connectedAccount");
//         }
//       });

//       // Clean up the event listener
//       return () => {
//         wallet.provider.removeListener("accountsChanged", () => {});
//       };
//     }
//   }, [wallet]);

//   // Effect to update localStorage and state when walletAddress changes
//   useEffect(() => {
//     if (walletAddress) {
//       localStorage.setItem("connectedAccount", walletAddress);
//     } else {
//       localStorage.removeItem("connectedAccount");
//     }
//   }, [walletAddress]);

//   const handleDisconnect = () => {
//     disconnect(wallet);
//     setWalletAddress("");
//     localStorage.removeItem("connectedAccount");
//     navigate("/");
//   };

//   const redirectToDashboard = () => {
//     navigate("/dashboard/tt-avatars");
//   };

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (deSelectRef.current && !deSelectRef.current.contains(event.target)) {
//         setNavExpand(false);
//       }
//     }
//     //dev: Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       //dev: Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [deSelectRef]);

//   //dev: STICKY NAVBAR
//   const [stickyClass, setStickyClass] = useState("");

//   const stickNavbar = () => {
//     if (window !== undefined) {
//       let windowHeight = window.scrollY;
//       windowHeight > 0
//         ? setStickyClass("bg-body sticky-navbar")
//         : setStickyClass("bg-body");
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", stickNavbar);
//     return () => {
//       window.removeEventListener("load", stickNavbar);
//     };
//   }, []);

//   console.log("injected",injected);

//   //shreyash code
//   const handleButtonClick = async () => {
//     if (walletAddress) {
//       redirectToDashboard();
//     } else {
//       try {
//         await connect();

//       } catch (error) {
//         alert("Error connecting wallet:", error);
//       }
//     }
//   };

// console.log("connecting",connecting);
//   return (
//     <>
//       {/*dev:  Navbar */}
//       {mobile === "offcanvas" ? (
//         <Navbar
//           expand="xl"
//           className={stickyClass}
//           fixed="top"
//           {...rest}
//           style={{ cursor: "pointer", background: "#201F24" }}
//         >
//           <Container>
//             <Link to="home" className="navbar-brand">
//               <img
//                 src={logo}
//                 alt=""
//                 className="img-fluid w-auto"
//                 style={{ height: "32px" }}
//               />
//             </Link>

//             <div className="d-flex d-xl-none ms-auto">
//               <button
//                 className="btn btn-primary-bg-custom"
//                  disabled={connecting}
//                 // onClick={() =>
//                 //   walletAddress ? redirectToDashboard() : connect()
//                 // }

//                 onClick={handleButtonClick}
//                 style={{
//                   marginLeft: 20,
//                   borderWidth: "1px",
//                   borderRadius: "8px",
//                   borderColor: "#25a98e",
//                   color: "white",
//                 }}
//               >
//                 {walletAddress
//                   ? `${walletAddress.substring(
//                       0,
//                       4
//                     )}...${walletAddress.substring(walletAddress.length - 4)}`
//                   : "Connect Wallet"}
//               </button>
//               {walletAddress ? (
//                 <button
//                   className="nav-tata social-buttons"
//                   style={{
//                     display: "flex",
//                     gap: "0px 10px",
//                     width: "102px",
//                     height: "40px",
//                     marginRight: "3vw",
//                     border: "1px solid rgb(37, 169, 142)",
//                     borderRadius: "8px",
//                     background: "rgba(0,0,0,0.7)",
//                     fontSize: "16px",
//                     color: "white",
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                   onClick={handleDisconnect}
//                 >
//                   Log Out
//                 </button>
//               ) : null}
//             </div>

//             <Navbar.Toggle
//               aria-controls={`offcanvasNavbar-expand-xl`}
//               className="me-2"
//             >
//               <span className="line"></span>
//               <span className="line"></span>
//               <span className="line"></span>
//             </Navbar.Toggle>
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-xl`}
//               aria-labelledby={`offcanvasNavbahrLabel-expand-xl`}
//               placement="start"
//               backdrop={true}
//               scroll={true}
//             >
//               <Offcanvas.Header closeButton>
//                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
//                   <img src={logo} alt="" className="img-fluid w-50" />
//                 </Offcanvas.Title>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Nav className="justify-content-center flex-grow-1 pe-3">
//                   <Link
//                     style={{ margin: "0 20px" }}
//                     activeClass="active"
//                     to="home"
//                     spy={true}
//                     smooth={true}
//                     offset={50}
//                     duration={100}
//                   >
//                     Home
//                   </Link>
//                   <Link
//                     style={{ margin: "0 20px" }}
//                     activeClass="active"
//                     to="About"
//                     spy={true}
//                     smooth={true}
//                     offset={50}
//                     duration={100}
//                   >
//                     About
//                   </Link>
//                   <Link
//                     style={{ margin: "0 20px" }}
//                     activeClass="active"
//                     to="Products"
//                     spy={true}
//                     smooth={true}
//                     offset={50}
//                     duration={100}
//                   >
//                     Products
//                   </Link>
//                   <Link
//                     style={{ margin: "0 20px" }}
//                     activeClass="active"
//                     to="tok"
//                     spy={true}
//                     smooth={true}
//                     offset={50}
//                     duration={100}
//                   >
//                     Tokenomics
//                   </Link>
//                   {/* <a style={{ margin: '0 20px',color:"white" }} activeClass="active">Avatar</a> */}
//                   <Link
//                     style={{ margin: "0 20px" }}
//                     activeClass="active"
//                     to="NftSlider"
//                     spy={true}
//                     smooth={true}
//                     offset={50}
//                     duration={100}
//                   >
//                     Avatar
//                   </Link>

//                   {/* <NavDropdown style={{ margin: '0 20px', top: '-8px', padding: 0 ,color:"white"}}
//                                         title="Avatar"
//                                         id={`offcanvasNavbarDropdown-expand-xl`}

//                                     >
//                                         <NavDropdown.Item href="/Dashboard"style={{color:"white"}}> Dashboard </NavDropdown.Item>
//                                         <NavDropdown.Item href="#"style={{color:"white"}}> Page 2 </NavDropdown.Item>
//                                         <NavDropdown.Item href="#"style={{color:"white"}}> Page 3 </NavDropdown.Item>
//                                     </NavDropdown> */}
//                   <Link
//                     style={{ margin: "0 20px" }}
//                     activeClass="active"
//                     to="how"
//                     spy={true}
//                     smooth={true}
//                     offset={50}
//                     duration={100}
//                   >
//                     How it works
//                   </Link>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//             <ConnectButton />
//           </Container>
//         </Navbar>
//       ) : (
//         <Navbar
//           expand="xl"
//           fixed="top"
//           className={stickyClass}
//           expanded={navExpand}
//           ref={deSelectRef}
//           {...rest}
//         >
//           <Container>
//             <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//             <div className="d-flex d-xl-none">
//               <a href="#" className="btn btn-primary">
//                 <span className="d-none d-xs-block">Text</span>
//                 <span className="d-xs-none">
//                   <FaWallet />{" "}
//                 </span>
//               </a>
//             </div>
//             <Navbar.Toggle
//               aria-controls="basic-navbar-nav"
//               className="ms-auto me-2"
//               onClick={() => setNavExpand(!navExpand)}
//             >
//               <span className="line"></span>
//               <span className="line"></span>
//               <span className="line"></span>
//             </Navbar.Toggle>
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="mx-auto">
//                 <Nav.Link href="#">Home</Nav.Link>
//                 <Nav.Link to="/About">About</Nav.Link>
//                 <Nav.Link to="/Products">Products</Nav.Link>

//                 <Nav.Link href="#">Tokenomics</Nav.Link>
//                 <Nav.Link href="NftSlider">Avatar</Nav.Link>
//                 {/* dev: Dropdown */}
//                 <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                   <NavDropdown.Item href="#"> Page 1 </NavDropdown.Item>
//                   <NavDropdown.Item href="#"> Page 2 </NavDropdown.Item>
//                   <NavDropdown.Item href="#"> Page 3 </NavDropdown.Item>
//                 </NavDropdown>
//                 <Nav.Link href="How">How it works</Nav.Link>
//               </Nav>
//             </Navbar.Collapse>
//             <div className="d-none d-xl-flex">
//               <a href="#" className="btn btn-primary">
//                 text
//               </a>
//             </div>
//           </Container>
//         </Navbar>
//       )}
//     </>
//   );
// }

// export default Appbar;

//Original Appbar

import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-scroll";
import { FaWallet } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
import { init, useConnectWallet } from "@web3-onboard/react";
import metamaskModule from "@web3-onboard/metamask";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import ConnectButton from "../../Pages/Home/ConnectButton";
import { useWeb3Onboard } from "../../config/context";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";

const languages = [
  { name: "English", code: "en" },
  { name: "German", code: "de" },
  { name: "Russian", code: "ru" },
  { name: "Vietnamese", code: "vi" },
  { name: "Chinese", code: "zh" },
  { name: "Spanish", code: "es" },
  { name: "Korean", code: "ko" },
  { name: "Japanese", code: "ja" },
  { name: "Thai", code: "th" },
  { name: "French", code: "fr" },
];

//dev: Appbar Component
function Appbar({ mobile, ...rest }) {
  const deSelectRef = useRef(null);
  const [navExpand, setNavExpand] = useState(false);
  const [box, setBox] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const isMobile = useMediaQuery("(max-width:991px)");

  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLangCode = localStorage.getItem("i18nextLng");
    return savedLangCode
      ? languages.find((lang) => lang.code === savedLangCode)
      : languages[0];
  });

  const handleSelect = (eventKey) => {
    const selectedLang = languages.find((lang) => lang.code === eventKey);
    setSelectedLanguage(selectedLang);
    changeLanguage(eventKey);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navigate = useNavigate();
  const { web3Onboard, wallet, connecting, connect, disconnect } =
    useWeb3Onboard();
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("connectedAccount") || ""
  );
  console.log("walletAddress", walletAddress);
  console.log("walletmaza", wallet);
  // create an ethers provider
  let ethersProvider = null;
  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  }

  useEffect(() => {
    if (wallet) {
      const address = wallet.accounts[0].address;
      setWalletAddress(address);
      localStorage.setItem("connectedAccount", address);
      navigate("/dashboard/tt-avatars");
      // Listen for account changes
      wallet.provider.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          const newAddress = accounts[0];
          setWalletAddress(newAddress);
          localStorage.setItem("connectedAccount", newAddress);
        } else {
          setWalletAddress("");
          localStorage.removeItem("connectedAccount");
        }
      });

      // Clean up the event listener
      return () => {
        wallet.provider.removeListener("accountsChanged", () => {});
      };
    }
  }, [wallet]);

  // Effect to update localStorage and state when walletAddress changes
  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("connectedAccount", walletAddress);
    } else {
      localStorage.removeItem("connectedAccount");
    }
  }, [walletAddress]);

  const handleDisconnect = () => {
    if (wallet) {
      disconnect(wallet);
    }

    setWalletAddress("");
    localStorage.removeItem("connectedAccount");
    navigate("/");
  };

  const redirectToDashboard = () => {
    navigate("/dashboard/tt-avatars");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (deSelectRef.current && !deSelectRef.current.contains(event.target)) {
        setNavExpand(false);
      }
    }
    //dev: Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      //dev: Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deSelectRef]);

  //dev: STICKY NAVBAR
  const [stickyClass, setStickyClass] = useState("");

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 0
        ? setStickyClass("bg-body sticky-navbar")
        : setStickyClass("bg-body");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("load", stickNavbar);
    };
  }, []);

  //shreyash code
  const handleButtonClick = async () => {
    if (walletAddress) {
      redirectToDashboard();
    } else {
      try {
        await connect();
      } catch (error) {
        alert("Error connecting wallet:", error);
      }
    }
  };

  console.log("connecting", connecting);
  return (
    <>
      {/*dev:  Navbar */}
      {mobile === "offcanvas" ? (
        <Navbar
          expand="xl"
          className={stickyClass}
          fixed="top"
          {...rest}
          style={{ cursor: "pointer", background: "#201F24" }}
        >
          <Container>
            <Link to="home" className="navbar-brand">
              <img
                src={logo}
                alt=""
                className="img-fluid w-auto"
                style={
                  isMobile
                    ? { height: "80px", width: "80px !important" }
                    : { height: "32px" }
                }
              />
            </Link>

            <div className="d-flex d-xl-none ms-auto">
              <button
                className="btn btn-primary-bg-custom"
                disabled={connecting}
                // onClick={() =>
                //   walletAddress ? redirectToDashboard() : connect()
                // }

                onClick={handleButtonClick}
                style={{
                  marginLeft: 20,
                  borderWidth: "1px",
                  borderRadius: "8px",
                  borderColor: "#25a98e",
                  color: "white",
                  fontSize: isMobile ? "36px" : "initial",
                }}
              >
                {walletAddress
                  ? `${walletAddress.substring(
                      0,
                      4
                    )}...${walletAddress.substring(walletAddress.length - 4)}`
                  : "Connect Wallet"}
              </button>
              {walletAddress ? (
                <button
                  className="nav-tata social-buttons"
                  style={{
                    display: "flex",
                    gap: "0px 10px",
                    width: "102px",
                    // height: "40px",
                    // marginRight: "3vw",
                    border: "1px solid rgb(37, 169, 142)",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.7)",
                    fontSize: "16px",
                    color: "white",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft:"20px"
                  }}
                  onClick={handleDisconnect}
                >
                  {t("Log Out")}
                </button>
              ) : null}
            </div>

            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-xl`}
              className="me-2"
              style={{ marginLeft: "20px" }}
            >
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-xl`}
              aria-labelledby={`offcanvasNavbahrLabel-expand-xl`}
              placement="start"
              backdrop={true}
              scroll={true}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                  <img src={logo} alt="" className="img-fluid w-50" />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  <Link
                    style={{ margin: "auto 20px" }}
                    activeClass="active"
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={100}
                  >
                    {t("Home")}
                  </Link>
                  <Link
                    style={{ margin: "auto 20px" }}
                    activeClass="active"
                    to="About"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={100}
                  >
                    {t("About")}
                  </Link>
                  <Link
                    style={{ margin: "auto 20px" }}
                    activeClass="active"
                    to="Products"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={100}
                  >
                    {t("Products")}
                  </Link>
                  <Link
                    style={{ margin: "auto 20px" }}
                    activeClass="active"
                    to="tok"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={100}
                  >
                    {t("Tokenomics")}
                  </Link>
                  {/* <a style={{ margin: '0 20px',color:"white" }} activeClass="active">Avatar</a> */}
                  {/* <Link
                    style={{ margin: "0 20px" }}
                    activeClass="active"
                    to="NftSlider"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={100}
                  >
                    Avatar
                  </Link> */}

                  {/* <NavDropdown style={{ margin: '0 20px', top: '-8px', padding: 0 ,color:"white"}}
                                        title="Avatar"
                                        id={`offcanvasNavbarDropdown-expand-xl`}
                                        
                                    >
                                        <NavDropdown.Item href="/Dashboard"style={{color:"white"}}> Dashboard </NavDropdown.Item>
                                        <NavDropdown.Item href="#"style={{color:"white"}}> Page 2 </NavDropdown.Item>
                                        <NavDropdown.Item href="#"style={{color:"white"}}> Page 3 </NavDropdown.Item>
                                    </NavDropdown> */}
                  <Link
                    style={{ margin: "auto 20px" }}
                    activeClass="active"
                    to="how"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={100}
                  >
                    {t("How it works")}
                  </Link>
                  <NavDropdown
                    title={selectedLanguage.name}
                    id="navbarScrollingDropdown"
                    onSelect={handleSelect}
                  >
                    {languages.map((lang) => (
                      <NavDropdown.Item key={lang.code} eventKey={lang.code}>
                        {lang.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <ConnectButton />
          </Container>
        </Navbar>
      ) : (
        <Navbar
          expand="xl"
          fixed="top"
          className={stickyClass}
          expanded={navExpand}
          ref={deSelectRef}
          {...rest}
        >
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <div className="d-flex d-xl-none">
              <a href="#" className="btn btn-primary">
                <span className="d-none d-xs-block">Text</span>
                <span className="d-xs-none">
                  <FaWallet />{" "}
                </span>
              </a>
            </div>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="ms-auto me-2"
              onClick={() => setNavExpand(!navExpand)}
            >
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link to="/About">About</Nav.Link>
                <Nav.Link to="/Products">Products</Nav.Link>

                <Nav.Link href="#">Tokenomics</Nav.Link>
                {/* <Nav.Link href="NftSlider">Avatar</Nav.Link> */}
                {/* dev: Dropdown */}
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#"> Page 1 </NavDropdown.Item>
                  <NavDropdown.Item href="#"> Page 2 </NavDropdown.Item>
                  <NavDropdown.Item href="#"> Page 3 </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="How">How it works</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <div className="d-none d-xl-flex">
              <a href="#" className="btn btn-primary">
                text
              </a>
            </div>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default Appbar;
