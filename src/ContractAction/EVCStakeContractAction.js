import Web3 from "web3";
import { abiEVCTokenStake } from "./ABI/EVCStake"
import { RPCURL, ContractAddressDead, ContractAddressTRNDToken, CurrentChainID, ContractAddressTRNDVEST } from "./ContractDependency.js"

const abiEVCToken = abiEVCTokenStake

var web3 = new Web3(new Web3.providers.HttpProvider(RPCURL));



export const getBalanceEVC = async () => {
  // console.log("getBalanceEVC");
  let ChecksumAddress = web3.utils.isAddress(ContractAddressTRNDToken);
  console.log("ChecksumAddress", ChecksumAddress, ContractAddressTRNDToken);
  let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0];
  // console.log("getBalanceEVC_account", account);
  const response = await contracts.methods.balanceOf(account).call();
  // console.log("getBalanceEVC", typeof response);
  let balanceOfEvc = web3.utils.fromWei(response, "ether");
  let balanceOfEVC = Number(parseFloat(balanceOfEvc).toFixed(2));
  console.log("balanceOfEVC", balanceOfEVC);
  return balanceOfEvc;
};
getBalanceEVC()
export const getAvailableBalanceEVC = async () => {
  console.log("getAvailableBalanceEVC");
  let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
  const response = await contracts.methods.balanceOf(ContractAddressTRNDToken).call();
  console.log("getAvailableBalanceEVC", response);
  let BalanceOfEVCflex = await web3.utils.fromWei(response, "ether");
  let BalanceOfEVCFlex = parseFloat(BalanceOfEVCflex).toFixed(2);
  return BalanceOfEVCFlex;
};

export const getVestingBalanceEVC = async () => {
  console.log("getVestingBalanceEVC");
  let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
  const response = await contracts.methods.balanceOf(ContractAddressTRNDVEST).call();
  console.log("getVestingBalanceEVC", response);
  let vestingEvcBalance = web3.utils.fromWei(response, "ether");
  let vestingEVCBalance = Number(parseFloat(vestingEvcBalance).toFixed(2));
  console.log("vestingEVCBalance", vestingEVCBalance)
  return vestingEVCBalance;
};

const getContractOwner = async () => {
  console.log("getContractOwner");
  let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
  const response = await contracts.methods.owner().call();
  console.log("response", response);
  return response;
};

export const getOwnerBalance = async () => {
  console.log("getOwnerBalance");
  let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
  const ownerAddress = await getContractOwner();
  const response = await contracts.methods.balanceOf(ownerAddress).call();
  console.log("getOwnerBalance", response);
  let ownerEvcBalance = web3.utils.fromWei(response, "ether");
  let ownerEVCBalance = Number(parseFloat(ownerEvcBalance).toFixed(2));
  return ownerEVCBalance;
};

export const getBurnEVCBalance = async () => {
  console.log("getBurnEVCBalance");
  let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
  const burnAddress = ContractAddressDead;
  const response = await contracts.methods.balanceOf(burnAddress).call();
  console.log("getBurnEVCBalance", response);
  let burnevcBalance = web3.utils.fromWei(response, "ether");
  console.log("burnevcBalance", burnevcBalance)
  let burnEVCBalance = Number(parseFloat(burnevcBalance).toFixed(2));
  console.log("burnEVCBalance", typeof burnEVCBalance)
  return burnEVCBalance;
};
getBurnEVCBalance()



export const allowanceEVC = async (_contractAddress) => {
  console.log("allowanceEVC")
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      // Get the selected account
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
      console.log("i'm here", contracts.methods);
      console.log("account", account);
      console.log("Contractaddress", _contractAddress);
      const response = await contracts.methods.allowance(account, _contractAddress).call();
      console.log("response", response)
      const allowance = web3.utils.fromWei(response, 'ether')
      console.log("EVCAllowance", allowance);
      return allowance;
    }
  } catch (error) {
    return error;
  }
};

export const getEVCBalance = async () => {
  console.log("getEVCBalance")
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      // Get the selected account
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
      console.log("ContractAddressTRNDToken", ContractAddressTRNDToken)
      console.log("i'm here", contracts.methods);
      console.log("account", account);
      const response = await contracts.methods.balanceOf(account).call();
      console.log("mybalanceineth", response)
      const balance = Number((web3.utils.fromWei(response, 'ether')));
      console.log("EVCBalance", balance);
      return balance;
    }
  } catch (error) {
    console.log("balance", error);
  }
};


