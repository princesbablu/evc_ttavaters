import React, { useState } from "react";
import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaPaperPlane,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import SectionTitle from "../../Components/Single/SectionTitle";
import { ReactComponent as HeroVectorLeft } from "../../assets/img/vectors/social-mid-blur.svg";
import { ReactComponent as HeroVectorRight } from "../../assets/img/vectors/social-right-blur.svg";
import socialVector from "../../assets/img/regular/social.png";
import LazyLoadImage from "../../Components/Global/LazyImage";
import social from "../../assets/img/regular/Joinussocials.svg";
import twiterbw from "../../assets/img/icons/twiterbw.png";
import instabw from "../../assets/img/icons/instabw.png";
import gitbw from "../../assets/img/icons/gitbw.png";
import tiktokbw from "../../assets/img/icons/tiktokbw.png";
import twitercolor from "../../assets/img/icons/twittercolor.png";
import instacolor from "../../assets/img/icons/instacolor.png";
import gitcolor from "../../assets/img/icons/gitcolor.png";
import tiktokcolor from "../../assets/img/icons/tiktolcolor.png";
import telebw from "../../assets/img/icons/telegrambw.png";
import telecolor from "../../assets/img/icons/telecolor.png";
import youtube from "../../assets/img/icons/fa_youtube-play.png";
import youtube1 from "../../assets/img/icons/logos_youtube-icon.png";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
//dev: Social Information
const socialInfo = [
  {
    network: "Twitter",
    blackAndWhite: twiterbw,
    colorImage: twitercolor,
    url: "#",
  },
  {
    network: "Telegram",
    blackAndWhite: telebw,
    colorImage: telecolor,
    url: "#",
  },
  {
    network: "Youtube",
    blackAndWhite: youtube,
    colorImage: youtube1,
    url: "https://www.youtube.com/@TTAvatars",
  },
];

//dev:Start Social Page
const Socials = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width:991px)");

  const handleMouseEnter = (network) => {
    setHoveredIcon(network);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <div
      className="section-gap section-gap-social position-relative z-1 overflow-hidden"
      style={{
        backgroundImage: `url(${social})`,
      }}
    >
      <div className="position-absolute bottom-0 start-50 translate-middle-x z-n1 w-100 d-flex align-items-center justify-content-center">
        <LazyLoadImage src={socialVector} alt="" />
      </div>
      <div className="container">
        <SectionTitle
          main={t("JOIN OUR OFFICIAL SOCIAL")}
          main1={t("AND MEDIA CHANNELS")}
          className="text-center"
        />
      </div>
      <div className="container">
        <div className="row justify-content-center g-32">
          {socialInfo.map((el, i) => (
            <div className="col-sm-12 col-md-12 col-lg-3 col-xl-2" key={i}>
              <div
                className={
                  isMobile
                    ? "card-social justify-content-around"
                    : "card-social"
                }
                onMouseEnter={() => handleMouseEnter(el.network)}
                onMouseLeave={handleMouseLeave}
              >
                <div>
                  <div className="card-title font-gilroy">{t(el.network)}</div>
                </div>
                <a href={el.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={
                      hoveredIcon === el.network
                        ? el.colorImage
                        : el.blackAndWhite
                    }
                    className="icon-square icon-circle icon-social"
                    alt={el.network}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Socials;
