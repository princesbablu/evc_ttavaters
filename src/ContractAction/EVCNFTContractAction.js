import Web3 from "web3";
import { abiEVCNFT } from "./ABI/EVCNFT";
import { getBlankTokenIdPendingRewards } from "./EVCBlankNFTContractAction";
import { RPCURL, APINOTIFICATIONS, APICHECKREFERRER, APISTORETEAMSTATISTICS, APISWAPTRADEHISTORY, APIDIRECTDETAILTEAMSTATISTICS, APINFTMINT, APITEAMSTATISTICS, APIUSERRANKBONUSES, APIUSERRANK, APIUSERJOINEDDETAILS, APIJOINEDPARTNERS, APIDIRECTTEAMSTATISTICS, CurrentChainID, ContractAddressTTAVATARS, ContractAddressTTAVATARSSTAKE, detectCurrentProvider } from "./ContractDependency.js";
import { ethers } from "ethers";

/*global BigInt*/

var web3 = new Web3(new Web3.providers.HttpProvider(RPCURL));



var walletDataOnly = null;
var walletprovider = null;
export const fetchDataContext = async (wallet, provider) => {
  walletDataOnly = await wallet;
  walletprovider = await provider;
  console.log("SayyedWalletData", walletprovider);
}


//dev: NFT
// export const setMintNft = async (_level) => {
//   //const { wallet, provider } = useWeb3Onboard();

//   if (walletDataOnly && walletprovider) {
//     const signer = await walletprovider.getSigner();
//     console.log("signer2809", signer);
//     const account = await signer.getAddress();
//     console.log("account2809", account);

//     const currentChainId = (await walletprovider.getNetwork()).chainId;
//     // if (currentChainId !== CurrentChainID) {
//     //   await walletDataOnly.provider.request({
//     //     method: "wallet_switchEthereumChain",
//     //     params: [{ chainId: ethers.utils.hexlify(CurrentChainID) }],
//     //   });
//     // }
//     if (currentChainId !== CurrentChainID) {
//       await walletprovider.send("wallet_switchEthereumChain", [{ chainId: ethers.utils.hexValue(CurrentChainID) }]);
//     }

//     const contract = new ethers.Contract(ContractAddressTTAVATARS, abiEVCNFT, signer);
//     console.log(contract);

//     const evcNFTcost = await contract.getTrendAvatarsPrice(_level);
//     let evcNFTCost = evcNFTcost.toString();
//     console.log("evcNFTcost", evcNFTCost);

//     let evcCostPer = ethers.BigNumber.from(evcNFTCost).add(ethers.BigNumber.from(evcNFTCost).mul(10).div(100));
//     console.log("evcCostPer", evcCostPer);

//     let evccost = evcCostPer.toString();
//     console.log("evccost", evccost);

//     let referrerAddress = await getMyReferrer();
//     console.log("referrerAddress", referrerAddress);

//     let sponsorAddress = referrerAddress !== "0x0000000000000000000000000000000000000000" ?
//       referrerAddress : window.localStorage.getItem("sponsorAddress") != null ?
//         window.localStorage.getItem("sponsorAddress") : "0x0000000000000000000000000000000000000000";

//     console.log("referrallink", typeof window.localStorage.getItem("sponsorAddress"));
//     console.log("sponsorAddress", sponsorAddress);
//     console.log("_level", _level);

//     try {
//       const rankBonusData = await getUserRankBonuses();
//       console.log("rankBonusData", rankBonusData);

//       let sponsorAddresses, bonusPercentages;
//       if (rankBonusData && rankBonusData.sponsorAddresses && rankBonusData.bonusPercentages) {
//         sponsorAddresses = rankBonusData.sponsorAddresses;
//         bonusPercentages = rankBonusData.bonusPercentages;
//       } else {
//         sponsorAddresses = ["0x0000000000000000000000000000000000000000"];
//         bonusPercentages = [0];
//         console.log("Default values assigned for sponsorAddresses and bonusPercentages.");
//       }
//       console.log("sponsorAddresses", sponsorAddresses);
//       console.log("bonusPercentages", bonusPercentages);

//       const gasLimit = await contract.estimateGas.mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages);
//       console.log("gasLimit", gasLimit);
//       const gasPrice = await walletprovider.getGasPrice();

//       const mintNft = await contract.mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages, {
//         gasLimit: gasLimit,
//         gasPrice: gasPrice
//       });
//       console.log("mintNft", mintNft);

//       let evcNFTCostinEth = evcNFTCost / 10 ** 6;

//       const requestBody = {
//         useraddress: account.toLowerCase(),
//         level: _level,
//         mintprice: evcNFTCostinEth,
//         referreraddress: sponsorAddress.toLowerCase()
//       };

//       const apiResponse = await fetch(APINFTMINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });
//       const responseData = await apiResponse.json();
//       console.log('API_NFTMINT_Response:', responseData, "requestBody:", requestBody);

//       let messageNotification = `Minted avatar ${_level}`;
//       await postNotification(account, messageNotification);
//       let messageNotificationSponsor = `Your referee ${account} has minted avatar ${_level}`;
//       await postNotification(sponsorAddress, messageNotificationSponsor);