export const getEVCZeroAddBal = async () => {
  console.log("getEVCZeroAddBal")
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
      const zeroAdd = ContractAddressDead
      const response = await contracts.methods.balanceOf(zeroAdd).call();
      const balance = Number((web3.utils.fromWei(response, 'ether')));
      console.log("EVCZeroAddBal", balance);
      return balance;
    }
  } catch (error) {
    console.log("EVCZeroAddBalERR", error);
  }
};


export const getEVCTotalSupply = async () => {
  console.log("getEVCTotalSupply")
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
      const response = await contracts.methods.TotalSupplyLimit().call();
      const balance = Number((web3.utils.fromWei(response, 'ether')));
      console.log("EVCTotalSupply", balance);
      return balance;
    }
  } catch (error) {
    console.log("EVCTotalSupplyERR", error);
  }
};


export const getEVCCirculatingSupply = async () => {
  // console.log("getEVCCirculatingSupply");
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
      // Get the total supply
      const totalSupplyResponse = await contracts.methods.totalSupply().call();
      const totalSupply = Number(web3.utils.fromWei(totalSupplyResponse, 'ether'));
      // Get the balance of the zero address
      const zeroAdd = ContractAddressDead;
      const zeroAddressBalanceResponse = await contracts.methods.balanceOf(zeroAdd).call();
      const zeroAddressBalance = Number(web3.utils.fromWei(zeroAddressBalanceResponse, 'ether'));
      // Calculate the circulating supply by subtracting the zero address balance from the total supply
      const circulatingSupply = totalSupply - zeroAddressBalance;
      // console.log("EVCCirculatingSupply", circulatingSupply);
      return circulatingSupply;
    }
  } catch (error) {
    console.log("EVCCirculatingSupplyERR", error);
  }
};
getEVCCirculatingSupply()

export const getTotalEvcCirculatingSupply = async () => {
  // console.log("getTotalEvcCirculatingSupply");
  let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
  const totalEvcCirculatingSupplyInWei = await contracts.methods.circulatingSupply().call();
  // console.log("totalEvcCirculatingSupplyInWei", totalEvcCirculatingSupplyInWei);
  const totalEvcCirculatingSupplyInEth = web3.utils.fromWei(totalEvcCirculatingSupplyInWei, 'ether')
  // console.log("totalEvcCirculatingSupplyInEth", totalEvcCirculatingSupplyInEth);
  return totalEvcCirculatingSupplyInEth;
}
getTotalEvcCirculatingSupply()





















// NOTE: EVC deployed for providing liquidity remove it when addressess are being changed 
// and also replace variable in allownceEVC function and also remove ABIEVCToken in EVCStake.js in ABI file


//dev: Flexible Staking

// export const setStakeFlex = async (_amount) => {
//   console.log("_amount", _amount);
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     // Get the selected account
//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const account = accounts[0];
//     const currentChainId = await web3.eth.net.getId();
//     if (currentChainId !== CurrentChainID) {
//       await web3.currentProvider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
//       });
//     }
//     const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//     console.log(contracts);
//     const amount = _amount;
//     console.log("amountStakeFlex", amount);
//     const _finalamount = web3.utils.toWei(_amount);
//     console.log("_finalamountStakeFlex", _finalamount);
//     const planId = 1;
//     console.log("planId", planId)
//     const stakeAmount = await contracts.methods.stakeFlex(_finalamount, planId).send({ from: account });
//     console.log("setStakeFlex", stakeAmount);
//   }
// };

//dev: get Staked Ids Flex Stake
// export const getStakedIdsFlexStake = async () => {
//   console.log("getStakedIdsFlexStake");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getStakedIdsFlexStake", account);
//   const response = await contracts.methods.getStakedflexId(account).call();
//   const resCopy = [...response].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
//   console.log("getStakedIdsFlexStake", resCopy);
//   return resCopy;
// };

// export const getFlexUnStakedBeforeTimeIds = async () => {
//   console.log("getFlexUnStakedBeforeTimeIds");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getFlexUnStakedBeforeTimeIds_account", account);
//   const response = await contracts.methods.getFlexUnstakeBeforeTime(account).call();
//   const resCopy = [...response].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
//   console.log("getFlexUnStakedBeforeTimeIds_res", resCopy);
//   return resCopy;
// };

