// COMPONENTS
import React from "react";
import SectionTitle from "../../Components/Single/SectionTitle";
import { FaPlay, FaInstagram, FaTwitter } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Ratio from "react-bootstrap/Ratio";
import twitterlogo from "../../assets/img/icons/twitterlogo.png";
import instalogo from "../../assets/img/icons/instalogo.png";
// ASSETS
import telecolor from "../../assets/img/icons/telecolor.png";
import heroImage from "../../assets/img/regular/hero.png";
import { ReactComponent as HeroVectorLeft } from "../../assets/img/vectors/hero-left-blur.svg";
import { ReactComponent as HeroVectorRight } from "../../assets/img/vectors/hero-right-blur.svg";
import LazyLoadImage from "../../Components/Global/LazyImage";
import herobtn from "../../assets/img/icons/herobtnbg.png";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Typography } from "@mui/material";

function VideoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Ratio aspectRatio={"16x9"}>
          <iframe
            width="1280"
            height="720"
            src="https://player.vimeo.com/video/953129993"
            title="Elementor video placeholder"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Ratio>
      </Modal.Body>
    </Modal>
  );
}

const Hero = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const theme = useTheme();

  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width:991px)");
  let content = isMobile ? "mobile" : "desktop";
  console.log("md", isMobile);
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      gap: "10px", // Space between buttons
      flexWrap: isMobile ? "wrap" : "nowrap", // Add flexWrap here
    },
    socialButton: {
      display: "flex",
      gap: "0px 10px",
      width: "391px",
      height: "64px",
      border: "1px solid rgb(37, 169, 142)",
      borderRadius: "8px",
      background: "rgba(0,0,0,0.7)",
      fontSize: "22px",
      color: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
      width: "100%",
      padding: "10px, 20px, 10px, 20px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: isMobile ? "36px" : "initial",
    },
    icon: {
      height: isMobile ? "50px" : "20px",
      width: isMobile ? "50px" : "20px",
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <VideoModal show={modalShow} onHide={() => setModalShow(false)} />

      {/* <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative z-1 theme-hero custom-height "> */}
      <div className="d-flex align-items-center justify-content-center position-relative z-1 theme-hero custom-height">
        <div className="container-hero">
          <div className="row ms-4">
            <div className="col-lg-4 col-xl-6 order-lg-2">
              <div
                className="image-video-layer mb-5 mb-lg-0 col-10 col-md-8 col-lg-12 mx-auto"
                onClick={() => setModalShow(true)}
              >
                <div
                  className="icon"
                  style={{ backgroundColor: "transparent" }}
                >
                  <img
                    src={herobtn}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                </div>
                <LazyLoadImage
                  src={heroImage}
                  height={"435px"}
                  maxWidth={"450px"}
                  width={"100%"}
                />
              </div>
            </div>
            <div className="col-lg-8 col-xl-6 order-lg-1">
              <Box
                className="font-gilroy"
                marginTop={isMobile ? "20px" : "30px"}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  fontSize={isMobile ? "96px" : "66px"}
                  marginBottom="10px"
                  fontWeight={700}
                >
                  {t("Our all-in-one AI")} <br /> {t("powered platform")}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  fontSize={isMobile ? "38px" : "28px"}
                >
                  {t(
                    "Helps you effortlessly create websites and tokens, turning your vision into life and introducing it to the world in no time."
                  )}
                </Typography>
              </Box>
              <div
                style={{
                  color: "#818181",
                  fontSize: isMobile ? "30px" : "18px",
                  marginTop: "42px",
                }}
              >
                {t(
                  "Easily turn your cryptocurrency ideas into reality and launch your very own token project quickly with Trendpad!"
                )}
              </div>
              <div className="mt-4" style={styles.container}>
                <div
                  className="social-buttons"
                  onClick={() => openLink("https://twitter.com/TTAvatars")}
                  style={styles.socialButton}
                >
                  <a href="#" style={styles.link}>
                    {t("Join our Twitter")}
                  </a>
                  <img src={twitterlogo} style={styles.icon} />
                </div>

                <div
                  className="social-buttons"
                  onClick={() => openLink("https://t.me/trendavatars")}
                  style={styles.socialButton}
                >
                  <a href="#" style={styles.link}>
                    {t("Join our Telegram")}
                  </a>
                  <img src={telecolor} style={styles.icon} />
                </div>

                <style jsx>{`
                  @media (max-width: 991px) {
                    .social-buttons {
                      flex-direction: column;
                      flex-wrap: wrap;
                      width: 100%;
                     
                    }

                    .social-buttons a {
                    }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