//       return mintNft;
//     } catch (error) {
//       console.log("getUserRankBonusesERROR:", error);
//     }
//   }
// };
export const setMintNft = async (_level) => {
  console.log("setMintNft")
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Get the selected account
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const account = accounts[0].toLowerCase();
    console.log("account", account);
    const currentChainId = await web3.eth.net.getId();
    if (currentChainId !== CurrentChainID) {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
      });
    }
    const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
    console.log(contracts);
    const to = account;
    console.log("_to", to);
    const evcNFTcost = await contracts.methods.getTrendAvatarsPrice(_level).call();
    let evcNFTCost = evcNFTcost.toString();
    console.log("evcNFTcost", evcNFTcost)
    let evcCostPer = BigInt(evcNFTCost) + BigInt((evcNFTCost * 0.1));
    console.log("evcCostPer", evcCostPer);
    let evcCost = BigInt(evcCostPer);
    console.log("evcCost8", evcCost);
    let evccost = (evcCost).toString();
    console.log("evccost8", evccost);
    // let sponsorAddress;

    let referrerAddress = await getMyReferrer();
    console.log("referrerAddress", referrerAddress);
    let sponsorAddress = referrerAddress !== "0x0000000000000000000000000000000000000000" ?
      referrerAddress : window.localStorage.getItem("sponsorAddress") != null ?
        window.localStorage.getItem("sponsorAddress") : "0x0000000000000000000000000000000000000000";

    // if (sponsorAddress != "0x0000000000000000000000000000000000000000") {
    //   let checkreferrer = await checkReferrer(sponsorAddress.toLowerCase(), account.toLowerCase());
    //   sponsorAddress = checkreferrer.status ? sponsorAddress : "0x0000000000000000000000000000000000000000";
    //   console.log("checkreferrer", checkreferrer);
    //   console.log("sponsorAddressAccount", sponsorAddress, account, checkreferrer);
    // }

    // let sponsorAddress1 = window.localStorage.getItem("sponsorAddress") != "null" ? (window.localStorage.getItem("sponsorAddress")).slice(1) : "0x0000000000000000000000000000000000000000";
    console.log("referrallink", typeof window.localStorage.getItem("sponsorAddress"))
    console.log("sponsorAddress", sponsorAddress)
    console.log("_level", _level)
    //Decentralized
    // const mintNft = await contracts.methods
    //   .mintNFT(_level, evccost, true, sponsorAddress)
    //   .send({ from: account });
    //Decentralized
    //Centralized
    try {
      const rankBonusData = await getUserRankBonuses();
      console.log("rankBonusData", rankBonusData);
      let sponsorAddresses, bonusPercentages;
      if (rankBonusData && rankBonusData.sponsorAddresses && rankBonusData.bonusPercentages) {
        sponsorAddresses = rankBonusData.sponsorAddresses;
        bonusPercentages = rankBonusData.bonusPercentages;
      } else {
        sponsorAddresses = ["0x0000000000000000000000000000000000000000"];
        bonusPercentages = [0];
        console.log("Default values assigned for sponsorAddresses and bonusPercentages.");
      }
      console.log("sponsorAddresses", sponsorAddresses);
      console.log("bonusPercentages", bonusPercentages);
      const estimatedGasLimit = await contracts.methods
        .mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages)
        .estimateGas({ from: account });

      const gasPrice = await web3.eth.getGasPrice();
      const mintNft = await contracts.methods
        .mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages)
        .send({
          from: account,
          gas: estimatedGasLimit,
          gasPrice: gasPrice
        });
      console.log("mintNft", mintNft);

      // const rankBonusData = await getUserRankBonuses();
      // console.log("rankBonusData", rankBonusData)
      // const sponsorAddresses = rankBonusData.sponsorAddresses;
      // const bonusPercentages = rankBonusData.bonusPercentages;
      // console.log("sponsorAddresses", sponsorAddresses);
      // console.log("bonusPercentages", bonusPercentages);
      // const mintNft = await contracts.methods
      //   .mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages)
      //   .send({ from: account });
      // //Centralized
      // console.log("mintNft", mintNft);
      // Prepare data for API integration
      // const APINFTMINT = `${URLDOMAIN}api/mintnfts`;
      // let evcNFTCostinEth = await web3.utils.fromWei(evcNFTCost, 'ether');
      let evcNFTCostinEth = await evcNFTCost / 10 ** 6
      const requestBody = {
        useraddress: account.toLowerCase(),
        level: _level,
        mintprice: evcNFTCostinEth,
        referreraddress: sponsorAddress.toLowerCase()
      };

      // Send POST request to API endpoint
      const apiResponse = await fetch(APINFTMINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await apiResponse.json();
      console.log('API_NFTMINT_Response:', responseData, "requestBody:", requestBody);

      // let storeteamStatistics = await storeTeamStatistics(account);
      // console.log("storeteamStatistics", storeteamStatistics);

      let messageNotification = `Minted avatar ${_level}`;
      await postNotification(account, messageNotification)
      let messageNotificationSponsor = `Your referee ${account} has minted avatar ${_level}`;
      await postNotification(sponsorAddress, messageNotificationSponsor)
      return mintNft
    } catch (error) {
      console.log("getUserRankBonusesERROR:", error);
    }
  }
};

//dev: setNFTApprove
export const setNFTApprove = async (_id) => {
  console.log("setNFTApprove");
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // Get the selected account
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      const currentChainId = await web3.eth.net.getId();
      if (currentChainId !== CurrentChainID) {
        await web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
        });
      }
      const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
      const estimatedGasLimit = await contracts.methods
        .approve(ContractAddressTTAVATARSSTAKE, _id)
        .estimateGas({ from: account });

      const gasPrice = await web3.eth.getGasPrice();

      console.log({ estimatedGasLimit })
      console.log({ gasPrice })

      const approveNFT = await contracts.methods
        .approve(ContractAddressTTAVATARSSTAKE, _id)
        .send({
          from: account,
          gas: estimatedGasLimit,
          gasPrice: gasPrice
        });
      console.log("setNFTApprove", approveNFT);
    }
  } catch (error) {
    console.log("approveError", error);
  }
};

// dev: use setNFTApprovalForAll
export const setNFTApprovalForAll = async () => {
  console.log("setNFTApprovalForAll");
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // Get the selected account
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      const currentChainId = await web3.eth.net.getId();
      if (currentChainId !== CurrentChainID) {
        await web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
        });
      }
      const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
      const estimatedGasLimit = await contracts.methods
        .setApprovalForAll(ContractAddressTTAVATARSSTAKE, true)
        .estimateGas({ from: account });
      const gasPrice = await web3.eth.getGasPrice();
      const approveForAll = await contracts.methods.setApprovalForAll(ContractAddressTTAVATARSSTAKE, true).send({
        from: account,
        gas: estimatedGasLimit,
        gasPrice: gasPrice
      });
      console.log("setNFTApprovalForAll", approveForAll);
    }
  } catch (error) {
    console.log("approveError", error);
  }
};



export const setRepurchaseNFTTrendAvatar = async (_id) => {
  console.log("setRepurchaseNFTTrendAvatar", _id);
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    //dev: Get the selected account
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    const currentChainId = await web3.eth.net.getId();
    if (currentChainId !== CurrentChainID) {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
      });
    }
    const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
    console.log(contracts);
    // const id = _id.split(",")
    // console.log("_idRepurchaseNFT", id);
    const estimatedGasLimit = await contracts.methods
      .repurchaseAvatar(account, _id)
      .estimateGas({ from: account });
    const gasPrice = await web3.eth.getGasPrice();
    const repurchaseNFT = await contracts.methods.repurchaseAvatar(account, _id).send({
      from: account,
      gas: estimatedGasLimit,
      gasPrice: gasPrice
    });
    console.log("RepurchaseNFTTrendAvatar", repurchaseNFT);
    let messageNotification = `Repurchased Trend Avatar ID : ${_id}`;
    await postNotification(account, messageNotification);
  }
};


//dev:  use get IsApproved For All Function
export const getIsApprovedForAll = async () => {
  console.log("getIsApprovedForAll");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0];
  console.log("getIsApprovedForAll_account", account);
  const evcIsApprovedForAll = await contracts.methods.isApprovedForAll(account, ContractAddressTTAVATARSSTAKE).call();
  console.log("evcIsApprovedForAll", evcIsApprovedForAll);
  return evcIsApprovedForAll;
};

//dev: Get  NFT Balance
export const getNFTBalanceOf = async () => {
  console.log("getNFTBalanceOf");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0];
  console.log("getNFTBalanceOf_account", account);
  const evcNFTBalance = await contracts.methods.balanceOf(account).call();
  console.log("evcNFTBalanceOf", evcNFTBalance);
  return evcNFTBalance;
};




export const getWalletOfOwner = async () => {
  console.log("getWalletOfOwner");
  try {
    let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);

    // Request Ethereum accounts
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    // Check if accounts array is empty
    if (accounts.length === 0) {
      console.error("No accounts found. Make sure you are connected to MetaMask or another Ethereum wallet.");
      return []; // Return an empty array or handle as appropriate
    }

    const account = accounts[0];
    console.log("getWalletOfOwner_account", account);

    // Call contract method
    const evcWalletOfOwner = await contracts.methods.walletOfOwner(account).call();
    const evcWalletofowner = [...evcWalletOfOwner].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    console.log("getStakedIdsFixStake", evcWalletofowner);
    console.log("evcWalletofowner", evcWalletofowner);

    return evcWalletofowner;
  } catch (error) {
    console.error("Error fetching wallet of owner:", error);
    return []; // Return empty array or handle error state
  }
};


