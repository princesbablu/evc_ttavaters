// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FaCaretLeft, FaCaretRight, FaEthereum } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import SectionTitle from "../../Components/Single/SectionTitle";
import { React, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// ASSETS
import nftv1 from "../Dashboard/Mint/Images/level1.png";
import nftv2 from "../Dashboard/Mint/Images/level2.png";
import nftv3 from "../Dashboard/Mint/Images/level3.png";
import nftv4 from "../Dashboard/Mint/Images/level4.png";
import nftv5 from "../Dashboard/Mint/Images/level5.png";
import nftv6 from "../Dashboard/Mint/Images/level6.png";
import nftv7 from "../Dashboard/Mint/Images/level7.png";
import nftv8 from "../Dashboard/Mint/Images/level8.png";
import { Scrollbar, Navigation } from "swiper";
import "swiper/css/scrollbar";
import { background } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import ttavatar from "../../assets/img/regular/ttavatars.svg";
import { useNavigate } from "react-router-dom";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnect from "@walletconnect/web3-provider";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

//dev: NFT List
const nftList = [
  {
    thumb: nftv1,
    eth: "#",
    title: "Crypto Newbies",
    price: "$110",
    link: "#",
  },
  {
    thumb: nftv2,
    eth: "#",
    title: "Crypto Enthusiast",
    price: "$550",
    link: "#",
  },
  {
    thumb: nftv3,
    eth: "#",
    title: "Crypto Entrepreneur",
    price: "$1,100",
    link: "#",
  },
  {
    thumb: nftv4,
    eth: "#",
    title: "Crypto Investor",
    price: "$2,750",
    link: "#",
  },
  {
    thumb: nftv5,
    eth: "#",
    title: "Crypto King",
    price: "$5,500",
    link: "#",
  },
  {
    thumb: nftv6,
    eth: "#",
    title: "Blockchain Mogul",
    price: "$11,000",
    link: "#",
  },
  {
    thumb: nftv7,
    eth: "#",
    title: "Bitcoin Billionaire",
    price: "$27,500",
    link: "#",
  },
  {
    thumb: nftv8,
    eth: "#",
    title: "CryptoCap Tycoon",
    price: "$55,000",
    link: "#",
  },
];

const ModalAlert = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Connect Wallet{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Please connect the wallet first</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => props.onHide(false)}>
          OK
        </Button>
        {/* <Button variant="secondary" onClick={()=>props.onClick()} >Connect Wallet</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

//dev: NFT List
const NftSlider = () => {
  const navigate = useNavigate();
  const newAddress = localStorage.getItem("connectedAccount");
  const [modalShow, setModalShow] = useState(false);

  const providerOptions = {
    walletconnect: {
      package: WalletConnect,
      options: {
        infuraId: "5a15aa3454c24ab482eefb35dc2a1f57",
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: "rinkeby",
    theme: "light",
    cacheProvider: false,
    providerOptions,
  });

  const [connectedAccount, setConnectedAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [reloadButton, setReloadButton] = useState(false);

  const connectWeb3Wallet = async () => {
    setModalShow(false);
    try {
      const web3Provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(web3Provider);
      const web3Accounts = await library.listAccounts();
      setIsConnected(true);
      window.localStorage.setItem("connectedAccount", web3Accounts[0]);
      setConnectedAccount(web3Accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWeb3Modal = () => {
    web3Modal.clearCachedProvider();
    window.localStorage.removeItem("connectedAccount");
    window.localStorage.removeItem("sponsorAddress");
    setIsConnected(false);
    setConnectedAccount("");
  };

  const refresh = () => window.location.reload();

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        window.localStorage.setItem("connectedAccount", accounts[0]);
        setReloadButton(true);
        setTimeout(() => setReloadButton(false), 500);
      } else {
        window.localStorage.removeItem("connectedAccount");
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const redirectToDashboard = () => {
    if (newAddress) {
      navigate("/dashboard");
    } else {
      setModalShow(true);
    }
  };

  if (isConnected) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <div
        className="section-gap"
        id="NftSlider"
        style={{
          backgroundImage: `url(${ttavatar})`,
          display: "none",
          visibility: "hidden",
        }}
      >
        <div className="container">
          <ModalAlert show={modalShow} onHide={() => setModalShow(false)} />
          <div className="row align-items-center justify-content-center">
            <div className="text-center">
              <SectionTitle
                main="CHOOSE YOUR TT AVATAR AND CONTRIBUTE"
                subTitleSize={"56px"}
                main1=" USDC(BASE) TO EARN DAILY REWARDS"
                subTitleSize1={"56px"}
                subWidth={"80vw"}
                subWidth1={"80vw"}
              />
              {/* <span className=" w-100" style={{fontSize:"56px",width:"100vw",margin:"0px",padding:"0px",fontWeight:"700"}}>CHOOSE YOUR TT AVATAR AND CONTRIBUTE <br/> USDC(BASE) TO EARN DAILY REWARDS</span> */}
            </div>
            <div className="col-lg-3">
              <div className="d-flex align-items-center fw-bold gap-3 mb-5">
                {/* <div className="count text-gradient">1</div> */}
                <div className="nft-scrollbar"></div>
                {/* <div className="count">{nftList.length}</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden " style={{ marginTop: "-70px" }}>
          <div className="container overflow-swiper">
            <Swiper
              scrollbar={{
                el: ".nft-scrollbar",
              }}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1080: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                595: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
              }}
              className="nft-swiper"
              modules={[Scrollbar, Navigation]}
              navigation={{
                nextEl: ".nft-swiper-button-next",
                prevEl: ".nft-swiper-button-prev",
              }}
            >
              {nftList.map((nft, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div className="card-nftv" style={{ padding: "0px" }}>
                      <div
                        className="card-thumb"
                        style={{
                          backgroundImage: "url(" + nft.thumb + ")",
                        }}
                      >
                        {/* <div className="card-react cursor-pointer">
                          <BsHeart />
                        </div> */}
                      </div>
                      <div
                        className="card-info"
                        style={{ borderRadius: "8px" }}
                      >
                        <div>
                          <div
                            className="card-title"
                            style={{ width: "100px" }}
                          >
                            <a
                              href="#"
                              style={{
                                color: "white",
                                fontSize: "16px",
                              }}
                            >
                              {nft.title}
                            </a>
                          </div>
                          <div
                            className="card-price"
                            style={{
                              fontWeight: "200",
                            }}
                          >
                            Price : {nft.price}
                          </div>
                        </div>
                        {/* dev: Buy Now Button */}

                        <button
                          onClick={() => redirectToDashboard()}
                          className="btn btn-sm btn-primary-bg-custom"
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom,rgba(#02DB5B,0.02),rgba(#4977C1,0.02))",
                            color: "white",
                            fontSize: "12px",
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="slider-controls" style={{ marginTop: "96px" }}>
              <div className="d-flex gap-3 align-items-center justify-content-center">
                <div className="icon-square icon-md icon-circle icon-gradient cursor-pointer nft-swiper-button-prev">
                  <FaCaretLeft className="me-1" />
                </div>
                <div className="icon-square icon-md icon-circle icon-gradient cursor-pointer nft-swiper-button-next">
                  <FaCaretRight className="ms-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftSlider;
