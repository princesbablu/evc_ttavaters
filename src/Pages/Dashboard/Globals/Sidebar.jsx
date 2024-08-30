import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { ReactComponent as Sidebar1 } from "../../../assets/img/dashboard/icons/sidebar-1.svg";
import { ReactComponent as Sidebar2 } from "../../../assets/img/dashboard/icons/sidebar-2.svg";
import { ReactComponent as Sidebar3 } from "../../../assets/img/dashboard/icons/sidebar-3.svg";
import { ReactComponent as Sidebar4 } from "../../../assets/img/dashboard/icons/sidebar-4.svg";
import { ReactComponent as Sidebar5 } from "../../../assets/img/dashboard/icons/sidebar-5.svg";
import { ReactComponent as Sidebar6 } from "../../../assets/img/dashboard/icons/sidebar-6.svg";
import { ReactComponent as Sidebar7 } from "../../../assets/img/dashboard/icons/sidebar-7.svg";
import { ReactComponent as Sidebar8 } from "../../../assets/img/dashboard/icons/sidebar-8.svg";
import { ReactComponent as Sidebar9 } from "../../../assets/img/dashboard/icons/sidebar-9.svg";
import { ReactComponent as Sidebar10 } from "../../../assets/img/dashboard/icons/sidebar-10.svg";
import { ReactComponent as Sidebar11 } from "../../../assets/img/dashboard/icons/sidebar-11.svg";
import { ReactComponent as Sidebar12 } from "../../../assets/img/dashboard/icons/sidebar-12.svg";
import { ReactComponent as Sidebar13 } from "../../../assets/img/icons/reflinkicon.svg";
import { ReactComponent as Sidebar14 } from "../../../assets/img/icons/avatminericon.svg";
import { NavLink, Navigate } from "react-router-dom";
import { ReactComponent as EvcIcon } from "../../../assets/img/dashboard/icons/evc-icon.svg";
import { useTranslation } from "react-i18next";
import {
  FaUserCircle,
  FaTwitter,
  FaPaperPlane,
  FaDiscord,
  FaFacebookF,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

import NavDropdown from "react-bootstrap/NavDropdown";

import twiterbw from "../../../assets/img/icons/twitter.png";
import instabw from "../../../assets/img/icons/instagram.png";
import gitbw from "../../../assets/img/icons/github.png";
import tiktokbw from "../../../assets/img/icons/tiktok.png";
import telebw from "../../../assets/img/icons/telegram.png";
import useMediaQuery from "@mui/material/useMediaQuery";

// import { getBalanceOfPreSale } from "../../../ContractAction/PreSaleContractAction"; //cmnt
//dev: Start Sidebar Component
const Sidebar = ({ sideToggle, setSideToggle, presaleBalanceOf }) => {
  // const refresh = () => window.location.reload(true)
  const [preevc, setPreev] = useState();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width:991px)");

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
  useEffect(() => {
    const getData = async () => {
      // let Preevc = await getBalanceOfPreSale(); //cmnt
      // setPreev(Preevc); //cmnt
    };
    getData();
  }, []);
  const newAddress = window.localStorage.getItem("connectedAccount");

  if (newAddress === null) {
    return <Navigate to="/" />;
  }

  const social = [
    {
      name: 'Twitter',
      icon: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3528_851)">
              <path d="M4.19727 3.33398L13.9748 16.6673H17.5306L7.7531 3.33398H4.19727Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.19727 16.6673L9.83727 11.0273M11.8873 8.97732L17.5306 3.33398" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_3528_851">
              <rect width="20" height="20" fill="white" transform="translate(0.864258)"/>
              </clipPath>
              </defs>
            </svg>`,
      url: 'https://twitter.com/TTAvatars',
    },
    {
      name: 'Telegram',
      icon: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3528_862)">
              <path d="M13.3643 8.33398L10.0309 11.6673L15.0309 16.6673L18.3643 3.33398L3.36426 9.16732L6.69759 10.834L8.36426 15.834L10.8643 12.5007" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_3528_862">
              <rect width="20" height="20" fill="white" transform="translate(0.864258)"/>
              </clipPath>
              </defs>
            </svg>`,
      url: 'https://t.me/trendavatars',
    },
    {
      name: 'Youtube',
      icon: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3528_872)">
              <path d="M2.53125 6.66732C2.53125 5.78326 2.88244 4.93542 3.50756 4.31029C4.13268 3.68517 4.98053 3.33398 5.86458 3.33398H15.8646C16.7486 3.33398 17.5965 3.68517 18.2216 4.31029C18.8467 4.93542 19.1979 5.78326 19.1979 6.66732V13.334C19.1979 14.218 18.8467 15.0659 18.2216 15.691C17.5965 16.3161 16.7486 16.6673 15.8646 16.6673H5.86458C4.98053 16.6673 4.13268 16.3161 3.50756 15.691C2.88244 15.0659 2.53125 14.218 2.53125 13.334V6.66732Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.19727 7.5L13.3639 10L9.19727 12.5V7.5Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_3528_872">
              <rect width="20" height="20" fill="white" transform="translate(0.864258)"/>
              </clipPath>
              </defs>
            </svg>`,
      url: '',
    },
  ]

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setSideToggle(false);
      }}
    >
      <div
        className={`d-flex flex-column overflow-auto cbd-sidebar${sideToggle ? " show" : ""}`}
      >
        <div className="d-flex d-sm-none gap-3 flex-column mb-2 p-3 border-bottom">
          <div className="d-flex align-items-center gap-3 d-sm-none">
            <div className="cursor-pointer icon-square icon-circle icon-user p-2">
              <FaUserCircle />
            </div>
            <div>
              <div className="text-uppercase text-sm opacity-75">HOLDER</div>
              <div>18,751</div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3 d-sm-none">
            <div className="cursor-pointer icon-square icon-circle bg-gradient">
              <EvcIcon />
            </div>
            <div>
              <div className="text-uppercase text-sm opacity-75">
                TRND TOKEN
              </div>
              <div>8,967,00</div>
            </div>
          </div>
        </div>

        <ul className="sidebar-list">
          {isMobile && (
            <div style={{ padding: "10px 20px" }}>
              <NavDropdown
                title={selectedLanguage.name}
                id="navbarScrollingDropdown"
                onSelect={handleSelect}
                style={{ fontSize: "25px" }}
              >
                {languages.map((lang) => (
                  <NavDropdown.Item key={lang.code} eventKey={lang.code}>
                    {lang.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
          )}
          <span className="sidebar-meta">Menu</span>
          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/main"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3528_723)">
                    <path d="M4.19727 3.33398H9.19727V10.0007H4.19727V3.33398Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.19727 13.334H9.19727V16.6673H4.19727V13.334Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.5312 10H17.5312V16.6667H12.5312V10Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.5312 3.33398H17.5312V6.66732H12.5312V3.33398Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3528_723">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Dashboard")}
              </span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/tt-avatars"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3528_736)">
                    <path d="M6.13952 6.66602H15.5887C15.829 6.66599 16.0665 6.71792 16.2848 6.81827C16.5032 6.91861 16.6972 7.06498 16.8537 7.24735C17.0102 7.42972 17.1254 7.64378 17.1914 7.87484C17.2574 8.1059 17.2727 8.3485 17.2362 8.58602L16.1904 15.3793C16.0996 15.9697 15.8004 16.5081 15.347 16.8969C14.8936 17.2858 14.316 17.4995 13.7187 17.4993H8.00869C7.41152 17.4993 6.83409 17.2855 6.38088 16.8967C5.92767 16.5078 5.62863 15.9696 5.53786 15.3793L4.49202 8.58602C4.4555 8.3485 4.47076 8.1059 4.53678 7.87484C4.60279 7.64378 4.71799 7.42972 4.87448 7.24735C5.03096 7.06498 5.22504 6.91861 5.44339 6.81827C5.66175 6.71792 5.89922 6.66599 6.13952 6.66602Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8.36426 9.16667V5C8.36426 4.33696 8.62765 3.70107 9.09649 3.23223C9.56533 2.76339 10.2012 2.5 10.8643 2.5C11.5273 2.5 12.1632 2.76339 12.632 3.23223C13.1009 3.70107 13.3643 4.33696 13.3643 5V9.16667" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3528_736">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Buy TT Avatars")}
              </span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/myavatars"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3528_747)">
                    <path d="M7.53125 5.83333C7.53125 6.71739 7.88244 7.56524 8.50756 8.19036C9.13268 8.81548 9.98053 9.16667 10.8646 9.16667C11.7486 9.16667 12.5965 8.81548 13.2216 8.19036C13.8467 7.56524 14.1979 6.71739 14.1979 5.83333C14.1979 4.94928 13.8467 4.10143 13.2216 3.47631C12.5965 2.85119 11.7486 2.5 10.8646 2.5C9.98053 2.5 9.13268 2.85119 8.50756 3.47631C7.88244 4.10143 7.53125 4.94928 7.53125 5.83333Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.86426 17.5V15.8333C5.86426 14.9493 6.21545 14.1014 6.84057 13.4763C7.46569 12.8512 8.31354 12.5 9.19759 12.5H12.5309C13.415 12.5 14.2628 12.8512 14.8879 13.4763C15.5131 14.1014 15.8643 14.9493 15.8643 15.8333V17.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3528_747">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {" "}
                {t("Avatars")}
              </span>
            </NavLink>
          </li>

          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/avatar-mining-reward"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3906_762)">
                    <path d="M5.86426 7.5C5.86426 8.82608 6.39104 10.0979 7.32872 11.0355C8.26641 11.9732 9.53818 12.5 10.8643 12.5C12.1903 12.5 13.4621 11.9732 14.3998 11.0355C15.3375 10.0979 15.8643 8.82608 15.8643 7.5C15.8643 6.17392 15.3375 4.90215 14.3998 3.96447C13.4621 3.02678 12.1903 2.5 10.8643 2.5C9.53818 2.5 8.26641 3.02678 7.32872 3.96447C6.39104 4.90215 5.86426 6.17392 5.86426 7.5Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.8643 12.5L13.6976 17.4083L15.0293 14.7142L18.0276 14.9075L15.1943 10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.53255 10L3.69922 14.9083L6.69755 14.7142L8.02922 17.4075L10.8626 12.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3906_762">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Avatars Minting")}
              </span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/swap"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3528_770)">
                    <path d="M6.69727 8.33333H18.3639L15.0306 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.0309 11.666H3.36426L6.69759 14.9993" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3528_770">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Swap")}
              </span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/rank-bonus"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3528_781)">
                    <path d="M7.53125 5.83333C7.53125 6.71739 7.88244 7.56524 8.50756 8.19036C9.13268 8.81548 9.98053 9.16667 10.8646 9.16667C11.7486 9.16667 12.5965 8.81548 13.2216 8.19036C13.8467 7.56524 14.1979 6.71739 14.1979 5.83333C14.1979 4.94928 13.8467 4.10143 13.2216 3.47631C12.5965 2.85119 11.7486 2.5 10.8646 2.5C9.98053 2.5 9.13268 2.85119 8.50756 3.47631C7.88244 4.10143 7.53125 4.94928 7.53125 5.83333Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.86426 17.5V15.8333C5.86426 14.9493 6.21545 14.1014 6.84057 13.4763C7.46569 12.8512 8.31354 12.5 9.19759 12.5H9.61426" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.6978 17.3472L13.8878 18.2956C13.8341 18.3235 13.7736 18.336 13.7133 18.3316C13.6529 18.3272 13.5949 18.3061 13.5458 18.2707C13.4967 18.2352 13.4584 18.1868 13.4352 18.1309C13.412 18.075 13.4048 18.0137 13.4145 17.9539L13.7603 15.9447L12.2961 14.5222C12.2524 14.48 12.2215 14.4263 12.2068 14.3673C12.1922 14.3083 12.1944 14.2464 12.2133 14.1886C12.2321 14.1308 12.2668 14.0795 12.3135 14.0405C12.3601 14.0015 12.4167 13.9764 12.477 13.9681L14.5003 13.6747L15.4053 11.8472C15.4324 11.7928 15.4741 11.747 15.5257 11.715C15.5774 11.683 15.637 11.666 15.6978 11.666C15.7586 11.666 15.8182 11.683 15.8698 11.715C15.9215 11.747 15.9632 11.7928 15.9903 11.8472L16.8953 13.6747L18.9186 13.9681C18.9787 13.9767 19.0351 14.002 19.0815 14.041C19.1279 14.08 19.1625 14.1313 19.1813 14.1889C19.2001 14.2466 19.2024 14.3084 19.188 14.3673C19.1735 14.4262 19.1428 14.4799 19.0995 14.5222L17.6353 15.9447L17.9803 17.9531C17.9906 18.013 17.984 18.0745 17.9611 18.1309C17.9382 18.1872 17.9 18.2359 17.8508 18.2716C17.8016 18.3072 17.7433 18.3284 17.6827 18.3326C17.6221 18.3369 17.5615 18.324 17.5078 18.2956L15.6978 17.3472Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3528_781">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Rank Bonus")}
              </span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/team-statistics"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.36426 6H5.11426L6.36426 1L9.69759 11L11.3643 3.5L12.6143 6H16.3643" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Team Statistics")}
              </span>
            </NavLink>
          </li>
          {/* <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/staking"
              className={({ isActive }) => (isActive ? "active-dash" : undefined)}
            >
              <div className="icon">
                <Sidebar4 />
              </div>
              <span>Staking</span>
            </NavLink>
          </li>*/}

          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/token-details"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3528_803)">
                    <path d="M11.6973 4.16602H18.3639" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.6973 7.5H15.8639" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.6973 12.5H18.3639" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.6973 15.834H15.8639" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.36426 4.16732C3.36426 3.9463 3.45206 3.73434 3.60834 3.57806C3.76462 3.42178 3.97658 3.33398 4.19759 3.33398H7.53092C7.75194 3.33398 7.9639 3.42178 8.12018 3.57806C8.27646 3.73434 8.36426 3.9463 8.36426 4.16732V7.50065C8.36426 7.72166 8.27646 7.93363 8.12018 8.08991C7.9639 8.24619 7.75194 8.33398 7.53092 8.33398H4.19759C3.97658 8.33398 3.76462 8.24619 3.60834 8.08991C3.45206 7.93363 3.36426 7.72166 3.36426 7.50065V4.16732Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.36426 12.4993C3.36426 12.2783 3.45206 12.0664 3.60834 11.9101C3.76462 11.7538 3.97658 11.666 4.19759 11.666H7.53092C7.75194 11.666 7.9639 11.7538 8.12018 11.9101C8.27646 12.0664 8.36426 12.2783 8.36426 12.4993V15.8327C8.36426 16.0537 8.27646 16.2657 8.12018 16.4219C7.9639 16.5782 7.75194 16.666 7.53092 16.666H4.19759C3.97658 16.666 3.76462 16.5782 3.60834 16.4219C3.45206 16.2657 3.36426 16.0537 3.36426 15.8327V12.4993Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3528_803">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Token Details")}
              </span>
            </NavLink>
          </li>
          {/* <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/buy-burn"
              className={({ isActive }) => (isActive ? "active-dash" : undefined)}
            >
              <div className="icon">
                <Sidebar8 />
              </div>
              <span className="sidebar-span" style={{fontSize:"14px", color:"#9B9797"}}>Buy & Burn</span>
            </NavLink>
          </li> */}
          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/tred-products"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3528_818)">
                    <path d="M3.36426 7.49935C3.36426 7.27834 3.45206 7.06637 3.60834 6.91009C3.76462 6.75381 3.97658 6.66602 4.19759 6.66602H17.5309C17.7519 6.66602 17.9639 6.75381 18.1202 6.91009C18.2765 7.06637 18.3643 7.27834 18.3643 7.49935V9.16602C18.3643 9.38703 18.2765 9.59899 18.1202 9.75527C17.9639 9.91155 17.7519 9.99935 17.5309 9.99935H4.19759C3.97658 9.99935 3.76462 9.91155 3.60834 9.75527C3.45206 9.59899 3.36426 9.38703 3.36426 9.16602V7.49935Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.8643 6.66602V17.4993" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16.6979 10V15.8333C16.6979 16.2754 16.5223 16.6993 16.2098 17.0118C15.8972 17.3244 15.4733 17.5 15.0313 17.5H6.69792C6.25589 17.5 5.83197 17.3244 5.51941 17.0118C5.20684 16.6993 5.03125 16.2754 5.03125 15.8333V10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.11458 6.66703C6.56205 6.66703 6.03215 6.44754 5.64144 6.05684C5.25074 5.66614 5.03125 5.13623 5.03125 4.5837C5.03125 4.03116 5.25074 3.50126 5.64144 3.11056C6.03215 2.71986 6.56205 2.50036 7.11458 2.50036C7.91849 2.48636 8.70627 2.87641 9.3752 3.61966C10.0441 4.36292 10.5631 5.42487 10.8646 6.66703C11.166 5.42487 11.685 4.36292 12.354 3.61966C13.0229 2.87641 13.8107 2.48636 14.6146 2.50036C15.1671 2.50036 15.697 2.71986 16.0877 3.11056C16.4784 3.50126 16.6979 4.03116 16.6979 4.5837C16.6979 5.13623 16.4784 5.66614 16.0877 6.05684C15.697 6.44754 15.1671 6.66703 14.6146 6.66703" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3528_818">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Trend Products")}
              </span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              setSideToggle(false);
            }}
          >
            <NavLink
              to="/dashboard/referralLink"
              className={({ isActive }) =>
                isActive ? "active-dash" : undefined
              }
            >
              <div className="icon">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3528_831)">
                    <path d="M7.53125 5.83333C7.53125 6.71739 7.88244 7.56524 8.50756 8.19036C9.13268 8.81548 9.98053 9.16667 10.8646 9.16667C11.7486 9.16667 12.5965 8.81548 13.2216 8.19036C13.8467 7.56524 14.1979 6.71739 14.1979 5.83333C14.1979 4.94928 13.8467 4.10143 13.2216 3.47631C12.5965 2.85119 11.7486 2.5 10.8646 2.5C9.98053 2.5 9.13268 2.85119 8.50756 3.47631C7.88244 4.10143 7.53125 4.94928 7.53125 5.83333Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.86426 17.5V15.8333C5.86426 14.9493 6.21545 14.1014 6.84057 13.4763C7.46569 12.8512 8.31354 12.5 9.19759 12.5H11.6976" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.1973 18.3327L18.3639 14.166" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.3643 17.916V14.166H14.6143" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3528_831">
                      <rect width="20" height="20" fill="white" transform="translate(0.864258)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span
                className="sidebar-span"

              >
                {t("Referral Link")}
              </span>
            </NavLink>
          </li>

          {preevc > 0 && (
            <li
              onClick={() => {
                setSideToggle(false);
              }}
            >
              <NavLink
                to="/dashboard/Presale"
                className={({ isActive }) =>
                  isActive ? "active-dash" : undefined
                }
              >
                <div className="icon">
                  <Sidebar11 />
                </div>
                <span
                  className="li-my-1"

                >
                  Presale
                </span>
              </NavLink>
            </li>
          )}
          {preevc > 0 && (
            <li
              onClick={() => {
                setSideToggle(false);
              }}
            >
              <NavLink
                to="/dashboard/Redeem"
                className={({ isActive }) =>
                  isActive ? "active-dash" : undefined
                }
              >
                <div className="icon">
                  <Sidebar10 />
                </div>
                <span
                  className="sidebar-span"

                >
                  Redeem
                </span>
              </NavLink>
            </li>
          )}
          {preevc > 0 && (
            <li
              onClick={() => {
                setSideToggle(false);
              }}
            >
              <NavLink
                to="/dashboard/vesting"
                className={({ isActive }) =>
                  isActive ? "active-dash" : undefined
                }
              >
                <div className="icon">
                  <Sidebar9 />
                </div>
                <span
                  className="sidebar-span"

                >
                  Vesting
                </span>
              </NavLink>
            </li>
          )}
        </ul>
        <div className="pt-3 mt-auto">
          <p className="sidebar-meta">Socials</p>
          <ul className="sidebar-social list-unstyled">
            {social.map((item, index) => (
              <li key={index} className="d-block">
                <a
                  className="d-flex align-items-center gap-2"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer" >
                  <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                  <span className="text-capitalize d-block ms-1">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Sidebar;