export const getUserMintedTrendNFTAvatars = async () => {
  console.log("getUserMintedTrendNFTAvatars");
  try {
    let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length === 0) {
      console.error("No accounts found. Make sure you are connected to MetaMask or another Ethereum wallet.");
      return [];
    }
    const account = accounts[0];
    console.log("getUserMintedTrendNFTAvatars_account", account);
    const userMintedTrendNFTAvatars = await contracts.methods.getUserMintedTrendAvatars(account).call();
    const userMintedTrendNftAvatars = [...userMintedTrendNFTAvatars].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    console.log("getUserMintedTrendNFTAvatars", userMintedTrendNftAvatars);
    return userMintedTrendNftAvatars;
  } catch (error) {
    console.error("Error fetching wallet of owner:", error);
    return [];
  }
};
getUserMintedTrendNFTAvatars()

export const getUserPendingRewards = async () => {
  try {
    const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
    const [account] = await window.ethereum.request({ method: "eth_accounts" });
    const userTokenIds = await getUserMintedTrendNFTAvatars(account);
    const buyPriceRanges = [
      { min: 1, max: 600000, price: 250 },
      { min: 600001, max: 900000, price: 1250 },
      { min: 900001, max: 1100000, price: 2500 },
      { min: 1100001, max: 1200000, price: 6250 },
      { min: 1200001, max: 1250000, price: 15000 },
      { min: 1250001, max: 1270000, price: 30000 },
      { min: 1270001, max: 1280000, price: 75000 },
      { min: 1280001, max: 1285000, price: 150000 }
    ];
    const totalApplicableRewards = await userTokenIds.reduce(async (totalPromise, userTokenId) => {
      const total = await totalPromise;
      const tokenIdBuyPrice = buyPriceRanges.find(range => userTokenId >= range.min && userTokenId <= range.max)?.price || 0;
      console.log("tokenIdBuyPrice", tokenIdBuyPrice);
      const tokenIdRewardAccumulated = parseFloat((await contracts.methods.getRewardsAccumulated(account, userTokenId.toString()).call()) / 10 ** 6);
      let pendingRewards = 0;
      if (userTokenId <= 1285000) {
        pendingRewards = tokenIdBuyPrice - tokenIdRewardAccumulated;
      } if (userTokenId > 1285000) {
        const blankTokenIdPendingReward = await getBlankTokenIdPendingRewards(userTokenId);
        pendingRewards += blankTokenIdPendingReward;
      }
      return total + pendingRewards;
    }, Promise.resolve(0));
    console.log("getUserPendingRewards", totalApplicableRewards);
    return totalApplicableRewards.toFixed(4);
  } catch (error) {
    console.error("Error_getUserPendingRewards:", error);
    return 0;
  }
};
getUserPendingRewards();

export const getUserAvatarRepurchaseDetails = async () => {
  try {
    const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
    const [account] = await window.ethereum.request({ method: "eth_accounts" });
    const userAvatarTokenIds = await getUserMintedTrendNFTAvatars(account);
    const avatarBuyPriceRanges = [
      { min: 1, max: 600000, price: 250 },
      { min: 600001, max: 900000, price: 1250 },
      { min: 900001, max: 1100000, price: 2500 },
      { min: 1100001, max: 1200000, price: 6250 },
      { min: 1200001, max: 1250000, price: 15000 },
      { min: 1250001, max: 1270000, price: 30000 },
      { min: 1270001, max: 1280000, price: 75000 },
      { min: 1280001, max: 1285000, price: 150000 }
    ];
    const avatarRepurchaseDetails = await Promise.all(
      userAvatarTokenIds.map(async (avatarTokenId) => {
        const avatarBuyPrice = avatarBuyPriceRanges.find(range => avatarTokenId >= range.min && avatarTokenId <= range.max)?.price || 0;
        const avatarRewardAccumulated = parseFloat((await contracts.methods.getRewardsAccumulated(account, avatarTokenId.toString()).call()) / 10 ** 6);
        const avatarPendingRewards = avatarBuyPrice - avatarRewardAccumulated;
        const avatarPendingPerc = 100 * (1 - avatarRewardAccumulated / avatarBuyPrice);
        const isAvatarActive = avatarPendingPerc !== 0;
        return {
          avatarTokenId,
          avatarPendingRewards: avatarPendingRewards.toFixed(2),
          avatarPendingPerc: avatarPendingPerc.toFixed(2),
          isAvatarActive
        };
      })
    );
    console.log("getUserAvatarRepurchaseDetails", avatarRepurchaseDetails);
    return avatarRepurchaseDetails;
  } catch (error) {
    console.error("Error_getUserAvatarRepurchaseDetails:", error);
    return [];
  }
};
getUserAvatarRepurchaseDetails();

export const getUserPendingRewardsPerTokenId = async () => {
  try {
    const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
    const [account] = await window.ethereum.request({ method: "eth_accounts" });
    const userTokenIds = await getUserMintedTrendNFTAvatars(account);
    const buyPriceRanges = [
      { min: 1, max: 600000, price: 250 },
      { min: 600001, max: 900000, price: 1250 },
      { min: 900001, max: 1100000, price: 2500 },
      { min: 1100001, max: 1200000, price: 6250 },
      { min: 1200001, max: 1250000, price: 15000 },
      { min: 1250001, max: 1270000, price: 30000 },
      { min: 1270001, max: 1280000, price: 75000 },
      { min: 1280001, max: 1285000, price: 150000 }
    ];
    const pendingRewardsPerTokenId = await Promise.all(userTokenIds.map(async (userTokenId) => {
      const tokenIdBuyPrice = buyPriceRanges.find(range => userTokenId >= range.min && userTokenId <= range.max)?.price || 0;
      const tokenIdRewardAccumulated = parseFloat((await contracts.methods.getRewardsAccumulated(account, userTokenId.toString()).call()) / 10 ** 6);
      let pendingRewards = 0;
      if (userTokenId <= 1285000) {
        pendingRewards = tokenIdBuyPrice - tokenIdRewardAccumulated;
      }
      if (userTokenId > 1285000) {
        const blankTokenIdPendingReward = await getBlankTokenIdPendingRewards(userTokenId);
        pendingRewards += blankTokenIdPendingReward;
      }
      return { [userTokenId]: pendingRewards.toFixed(4) };
    }));
    console.log("getUserPendingRewardsPerTokenId", pendingRewardsPerTokenId);
    return pendingRewardsPerTokenId;
  } catch (error) {
    console.error("Error_getUserPendingRewardsPerTokenId:", error);
    return [];
  }
};
getUserPendingRewardsPerTokenId();

export const getMyReferrer = async () => {
  console.log("getMyReferrer");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0];
  console.log("getMyReferrer_account", account);
  const referrerAddress = await contracts.methods.getReferrerOf(account).call();
  console.log("getMyReferrer", referrerAddress);
  return referrerAddress;
};





