import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { ContractAddressTRNDToken } from "../../ContractAction/ContractDependency";
import { ReactComponent as IconCopy } from "../../assets/img/dashboard/icons/copy-icon.svg";
import { Link } from "react-router-dom";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col } from "react-bootstrap";
import { getMyReferrer } from "../../ContractAction/EVCNFTContractAction";
import RihgtImg from '../../assets/img/dashboard/img/Sponsor.png';
import CopyIcon from '../../assets/img/dashboard/img/copy-icon.svg';
import {
  APIUSEREFERRAL,
  APIDASHBOARDREF,
} from "../../ContractAction/ContractDependency";
import { useTranslation } from "react-i18next";

//dev: Postthe  data for API
const postData = () => {
  const affiliateaddress = window.localStorage.getItem("connectedAccount");
  const sponsoraddress = window.localStorage.getItem("sponsorAddress");
  console.log("sponsoraddress: ", sponsoraddress);
  const data = {
    affiliateaddress: affiliateaddress,
    sponsoraddress: sponsoraddress,
  };

  //dev: Fetch the API Data
  fetch(`${APIUSEREFERRAL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((result) => {
      console.log("result....", result);
      return result.json();
    })
    .catch((err) => console.log(err));
};

const ReferralLink = ({ title }) => {
  const [myreferrer, setMyReferrer] = useState();
  useEffect(() => {
    const getData = async () => {
      let referrerInfo = await getMyReferrer();
      setMyReferrer(referrerInfo);
    };
    getData();
  }, []);
  console.log("myreferrer", myreferrer);

  const text = `${APIDASHBOARDREF}`;

  const affiliateaddress = window.localStorage.getItem("connectedAccount");
  const sponsoraddress = window.localStorage.getItem("sponsorAddress");

  postData();

  //dev: Copy text
  const handleCopy = (text) => {
    navigator.clipboard.writeText(`${text}${affiliateaddress}`);
    toast.success("Copied!", { autoClose: 1000 });
  };

  useEffect(() => {
    document.title = title ? title : "TT Avatars | Referral Link";
    document.querySelector(".page-title").innerText = "Referral Link";
  }, []);

  console.log("add", affiliateaddress);
  const { t } = useTranslation();
  return (
    <div className="dashboard-wrap">

      <div className="row justify-contnet-center">
        <div className="col-12">

          <div className="dash-content-area-shree">
            <div class="dash-token-wrap d-flex justify-content-between g-4">
              <div className="dash-content-wrap-inner w-100">
                <p class="evc-title copy-title">
                  {t("Sponsor Address")} :{" "}
                </p>
                <div className="sponsor-token d-inline-flex align-items-center">
                  <div className="token-address" >
                    CA: 0x0000000000000000000000000000000000000000
                    {/* NOTE: update the address with latest one */}
                  </div>
                  <div className="cursor-pointer">
                    <IconCopy onClick={() => handleCopy(`${ContractAddressTRNDToken}`)} />
                  </div>
                </div>
                <div>
                  <Link class="stake-txt">
                    {myreferrer != "0x0000000000000000000000000000000000000000"
                      ? myreferrer
                      : sponsoraddress}
                  </Link>
                </div>

                {/*dev:Show the  Reference Address */}
                <div className="pt-4">
                  <p class="evc-title copy-title">
                    {" "}
                    {t("Referral Address")}:{" "}
                  </p>
                  <div className="copy-link">
                    <Link class="stake-txt">
                      {APIDASHBOARDREF}
                      {affiliateaddress}
                    </Link>
                  </div>
                  <div
                    style={{ display: "inline-block" }}
                    onClick={() => handleCopy(text)}
                  >
                    <button className="btn btn-primary-bg-custom copy-button">
                      {
                        <img src={CopyIcon} alt="" style={{ marginRight: "8px" }} />
                      }
                      {t("Copy")}
                    </button>

                  </div>
                </div>
              </div>
              <div className="dash-right-img">
                <img src={RihgtImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="greadient-border"></div>
    </div>
  );
};

export default ReferralLink;
