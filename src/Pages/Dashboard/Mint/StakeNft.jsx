import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Mint from "./MintNft";
import { getTokensOfStaker, setClaimReward, setStakeNFT, setWithdrawNFT, getUnClaimableReward } from "../../../ContractAction/EVCNFTStakeContractAction";
import { getBalanceEVC } from "../../../ContractAction/EVCStakeContractAction";
import { getWalletOfOwner, getIsApprovedForAll, setNFTApprovalForAll } from "../../../ContractAction/EVCNFTContractAction";
import { useTranslation } from "react-i18next";
//dev: Staking Page
const Staking = ({ title }) => {
  const [mint, setMint] = useState(false);
  const [walletOwner, SetWalletOwner] = useState();
  const [stakeOfOwnerNFTIDs, setStakeOfOwnerNFTIDs] = useState();
  const [balanceEVC, setBalanceEVC] = useState();
  const [stakeNFT, setstakeNFT] = useState();
  const [unstakeNFT, setUnstakeNFT] = useState();
  const [claimableReward, setClaimableReward] = useState();
  const [isApproved, setApproved] = useState();
  const {t} = useTranslation();
  console.log("isApproved", isApproved);

  const Click = () => {
    setMint(true);
  };

  useEffect(() => {
    //dev: get UnClaimable Reward
    getUnClaimableReward();

    //dev: get NFT Staking Data
    const getNFTStakingData = async () => {
      const WalletOfOwner = await getWalletOfOwner();
      const StakeOfOwnerNFTIDs = await getTokensOfStaker();
      const BalanceEVC = await getBalanceEVC();
      const ClaimableNFTReward = await getUnClaimableReward();
      const approved = await getIsApprovedForAll();

      SetWalletOwner(WalletOfOwner);
      setStakeOfOwnerNFTIDs(StakeOfOwnerNFTIDs);
      setBalanceEVC(BalanceEVC);
      setClaimableReward(ClaimableNFTReward);
      setApproved(approved);
    };
    getNFTStakingData();
  }, []);

  const getApproved = async () => {
    setNFTApprovalForAll();
  };

  return (
    <>
      {mint ? (
        <Mint />
      ) : (
        <div className="dashboard-wrap">
          <Breadcrumb>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <Breadcrumb.Item active>{t("Stake")}</Breadcrumb.Item>
          </Breadcrumb>

          <div className="dash-content-area mt-1 mx-3">
            <div className="h1 font-gilroy fw-semibold mt-3 mb-4 pb-3">
              EVC NFT
              <span style={{ marginLeft: "40%", fontSize: 30 }}>
                <Link onClick={() => Click()}>Mint </Link>
                <Link to="#">Staking</Link>&nbsp;&nbsp;
              </span>
            </div>
            <div className="dash-global-wrap ">
              <h2 style={{ marginLeft: "40%" }}>Your tokens</h2>
              <div className="row g-1">
                <div className="col-md-6 col-xl-6">
                  <div className="dash-card style-3 position-relative">
                    <div
                      style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <h5 style={{ margin: "20px 130px", color: "#A5B6C3" }}>
                        Claimable Rewards
                      </h5>
                      <br></br>
                      <h2 style={{ margin: "10px 150px", fontWeight: "bold" }}>
                        {claimableReward} EVC
                      </h2>

                      <h3 style={{ marginLeft: 160, fontWeight: "bold" }}></h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-6">
                  <div className="dash-card style-4 position-relative">
                    <div
                      style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <h5
                        style={{
                          margin: "20px 130px",
                          marginLeft: 130,
                          color: "#A5B6C3",
                        }}
                      >
                        Current Balance
                      </h5>
                      <br></br>
                      <h2 style={{ margin: "10px 150px", fontWeight: "bold" }}>
                        {balanceEVC} EVC
                      </h2>

                      <h3 style={{ marginLeft: 160, fontWeight: "bold" }}></h3>
                    </div>
                  </div>
                </div>
              </div>
              {/* dev: Claim Rewards Button */}
              <Button
                variant="contained"
                style={{ marginLeft: "35%", width: "30%", height: "50px" }}
                onClick={() => setClaimReward()}
              >
                Claim Rewards
              </Button>
              <h2 style={{ marginTop: "2%", marginLeft: "40%" }}>Your NFTs</h2>
              <div className="row g-1" style={{ marginTop: "1%" }}>
                <div className="col-md-6 col-xl-6">
                  <div className="dash-card style-4 position-relative">
                    <div
                      style={{
                        border: "1px solid gray",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <h2
                        style={{
                          marginLeft: 20,
                          marginTop: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Your Staked NFTs
                      </h2>
                      <p
                        style={{
                          fontSize: "16px",
                          marginLeft: 20,
                          fontWeight: 200,
                        }}
                      >
                        {stakeOfOwnerNFTIDs === 0
                          ? "You don't have any NFT EVC NFT"
                          : stakeOfOwnerNFTIDs}
                      </p>
                    </div>
                  </div>
                  {isApproved === true ? (
                    <input
                      type="text"
                      value={stakeNFT}
                      onChange={(e) => setstakeNFT(e.target.value)}
                    />
                  ) : null}
                  {/* dev: Stake Button */}
                  {isApproved === true ? (
                    <Button
                      onClick={() => setStakeNFT(stakeNFT)}
                      variant="contained"
                    >
                      Stake
                    </Button>
                  ) : (
                    // dev: Approve Button
                    <Button onClick={() => getApproved()} variant="contained">
                      Approve
                    </Button>
                  )}
                </div>

                <div className="col-md-6 col-xl-6">
                  <div className="dash-card style-4 position-relative">
                    <div
                      style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <h2
                        style={{
                          marginLeft: 20,
                          marginTop: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Your Unstaked NFTs
                      </h2>
                      <p
                        style={{
                          fontSize: "16px",
                          marginLeft: 20,
                          fontWeight: 200,
                        }}
                      >
                        {walletOwner === 0
                          ? "You don't have any NFT EVC NFT"
                          : walletOwner}
                      </p>

                    </div>
                  </div>
                  <input
                    type="text"
                    style={{
                      backgroundColor: "black",
                      color: "gray",
                      marginLeft: "7%",
                      width: "20%",
                      height: "40px",
                      borderRadius: "10px",
                      border: "1px solid gray",
                    }}
                    value={unstakeNFT}
                    onChange={(e) => setUnstakeNFT(e.target.value)}
                  />
                  {/* dev: Unstake Button */}
                  <Button
                    onClick={() => setWithdrawNFT(unstakeNFT)}
                    variant="contained"
                    style={{
                      marginTop: "2%",
                      marginLeft: "7%",
                      width: "20%",
                      height: "40px",
                      borderRadius: "6px",
                      border: "none",
                    }}
                  >
                    Unstake
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Staking;