export const getTeamSales = async () => {
  console.log("getTeamSales");
  const apiResponse = await fetch(`${APITEAMSTATISTICS}`);
  const apiData = await apiResponse.json();

  const totalTeamSales = apiData.data.reduce((sum, item) => sum + parseInt(item.teamsale), 0);
  console.log("getTeamSalesTotalTeamSales:", totalTeamSales);
  // const totalTeamSalesFix = totalTeamSales.toFixed(4)
  // console.log("totalTeamSalesFix",totalTeamSalesFix)
  return totalTeamSales;
};

export const getTeamStatistic = async () => {
  console.log("getTeamStatistic");
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0].toLowerCase();
  console.log("getTeamStatistic_account", account);

  // Fetch team statistics data from the API
  const apiResponse = await fetch(`${APIDIRECTTEAMSTATISTICS}${account}`); //Note: this to be used
  // const apiResponse = await fetch(`${URLDOMAIN}api/partneractivity/getdirectteamstatistics/0x32b23F24505C9E366ce9a45116f4F76BF5D683De`); //Note: this is temporary
  const apiData = await apiResponse.json();
  console.log("getTeamStatisticData:", apiData);
  // Extract team statistics from the API data
  const teamStatistics = apiData.data.map(item => ({
    userAddress: item.walletaddress,
    userRank: item.rank,
    totalPartners: item.totalpartners,
    nftLevel: item.ownnft,
    teamSaleLastWeek: item.teamsalelastweek,
    totalTeamSales: item.teamsale,
  }));
  console.log("getTeamStatisticResponse:", teamStatistics);
  return teamStatistics;
};


export const getTeamStatisticOfAddressResponse = async (_address) => {
  const address = _address.toLowerCase();
  try {
    console.log("getTeamStatisticOfAddress", address);
    const teamStatisticApi = await fetch(`${APIDIRECTTEAMSTATISTICS}${address}`);
    console.log("myapi", teamStatisticApi);
    const teamStatisticData = await teamStatisticApi.json();
    console.log("getTeamStatisticOfAddressLogjson", teamStatisticData.data);
    let teamStatistic = teamStatisticData.data;

    const transformedDataPromises = teamStatistic.map(async (user) => {
      // Check if user is not null or undefined
      if (!user) {
        return null; // or handle the case where user is null
      }

      const {
        walletaddress: address,
        rank: _rank,
        totalpartners: _totalPartners,
        ownnft: nftLevel,
        teamsale: totalTeamSales,
        teamsalelastweek: totalTeamSalesLastWeek,
        teamsaleprivousweek: totalTeamSalesPreviousWeek
      } = user;

      console.log("user", user);
      const _rankNumber = _rank;
      const _totalPartnersNumber = _totalPartners;
      const totalTeamSalesNumber = totalTeamSales.toString();
      const totalTeamSalesLastWeekNumber = totalTeamSalesLastWeek.toString();
      const totalTeamSalesPreviousWeekNumber = totalTeamSalesPreviousWeek.toString();
      console.log(`addresscounts${address}`, address);
      const totalWeeklyTurnover = totalTeamSalesNumber / 7;

      let nestedData = [];
      if (user && user.walletaddress) { // Ensure user.walletaddress is defined
        console.log({ user });
        const nestedResultPromise = getTeamStatisticOfAddressResponse(user.walletaddress);
        nestedData.push(...await nestedResultPromise);
      }

      return {
        address,
        _rank: _rankNumber,
        _totalPartners: _totalPartnersNumber,
        nftLevel,
        totalTeamSalesLastWeekNumber,
        totalTeamSalesPreviousWeekNumber,
        totalWeeklyTurnover,
        totalTeamSales: totalTeamSalesNumber,
        nestedData,
      };
    });

    const transformedData = await Promise.all(transformedDataPromises);
    return transformedData.filter(data => data !== null); // Filter out null entries if any
  } catch (error) {
    console.error("Error in getAndTransformTeamStatistic:", error);
    return [];
  }
};





export const getRecentlyJoined = async () => {
  console.log("getRecentlyJoined");
  const provider = detectCurrentProvider();
  const web3 = new Web3(provider);
  const accounts = await provider.request({
    method: "eth_accounts"
  });
  const account = accounts[0];
  //  const account = "0x15ea3a5a3969368f417c251e78f25e342bfc0bb5"
  const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  console.log({ account })
  // const recentlyJoined = await contracts.methods.getRecentlyJoinedTeamMembers(account).call();
  const recentlyJoined = await getUserRecentlyJoinedDetails(account);
  console.log("recentlyJoined", recentlyJoined);
  const recentlyJoinedData = await Promise.all(
    recentlyJoined.map(async (address) => {
      try {
        const dataUserJoinedDetails = await getUserJoinedDetails(address.toLowerCase());
        console.log("dataUserJoinedDetails", dataUserJoinedDetails);
        const joinTime = await dataUserJoinedDetails.status ? dataUserJoinedDetails.date : 0;
        const joinDate = await joinTime ? new Date(joinTime) : null;
        const formattedDate = await joinDate ?
          `${joinDate.getDate()}/${joinDate.getMonth() + 1}/${joinDate.getFullYear().toString().slice(-2)}` :
          "-/-/-";
        const recentlyJoinedRes = {
          joinTime: formattedDate,
          address,
          ttavatarsboughtname: await dataUserJoinedDetails.status ? dataUserJoinedDetails.nftname : "-"
        };
        console.log("recentlyJoinedRes", recentlyJoinedRes);
        return recentlyJoinedRes;
      } catch (error) {
        console.error("Error in getting recently joined data:", error);
        return {
          joinTime: "-",
          address,
          ttavatarsboughtname: "-"
        };
      }
    })
  );
  console.log("recentlyJoinedData", recentlyJoinedData);
  return recentlyJoinedData;
};
getRecentlyJoined();
export const getUserJoinedDetails = async (address) => {
  if (!address) return null;
  try {
    const response = await fetch(`${APIUSERJOINEDDETAILS}${address}`);
    if (!response.ok) return undefined;
    const detailsData = await response.json();
    console.log("getUserJoinedDetails", detailsData);
    return detailsData;
  } catch (error) {
    console.error("Error in getting user joined details:", error);
    return null;
  }
};
export const getUserRecentlyJoinedDetails = async (address) => {
  if (!address) return null;
  try {
    const response = await fetch(`${APIJOINEDPARTNERS}${address}`);
    if (!response.ok) return undefined;
    const detailsData = await response.json();
    console.log("getUserRecentlyJoinedDetails", detailsData);
    if (detailsData.success) {
      const addresses = detailsData.partners.map(partner => partner.myaddress);
      console.log("getUserRecentlyJoinedDetails_addresses", addresses);
      return addresses;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error_GetUserRecentlyJoinedDetails:", error);
    return null;
  }
};



export const getEvcRank = async () => {
  console.log("getEvcRank");
  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    let account = accounts[0].toLowerCase();
    console.log("getEvcRank_account", account);
    const apiResponse = await fetch(`${APIUSERRANK}${account}`);
    console.log("API_USERRANK_Response:", apiResponse);
    const apiData = await apiResponse.json();
    console.log("API_USERRANK_Data:", apiData);
    const userRank = apiData.UserRank.find(user => user.walletaddress === account);
    if (userRank) {
      console.log("Rank_for_account", account, "is", userRank.rank);
      return userRank.rank;
    } else {
      console.log("RgetEvcRank_ERROR", account);
      return null; // Account not found in the data
    }
  } catch (error) {
    console.error("Error in getEvcRank:", error);
    return undefined;
  }
};


