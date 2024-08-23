import React from 'react'
import LazyLoadImage from '../../Components/Global/LazyImage';
import logo from '../../assets/img/logo-lg.png';
import { Link } from 'react-scroll'
import { useTranslation } from "react-i18next";

//dev: Footer Component
const Footer = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="theme-footer position-relative" style={{width:"100vw"}}>

            {/*dev: FOOTER TOP */}
            <div className="footer-top">
                <div className="container">
                    <div className="d-flex align-items-center flex-column">
                        <div className="footer-logo mb-2">
                            {/*dev: Footer Logo */}
                            <a href="#"><LazyLoadImage src={logo} /></a>
                        </div>
                        <div className="text-center h2 lh-base fw-bold col-lg-6 mb-4 font-gilroy w-100" style={{fontSize:"64px",fontWeight:"700"}}>
                       {t("Our all-in-one AI powered platform")}
                        </div>
                        {/* <div className="d-flex gap-4 flex-wrap align-items-center justify-content-center font-gilroy">
                            <Link activeClass="active" to="home" spy={true} smooth={true} offset={50} duration={500}>Home</Link>
                            <a href="#About" className="link-light">About</a>
                            <a href="#Products" className="link-light">Products</a>
                            <a href="#tok" className="link-light">Tokenomics</a>
                            <a href="#how" className="link-light">How It Works</a>
                        </div> */}
                    </div>
                </div>
            </div>

            {/*dev: FOOTER BOTTOM */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-4">
                                <a href="#" style={{color:"#4E8664",fontWeight:"500",fontSize:"20px"}}>{t("Terms of Service")}</a>
                                <a href="#"  style={{color:"#4E8664",fontWeight:"500",fontSize:"20px"}}>{t("Privacy Policy")}</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex flex-wrap justify-content-lg-end align-items-center gap-4">
                                <div className="copyright-text text-center text-lg-end mt-4 mt-lg-0 w-100"  style={{color:"#4E8664"}}>
                                   {t("© 2024 TT Avatar's Marketplace, All right Reserved")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Footer