// export const getFlexUnStakedBeforeTimeInfo = async () => {
//   const flexUnStakedBeforeTimeInfo = [];
//   console.log("getFlexUnStakedBeforeTimeInfo");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getFlexUnStakedBeforeTimeInfo_account", account);
//   const ids = await getFlexUnStakedBeforeTimeIds();
//   for(var i = 0; i < ids.length; i++){
//     const response = await contracts.methods.flexUnstakeBeforeTimeInfo(account, ids[i]).call();
//     flexUnStakedBeforeTimeInfo.push(response)
//     console.log("response", response)
//   }
//   console.log("getFlexUnStakedBeforeTimeInfo_res", flexUnStakedBeforeTimeInfo);
//   return flexUnStakedBeforeTimeInfo;
// };

//dev: get User Staked Flex
// export const getUserStakedFlex = async () => {
//   const stakeDetail = []
//   console.log("getUserStakedFix");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getUserStakedFix_account", account);
//   const ids = await getStakedIdsFlexStake();
//   console.log("getIDS", ids);
//   for (var i = 0; i < ids.length; i++) {
//     const response = await contracts.methods.userStakedFlex(account, ids[i]).call();
//     stakeDetail.push(response)
//     console.log("response", response)
//   }
//   console.log("getUserStakedFixnoloop_res", stakeDetail);
//   return stakeDetail;
// };

//dev: set Unstake Flex
// export const setUnstakeFlex = async (_id) => {
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     // Get the selected account
//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const account = accounts[0];
//     const currentChainId = await web3.eth.net.getId();
//     if (currentChainId !== CurrentChainID) {
//       await web3.currentProvider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
//       });
//     }
//     const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//     console.log(contracts);
//     console.log("id", _id);
//     const unstakeAmount = await contracts.methods.unstakeFlex(_id).send({ from: account });
//     console.log("unstakeFlex", unstakeAmount);
//   }
// };

//dev: set Claim Reward Flex
// export const setClaimRewardFlex = async (_id) => {
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     // Get the selected account
//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const account = accounts[0];
//     const currentChainId = await web3.eth.net.getId();
//     if (currentChainId !== CurrentChainID) {
//       await web3.currentProvider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
//       });
//     }
//     const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//     console.log(contracts);
//     console.log("id", _id);
//     const claimrewardFlex = await contracts.methods.claimRewardFlex(_id).send({ from: account });
//     console.log("claimrewardFlex", claimrewardFlex);
//   }
// };

//dev: get Deposit Info Stake Flex
// function defined never used nor such view function in new contract
// export const getDepositInfoStakeFlex = async () => {
//   console.log("getDepositInfoStakeFlex");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getDepositInfoStakeFlex_account", account);
//   const response = await contracts.methods.getDepositInfoFlex(account).call();
//   console.log("response", response);
//   let res = response._stake;
//   console.log("getDepositInfoStakeFlex_stake", res);
//   let stakeFlexTotalDeposit = await web3.utils.fromWei(res, "ether");
//   return stakeFlexTotalDeposit;
// };

//dev: get Deposit At Stake Flex
// function defined never used nor such view function in new contract
// export const getDepositAtStakeFlex = async () => {
//   console.log("getDepositAtStakeFlex");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const response = await contracts.methods.getDepositAtFlex().call();
//   console.log("getDepositAtStakeFlex_DepositAt", response);
//   return response;
// };

// export const claimLockStakeFlex = async () => {
//   console.log("claimLockStakeFlex");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const response = await contracts.methods.claimLockFlex().call();
//   console.log("claimLockStakeFlex", response);
//   return response;
// };

// export const getApyFlex = async () => {
//   console.log("getApyFlex");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const response = await contracts.methods.getFlexApr(1).call();
//   console.log("getApyFlex", response);
//   const apy = (response / 100).toLocaleString(undefined, {maximumFractionDigits:2});
//   console.log("apy", apy);
//   return apy;
// };



//dev: Fix Staking

// export const setStakeFix = async (_amount, _id) => {
//   console.log("_amountFix", _amount);
//   console.log("_idFix", _id);
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     // Get the selected account
//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const account = accounts[0];
//     const currentChainId = await web3.eth.net.getId();
//     if (currentChainId !== CurrentChainID) {
//       await web3.currentProvider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
//       });
//     }
//     const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//     console.log(contracts);
//     const amount = _amount;
//     console.log("amountStakeFix", amount);
//     const _amounttowei = web3.utils.toWei(_amount);
//     console.log("_amounttoweiFix", _amounttowei);
//     const finalamount = _amounttowei;
//     console.log("finalamountStakeFix", finalamount);
//     const id = _id;
//     console.log("_idStakeFix", id);
//     const stakeAmount = await contracts.methods.stakeFix(finalamount, id).send({ from: account });
//     console.log("setStakeFix", stakeAmount);
//   }
// };