export const getUserRankBonuses = async () => {
  console.log("getUserRankBonuses");
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  let account = accounts[0].toLowerCase(); //Note: actual to be used
  // let account = "0x38179c412Fd4E877745623E3AB004176BD8A76AF"
  console.log("getUserRankBonuses_account", account);
  const apiResponse = await fetch(`${APIUSERRANKBONUSES}${account}`);
  const apiData = await apiResponse.json();
  console.log("API_USER_RANK_BONUSES_Data1:", apiResponse);

  if (apiResponse.status == 500) {
    const sponsorAddresses = "0x0000000000000000000000000000000000000000"
    const bonusPercentages = 0
    console.log("getUserRankBonuses_sponsorAddresses&bonusPercentages", sponsorAddresses, bonusPercentages);
    return { sponsorAddresses, bonusPercentages };
  }

  const sponsorAddresses = apiData.RankBonuses.address;
  const bonusPercentages = apiData.RankBonuses.bonus;
  console.log("Sponsor_Addresses:", sponsorAddresses);
  console.log("Bonus_Percentages:", bonusPercentages);
  console.log("getUserRankBonuses_sponsorAddresses&bonusPercentages", sponsorAddresses, bonusPercentages);
  // Apply validation and set default values if arrays are empty
  if (sponsorAddresses.length === 0) {
    sponsorAddresses.push("0x0000000000000000000000000000000000000000");
  }
  if (bonusPercentages.length === 0) {
    bonusPercentages.push(0);
  }
  console.log("getUserRankBonuses_sponsorAddresses&bonusPercentages", sponsorAddresses, bonusPercentages);
  return { sponsorAddresses, bonusPercentages };
};
getUserRankBonuses();


export const getCurrentUserTeamSaleAndPartners = async (address) => {
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const account = accounts[0].toLowerCase();
  console.log("getCurrentUserTeamSaleAndPartners_account", account);
  try {
    const response = await fetch(`${APIDIRECTDETAILTEAMSTATISTICS}${account}`);
    const data = await response.json();
    if (!data.status) {
      console.error("Failed to retrieve team statistics");
      return { totalPartners: 0, teamSale: 0 };
    }
    const resCurrentUserTeamSaleAndPartners = {
      totalPartners: data.data.totalpartners,
      teamSale: data.data.teamsale,
    };
    console.log("resCurrentUserTeamSaleAndPartners", resCurrentUserTeamSaleAndPartners);
    return resCurrentUserTeamSaleAndPartners;
  } catch (error) {
    console.error("Failed to retrieve team statistics:", error);
    return { totalPartners: 0, teamSale: 0 };
  }
};
getCurrentUserTeamSaleAndPartners();



export const getRBEarning = async () => {
  console.log("getRBEarning");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const accounts = await window.ethereum.request({ method: "eth_accounts", });
  const account = accounts[0];
  console.log("getRBEarning_account", account);
  const rbEarning = await contracts.methods.rankBonusEarningsByUser(account).call();
  console.log("rbEarning", rbEarning);
  // const RBEarning = web3.utils.fromWei(rbEarning, 'ether');
  const RBEarning = Number(rbEarning) / 10 ** 6
  console.log("RBEarning", RBEarning);
  return RBEarning;
};


export const getUniLevelEarning = async () => {
  console.log("getUniLevelEarning");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const accounts = await window.ethereum.request({ method: "eth_accounts", });
  const account = accounts[0];
  console.log("getUniLevelEarning_account", account);
  const unilevelearning = await contracts.methods.unilevelEarningsByUser(account).call();
  console.log("getUniLevelEarning", unilevelearning);
  // const uniLevelEarning = web3.utils.fromWei(unilevelearning, 'ether')
  const uniLevelEarning = Number(unilevelearning) / 10 ** 6
  console.log("getUniLevelEarning", uniLevelEarning);
  return uniLevelEarning;
};


export const getEvcRbEarning = async () => {
  console.log("getEvcRbEarning");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const accounts = await window.ethereum.request({ method: "eth_accounts", });
  const account = accounts[0];
  console.log("getEvcRbEarning_account", account);
  const evcrbearning = await contracts.methods.ttSwapVestByUser(account).call();
  console.log("evcrbearning", evcrbearning);
  const EvcRbEarning = web3.utils.fromWei(evcrbearning, 'ether')
  console.log("uniLevelEarning", EvcRbEarning);
  return EvcRbEarning;
};

//dev: get Owner
export const getOwnerOf = async (_id) => {
  console.log("getOwnerOf");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const evcOwnerOfNFT = await contracts.methods.ownerOf(_id).call();
  console.log("evcOwnerOfNFT", evcOwnerOfNFT);
  return evcOwnerOfNFT;
};

//dev: Get Token URL
export const getTokenURI = async (_id) => {
  console.log("getTokenURI");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const evcTokenURI = await contracts.methods.tokenURI(_id).call();
  console.log("evcTokenURI", evcTokenURI);
  return evcTokenURI;
};

//dev: Get Total Supply
export const getTotalSupply = async () => {
  console.log("getTotalSupply");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const evcNFTTotalSupply = await contracts.methods.totalSupply().call();
  console.log("evcNFTTotalSupply", evcNFTTotalSupply);
  return evcNFTTotalSupply;
};

export const getOwnerBalance = async () => {
  console.log("getOwnerBalance");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const accounts = await window.ethereum.request({ method: "eth_accounts", });
  const account = accounts[0];
  console.log("getOwnerBalance_account", account);
  const ownerBalance = await contracts.methods.balanceOf(account).call();
  console.log("ownerBalance", ownerBalance);
  return ownerBalance;
};


export const getHasToken = async () => {
  const hasTokenArray = [];
  console.log("getHasToken");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  console.log("ContractAddressTTAVATARS", ContractAddressTTAVATARS);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0];
  console.log("getHasToken_account", account);
  for (let i = 0; i < 8; i++) {
    const hasNftToken = await contracts.methods.hasTrendAvatars(i, account).call();
    hasTokenArray.push(hasNftToken)
    console.log("hasTokenArray", hasTokenArray);
  }
  return hasTokenArray;
};
getHasToken()

export const getTrendAvatarsCost = async () => {
  const hasTokenArray = await getHasToken();
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const trendAvatarsPriceArray = hasTokenArray.map(async (hasToken, i) => {
    if (hasToken) {
      const price = await contracts.methods.getTrendAvatarsPrice(i + 1).call();
      // return web3.utils.fromWei(price, 'ether');
      return Number(price) / 10 ** 6
    }
    return 0;
  });
  let hasTrendAvatarsCost = await Promise.all(trendAvatarsPriceArray);
  console.log("hasTrendAvatarsCost", hasTrendAvatarsCost);
  return hasTrendAvatarsCost;
};
getTrendAvatarsCost();


export const getTotalPaidUniLevelRewards = async () => {
  console.log("getTotalPaidUniLevelRewards");
  let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
  const totalPaidUniLevelRewardsInWei = await contracts.methods.totalPaidUniLevelRewards().call();
  console.log("totalPaidUniLevelRewardsInWei", totalPaidUniLevelRewardsInWei);
  // const totalPaidUniLevelRewardsInEth = web3.utils.fromWei(totalPaidUniLevelRewardsInWei, 'ether')/10**12
  const totalPaidUniLevelRewardsInEth = Number(totalPaidUniLevelRewardsInWei) / 10 ** 6
  console.log("totalPaidUniLevelRewardsInEth", totalPaidUniLevelRewardsInEth);
  return totalPaidUniLevelRewardsInEth;
}
getTotalPaidUniLevelRewards()

export const getSwapTradeHistory = async () => {
  try {
    const response = await fetch(`${APISWAPTRADEHISTORY}`);
    const data = await response.json();
    console.log('getSwapTradeHistory_data:', data);
    return data.data; // Return the fetched data
  } catch (error) {
    console.error('getSwapTradeHistory_data_ERROR:', error);
    return null; // Return null or handle the error as needed
  }
};
// getSwapTradeHistory()


export const getAccountNotification = async () => {
  try {
    const response = await fetch(APINOTIFICATIONS);
    const data = await response.json();
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const account = accounts[0];
    console.log('getAccountNotification_account:', account);
    console.log('getNotification:', data);
    const filteredNotifications = data.filter(notification => notification.walletaddress.toLowerCase() === account.toLowerCase());
    console.log('getAccountNotification:', filteredNotifications);
    const notificationMessages = filteredNotifications.map(notification => notification.notification);
    console.log('getAccountNotificationmessages:', notificationMessages);
    return notificationMessages; // Return the notification messages
  } catch (error) {
    console.error('getAccountNotification_data_ERROR:', error);
    return null; // Return null or handle the error as needed
  }
};
getAccountNotification();

export const postNotification = async (walletAddress, notification) => {
  try {
    const response = await fetch(APINOTIFICATIONS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletaddress: walletAddress, notification: notification }),
    });
    const data = await response.json();
    console.log('postNotification_response:', data);
    return data; // Return the response data
  } catch (error) {
    console.error('postNotification_ERROR:', error);
    throw new Error('Failed to post notification data');
  }
};



export const checkReferrer = async (sponsorAddress) => {
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0].toLowerCase();
  try {
    const response = await fetch(APICHECKREFERRER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sponsoraddress: sponsorAddress, myaddress: account }),
    });
    const data = await response.json();
    console.log('CHECK_REFERRER_response:', data);
    return data; // Return the response data
  } catch (error) {
    console.error('CHECK_REFERRER_ERROR:', error);
    throw new Error('Failed to CHECK_REFERRER data');
  }
};
export const setCheckReferrer = async () => {
  try {
    const sponsorAddr = window.localStorage.getItem("sponsorAddress");
    if (sponsorAddr && sponsorAddr !== "0x0000000000000000000000000000000000000000") {
      const checkreferrer = await checkReferrer(sponsorAddr.toLowerCase());
      const newSponsorAddr = checkreferrer.status ? sponsorAddr : "0x0000000000000000000000000000000000000000";
      if (newSponsorAddr !== sponsorAddr) {
        await window.localStorage.setItem("sponsorAddress", newSponsorAddr);
        console.log("newSponsorAddr", newSponsorAddr);
      }
      console.log("checkreferrer", checkreferrer);
      console.log("sponsorAddressAccount", sponsorAddr, checkreferrer);
    }
  } catch (error) {
    console.error("ErrorfetchingCheckRef:", error);
  }
};



export const storeTeamStatistics = async (_useraddress) => {
  const useraddress = _useraddress.toLowerCase();
  try {
    const response = await fetch(APISTORETEAMSTATISTICS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userAddress: useraddress }),
    });
    const data = await response.json();
    console.log('STORE_TEAM_STATISTICS_response:', data);
    return data; // Return the response data
  } catch (error) {
    console.error('STORE_TEAM_STATISTICS_ERROR:', error);
    throw new Error('Failed to STORE_TEAM_STATISTICS data');
  }
};



































// export const setMintNft = async (_level) => {
//   console.log("setMintNft")
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     // Get the selected account
//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const account = accounts[0].toLowerCase();
//     console.log("account", account);
//     const currentChainId = await web3.eth.net.getId();
//     if (currentChainId !== CurrentChainID) {
//       await web3.currentProvider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
//       });
//     }
//     const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
//     console.log(contracts);
//     const to = account;
//     console.log("_to", to);
//     const evcNFTcost = await contracts.methods.getTrendAvatarsPrice(_level).call();
//     let evcNFTCost = evcNFTcost.toString();
//     console.log("evcNFTcost", evcNFTcost)
//     let evcCostPer = BigInt(evcNFTCost) + BigInt((evcNFTCost * 0.1));
//     console.log("evcCostPer", evcCostPer);
//     let evcCost = BigInt(evcCostPer);
//     console.log("evcCost8", evcCost);
//     let evccost = (evcCost).toString();
//     console.log("evccost8", evccost);
//     // let sponsorAddress;

//     let referrerAddress = await getMyReferrer();
//     console.log("referrerAddress", referrerAddress);
//     let sponsorAddress = referrerAddress !== "0x0000000000000000000000000000000000000000" ?
//       referrerAddress : window.localStorage.getItem("sponsorAddress") != null ?
//         window.localStorage.getItem("sponsorAddress") : "0x0000000000000000000000000000000000000000";

//     // if (sponsorAddress != "0x0000000000000000000000000000000000000000") {
//     //   let checkreferrer = await checkReferrer(sponsorAddress.toLowerCase(), account.toLowerCase());
//     //   sponsorAddress = checkreferrer.status ? sponsorAddress : "0x0000000000000000000000000000000000000000";
//     //   console.log("checkreferrer", checkreferrer);
//     //   console.log("sponsorAddressAccount", sponsorAddress, account, checkreferrer);
//     // }

//     // let sponsorAddress1 = window.localStorage.getItem("sponsorAddress") != "null" ? (window.localStorage.getItem("sponsorAddress")).slice(1) : "0x0000000000000000000000000000000000000000";
//     console.log("referrallink", typeof window.localStorage.getItem("sponsorAddress"))
//     console.log("sponsorAddress", sponsorAddress)
//     console.log("_level", _level)
//     //Decentralized
//     // const mintNft = await contracts.methods
//     //   .mintNFT(_level, evccost, true, sponsorAddress)
//     //   .send({ from: account });
//     //Decentralized
//     //Centralized
//     try {
//       const rankBonusData = await getUserRankBonuses();
//       console.log("rankBonusData", rankBonusData);
//       let sponsorAddresses, bonusPercentages;
//       if (rankBonusData && rankBonusData.sponsorAddresses && rankBonusData.bonusPercentages) {
//         sponsorAddresses = rankBonusData.sponsorAddresses;
//         bonusPercentages = rankBonusData.bonusPercentages;
//       } else {
//         sponsorAddresses = ["0x0000000000000000000000000000000000000000"];
//         bonusPercentages = [0];
//         console.log("Default values assigned for sponsorAddresses and bonusPercentages.");
//       }
//       console.log("sponsorAddresses", sponsorAddresses);
//       console.log("bonusPercentages", bonusPercentages);
//       const estimatedGasLimit = await contracts.methods
//         .mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages)
//         .estimateGas({ from: account });