// export const getStakedIdsFixStake = async () => {
//   console.log("getStakedIdsFixStake");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getStakedIdsFixStake_account", account);
//   const response = await contracts.methods.getStakedFixid(account).call();
//   const resCopy = [...response].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
//   console.log("getStakedIdsFixStake", resCopy);
//   return resCopy;
// };

// export const getUserStakedFix = async () => {
//   const stakeDetail = []
//   console.log("getUserStakedFix");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getUserStakedFix_account", account);
//   const ids = await getStakedIdsFixStake();
//   console.log("getIDS", ids);
//   for (var i = 0; i < ids.length; i++) {
//     const response = await contracts.methods.userStakedFix(account, ids[i]).call();
//     stakeDetail.push(response)
//     console.log("response", response)
//   }
//   console.log("getUserStakedFixnoloop_res", stakeDetail);
//   // const response = await contracts.methods.userStakedFix(account, ids[0]).call();
//   return stakeDetail;
// };

// export const setUnstakeFix = async (_id) => {
//   console.log("_idStakedFix", _id);
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     // Get the selected account
//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const account = accounts[0];
//     const currentChainId = await web3.eth.net.getId();
//     if (currentChainId !== CurrentChainID) {
//       await web3.currentProvider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
//       });
//     }
//     const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//     console.log(contracts);
//     const id = _id
//     console.log("_idStakedFix", id);
//     const unstakeAmount = await contracts.methods.unstakeFix(id).send({ from: account });
//     console.log("setUntakeFix", unstakeAmount);
//   }
// };

// export const setClaimRewardFix = async (_id) => {
//   console.log("_idClaimFix", _id);
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     // Get the selected account
//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const account = accounts[0];
//     const currentChainId = await web3.eth.net.getId();
//     if (currentChainId !== CurrentChainID) {
//       await web3.currentProvider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
//       });
//     }
//     const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//     console.log(contracts);
//     const id = _id  
//     console.log("_idClaimFix", id);
//     const unstakeAmount = await contracts.methods.claimRewardFix(id).send({ from: account });
//     console.log("setClaimRewardFix", unstakeAmount);
//   }
// };

// // function defined never used nor such view function in new contract
// export const getStakeTimeFix = async () => {
//   console.log("getStakeTimeFix");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getStakeTimeFix_account", account);
//   const ids = await getStakedIdsFixStake();
//   const stakeTime = []
//   console.log("getIDS", ids);
//   for (var i = 0; i < ids.length; i++) {
//     const response = await contracts.methods.userStakedFix(account, ids[i]).call();
//     stakeTime.push(response.stakeTime)
//   }
//   console.log("stakeDetailresponse", stakeTime);
//   let res = stakeTime;
//   console.log("getStakeTimeFix_stakeTime", res);
//   let stakeTimeFix = res;
//   console.log("stakeTimeFix", stakeTimeFix);
//   return stakeTimeFix;
// };

// export const getApyFix = async () => {
//   console.log("getApyFix");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const planlength = await contracts.methods.fixPlanCount().call();
//   let planApy = [];
//   for (let i = 1; i <= planlength; i++){
//     const response = await contracts.methods.getFixApr(i).call();
//     console.log("getApyFixwithout", response);
//     const apyPrecentage = response / 100;
//     const formattedApy = apyPrecentage.toLocaleString(undefined, {maximumFractionDigits:2})
//     planApy.push(formattedApy);
// }
//   console.log("getApyFix", planApy);
//   return planApy;
// };

// Both Flex & Fix

// export const getTotalStakedEVC = async () => {
//   console.log("getTotalStakedEVC");
//   let contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
//   const accounts = await window.ethereum.request({
//     method: "eth_accounts",
//   });
//   const account = accounts[0];
//   console.log("getTotalStakedEVC_account", account);
//   const response = await contracts.methods.getTotalStaked().call();
//   console.log("getTotalStakedEVC",typeof response);
//   let totalstakedbalanceEVC = web3.utils.fromWei(response, "ether");
//   let totalStakedBalanceEVC = Number(parseFloat(totalstakedbalanceEVC).toFixed(2));
//   console.log("getTotalStakedEVC",typeof totalStakedBalanceEVC);
//   return totalStakedBalanceEVC;
// };