//       const gasPrice = await web3.eth.getGasPrice();
//       const mintNft = await contracts.methods
//         .mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages)
//         .send({
//           from: account,
//           gas: estimatedGasLimit,
//           gasPrice: gasPrice
//         });
//       console.log("mintNft", mintNft);

//       // const rankBonusData = await getUserRankBonuses();
//       // console.log("rankBonusData", rankBonusData)
//       // const sponsorAddresses = rankBonusData.sponsorAddresses;
//       // const bonusPercentages = rankBonusData.bonusPercentages;
//       // console.log("sponsorAddresses", sponsorAddresses);
//       // console.log("bonusPercentages", bonusPercentages);
//       // const mintNft = await contracts.methods
//       //   .mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages)
//       //   .send({ from: account });
//       // //Centralized
//       // console.log("mintNft", mintNft);
//       // Prepare data for API integration
//       const APINFTMINT = `${URLDOMAIN}api/mintnfts`;
//       // let evcNFTCostinEth = await web3.utils.fromWei(evcNFTCost, 'ether');
//       let evcNFTCostinEth = await evcNFTCost / 10 ** 6
//       const requestBody = {
//         useraddress: account.toLowerCase(),
//         level: _level,
//         mintprice: evcNFTCostinEth,
//         referreraddress: sponsorAddress.toLowerCase()
//       };

//       // Send POST request to API endpoint
//       const apiResponse = await fetch(APINFTMINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });
//       const responseData = await apiResponse.json();
//       console.log('API_NFTMINT_Response:', responseData, "requestBody:", requestBody);

//       let storeteamStatistics = await storeTeamStatistics(account);
//       console.log("storeteamStatistics", storeteamStatistics);

//       let messageNotification = `Minted avatar ${_level}`;
//       await postNotification(account, messageNotification)
//       let messageNotificationSponsor = `Your referee ${account} has minted avatar ${_level}`;
//       await postNotification(sponsorAddress, messageNotificationSponsor)
//       return mintNft
//     } catch (error) {
//       console.log("getUserRankBonusesERROR:", error);
//     }
//   }
// };


// export const setMintNft = async (_level) => {
//   console.log("setMintNft")
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     // Get the selected account
//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const account = accounts[0];
//     console.log("account", account);
//     const currentChainId = await web3.eth.net.getId();
//     if (currentChainId !== CurrentChainID) {
//       await web3.currentProvider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
//       });
//     }
//     const contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
//     console.log(contracts);
//     const to = account;
//     console.log("_to", to);
//     const evcNFTcost = await contracts.methods.getTrendAvatarsPrice(_level).call();
//     let evcNFTCost = evcNFTcost.toString();
//     console.log("evcNFTcost", evcNFTcost)

//     let evcCostPer = BigInt(evcNFTCost) + BigInt((evcNFTCost * 0.1));
//     console.log("evcCostPer", evcCostPer);
//     let evcCost = BigInt(evcCostPer);
//     console.log("evcCost8", evcCost);
//     let evccost = (evcCost).toString();
//     console.log("evccost8", evccost);
//     // let sponsorAddress;
//     let referrerAddress = await getMyReferrer();
//     console.log("referrerAddress", referrerAddress);
//     let sponsorAddress = referrerAddress != "0x0000000000000000000000000000000000000000" ?
//       referrerAddress : window.localStorage.getItem("sponsorAddress") != null ?
//         window.localStorage.getItem("sponsorAddress") : "0x0000000000000000000000000000000000000000";
//     // let sponsorAddress1 = window.localStorage.getItem("sponsorAddress") != "null" ? (window.localStorage.getItem("sponsorAddress")).slice(1) : "0x0000000000000000000000000000000000000000";
//     console.log("referrallink", typeof window.localStorage.getItem("sponsorAddress"))
//     console.log("sponsorAddress", sponsorAddress)
//     console.log("_level", _level)
//     //Decentralized
//     // const mintNft = await contracts.methods
//     //   .mintNFT(_level, evccost, true, sponsorAddress)
//     //   .send({ from: account });
//     //Decentralized
//     //Centralized
//     try {
//       // const rankBonusData = await getUserRankBonuses();
//       // console.log("rankBonusData", rankBonusData);
//       let sponsorAddresses, bonusPercentages;
//       // if (rankBonusData && rankBonusData.sponsorAddresses && rankBonusData.bonusPercentages) {
//       //   sponsorAddresses = rankBonusData.sponsorAddresses;
//       //   bonusPercentages = rankBonusData.bonusPercentages;
//       // } else {
//       sponsorAddresses = ["0x0000000000000000000000000000000000000000"];
//       bonusPercentages = [0];
//       console.log("Default values assigned for sponsorAddresses and bonusPercentages.");
//       // }
//       console.log("sponsorAddresses", sponsorAddresses);
//       console.log("bonusPercentages", bonusPercentages);
//       const mintNft = await contracts.methods
//         .mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages)
//         .send({ from: account });
//       console.log("mintNft", mintNft);

//       // const rankBonusData = await getUserRankBonuses();
//       // console.log("rankBonusData", rankBonusData)
//       // const sponsorAddresses = rankBonusData.sponsorAddresses;
//       // const bonusPercentages = rankBonusData.bonusPercentages;
//       // console.log("sponsorAddresses", sponsorAddresses);
//       // console.log("bonusPercentages", bonusPercentages);
//       // const mintNft = await contracts.methods
//       //   .mintTTAvatars(_level, evccost, true, sponsorAddress, sponsorAddresses, bonusPercentages)
//       //   .send({ from: account });
//       // //Centralized
//       // console.log("mintNft", mintNft);
//       // Prepare data for API integration
//       const APINFTMINT = `${URLDOMAIN}api/mintnfts`;
//        // let evcNFTCostinEth = await web3.utils.fromWei(evcNFTCost, 'ether');
//        let evcNFTCostinEth = await evcNFTCost / 10**6
//       const requestBody = {
//         useraddress: account,
//         level: _level,
//         mintprice: evcNFTCostinEth,
//         referreraddress: sponsorAddress,
//       };
//       // Send POST request to API endpoint
//       const apiResponse = await fetch(APINFTMINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });
//       const responseData = await apiResponse.json();
//       console.log('API_NFTMINT_Response:', responseData);
//       let messageNotification = `Minted avatar ${_level}`;
//       await postNotification(account, messageNotification)
//       let messageNotificationSponsor = `Your referee ${account} has minted avatar ${_level}`;
//       await postNotification(sponsorAddress, messageNotificationSponsor)
//       return mintNft
//     } catch (error) {
//       console.log("getUserRankBonusesERROR:", error);
//     }
//   }
// };

// export const getTeamSales = async () => {
//   console.log("getTeamSales");
//   let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getTeamSales_account", account);
//   //{Decentralized}
//   // const teamSales = await contracts.methods.getTotalTeamSaleVolume(account).call();
//   // console.log("teamSales", teamSales);
//   // return teamSales;
//   //{Decentralized}
//   //{Centralized}
//   return 1234500000000000000000000;
//   //{Centralized}
// };

// export const getTeamStatistic = async () => {
//   console.log("getTeamStatistic");
//   let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getTeamStatistic_account", account);
//   //{Decentralized}
//   // const teamStatistic = await contracts.methods.getTeamSalesStatistics(account).call();
//   // console.log("teamStatistic", teamStatistic);
//   // return teamStatistic;
//   //{Decentralized}
//   //{Centralized}
//   let data = {
//     teamStatistics: [
//       {
//         userAddress: "0xFa1dAd043E34BA3FdE4e58D2C0c7E9Bfa21196FC",
//         userRank: "1",
//         totalPartners: "5",
//         nftLevel: "Crypto Tycoon",
//         totalTeamSales: "1234560000000000000000000"
//       }
//     ]
//   };
//   return data.teamStatistics;
//   //{Centralized}
// };

//dev: get wallet of owner
// export const getWalletOfOwner = async () => {
//   console.log("getWalletOfOwner");
//   let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getWalletOfOwner_account", account);
//   const evcWalletOfOwner = await contracts.methods.walletOfOwner(account).call();
//   const evcWalletofowner = [...evcWalletOfOwner].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
//   console.log("getStakedIdsFixStake", evcWalletofowner);

//   console.log("evcWalletofowner", evcWalletofowner);
//   return evcWalletofowner;
// };

// export const getTeamStatisticOfAddressResponse = async (_address) => {
//   const address = _address.toLowerCase()
//   try {
//     console.log("getTeamStatisticOfAddress", address);
//     const teamStatisticApi = await fetch(`${URLDOMAIN}api/partneractivity/getdirectteamstatistics/${address}`);
//     console.log("myapi", teamStatisticApi);
//     const teamStatisticData = await teamStatisticApi.json();
//     console.log("getTeamStatisticOfAddressLogjson", teamStatisticData.data);
//     let teamStatistic = teamStatisticData.data;

//     const transformedDataPromises = teamStatistic.map(async (user) => {
//       const {
//         walletaddress: address,
//         rank: _rank,
//         totalpartners: _totalPartners,
//         ownnft: nftLevel,
//         teamsale: totalTeamSales,
//       } = user;
//       console.log("user", user)
//       const _rankNumber = (_rank);
//       const _totalPartnersNumber = (_totalPartners);
//       const totalTeamSalesNumber = totalTeamSales.toString();
//       console.log(`addresscounts${address}`, address);
//       const totalWeeklyTurnover = totalTeamSalesNumber / 7;

//       let nestedData = [];
//       if (user) {
//         console.log({user})
//         const nestedResultPromise = getTeamStatisticOfAddressResponse(user?.walletaddress);
//         nestedData.push(...await nestedResultPromise);
//       }

//       return {
//         address,
//         _rank: _rankNumber,
//         _totalPartners: _totalPartnersNumber,
//         nftLevel,
//         totalWeeklyTurnover,
//         totalTeamSales: totalTeamSalesNumber,
//         nestedData,
//       };
//     });

//     const transformedData = await Promise.all(transformedDataPromises);
//     return transformedData;
//   } catch (error) {
//     console.error("Error in getAndTransformTeamStatistic:", error);
//     return [];
//   }
// };



// export const getTeamStatisticOfAddressResponse = async (_address) => {
//   const address = _address.toLowerCase()
//   try {
//     console.log("getTeamStatisticOfAddress", address);
//     const teamStatisticApi = await fetch(`${URLDOMAIN}api/partneractivity/getdirectteamstatistics/${address}`);
//     console.log("myapi", teamStatisticApi);
//     const teamStatisticData = await teamStatisticApi.json();
//     console.log("getTeamStatisticOfAddressLogjson", teamStatisticData.data);
//     let teamStatistic = teamStatisticData.data;

//     let transformedData = [];
//     for (const user of teamStatistic) {
//       console.log({user})
//       const {
//         walletaddress: address,
//         rank: _rank,
//         totalpartners: _totalPartners,
//         ownnft: nftLevel,
//         teamsale: totalTeamSales,
//       } = user;
//       console.log("user", user)
//       const _rankNumber = (_rank);
//       const _totalPartnersNumber = (_totalPartners);
//       const totalTeamSalesNumber = totalTeamSales.toString();
//       console.log(`addresscounts${address}`, address);
//       const totalWeeklyTurnover = totalTeamSalesNumber / 7;

//       let nestedData = [];
//       if (user) {
//         console.log("My wallet",user?.walletaddress)
//         const nestedResult = await getTeamStatisticOfAddressResponse(user?.walletAddress);
//         console.log({nestedResult})
//         nestedData.push(...nestedResult);
//       }

//       transformedData.push({
//         address,
//         _rank: _rankNumber,
//         _totalPartners: _totalPartnersNumber,
//         nftLevel,
//         totalWeeklyTurnover,
//         totalTeamSales: totalTeamSalesNumber,
//         nestedData,
//       });
//     }

//     return transformedData;

//   } catch (error) {
//     console.error("Error in getAndTransformTeamStatistic:", error);
//     return [];
//   }
// };




// export const getTeamStatisticOfAddressResponse = async (_address) => {
//   const address = _address.toLowerCase()
//   try {
//     console.log("getTeamStatisticOfAddress", address);
//     const teamStatisticApi = await fetch(`${URLDOMAIN}api/partneractivity/getdirectteamstatistics/${address}`);
//     console.log("myapi", teamStatisticApi);
//     const teamStatisticData = await teamStatisticApi.json();
//     console.log("getTeamStatisticOfAddressLogjson", teamStatisticData.data);
//     let teamStatistic = teamStatisticData.data;
//     let transformedData = teamStatistic?.map(user => {
//       const {
//         walletaddress: address,
//         rank: _rank,
//         totalpartners: _totalPartners,
//         ownnft: nftLevel,
//         teamsale: totalTeamSales,
//       } = user;
//       console.log("user", user)
//       const _rankNumber = (_rank);
//       const _totalPartnersNumber = (_totalPartners);
//       const totalTeamSalesNumber = totalTeamSales.toString();
//       console.log(`addresscounts${address}`, address);
//       const totalWeeklyTurnover = totalTeamSalesNumber / 7;

//       return {
//         address,
//         _rank: _rankNumber,
//         _totalPartners: _totalPartnersNumber,
//         nftLevel,
//         totalWeeklyTurnover,
//         totalTeamSales: totalTeamSalesNumber,
//       };
//     });
//     return await Promise.all(transformedData);
//   } catch (error) {
//     console.error("Error in getAndTransformTeamStatistic:", error);
//     return [];
//   }
// };

// NOTE: Function has been remeoved in contract cross verify about it
// export const getEvcRank = async () => {
//   console.log("getEvcRank");
//   let contracts = new web3.eth.Contract(abiEVCNFT, ContractAddressTTAVATARS);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getEvcRank_account", account);
//   //{Decentralized}
//   // const evcRank = await contracts.methods.checkUserRank(account).call();
//   // console.log("evcRank", evcRank);
//   // return evcRank;
//   //{Decentralized}
//   return 3; //{Centralized}
// };