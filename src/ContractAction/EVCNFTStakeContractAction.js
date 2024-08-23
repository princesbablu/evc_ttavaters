import Web3 from "web3";
import { abiEVCNFTStake } from "./ABI/EVCNFTStake"
import { postNotification, getUserMintedTrendNFTAvatars } from "./EVCNFTContractAction"
import { RPCURL, CurrentChainID, ContractAddressTTAVATARSSTAKE } from "./ContractDependency.js"


//dev: HttpProvider
var web3 = new Web3(new Web3.providers.HttpProvider(RPCURL));



//dev: NFT Stake
export const setStakeNFT = async (_id) => {
    console.log("_idStakeNFT", _id);
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
        const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
        console.log(contracts);
        // const planId = 1;
        // console.log("planId", planId);
        const id = _id.split(",")
        console.log("_idStakeNFT", id);
        const estimatedGasLimit = await contracts.methods
            .stakeAvatar(id)
            .estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const nftStake = await contracts.methods.stakeAvatar(id).send({
            from: account,
            gas: estimatedGasLimit,
            gasPrice: gasPrice
        });
        console.log("nftStake", nftStake);
        console.log("nftStakeTXHASH", nftStake.transactionHash);
        let messageNotification = `Staked Avatar: ${id}`;
        await postNotification(account, messageNotification);
        return nftStake.transactionHash;
    }
};

//dev: Set Withdraw NFT
export const setWithdrawNFT = async (_id) => {
    console.log("_idNFTUnStake", _id);
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the selected account
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== CurrentChainID) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
            });
        }
        const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
        console.log(contracts);
        const id = _id.split(",")
        console.log("_idWithdrawNFT", id);
        const estimatedGasLimit = await contracts.methods
            .unstakeAvatar(id)
            .estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const nftUnStake = await contracts.methods.unstakeAvatar(id).send({
            from: account,
            gas: estimatedGasLimit,
            gasPrice: gasPrice
        });
        console.log("nftUnStake", nftUnStake);
        let messageNotification = `Unstaked Avatar: ${id}`;
        await postNotification(account, messageNotification);
        if (nftUnStake) {
            // window.location.reload();
        }
        console.log("nftUnStake", nftUnStake);
        console.log("nftUnStakeTXHASH", nftUnStake.transactionHash);
        return nftUnStake.transactionHash;

    }
};

//dev: Set Claim Rewards
export const setClaimReward = async (_id) => {
    console.log("_NFTidClaim", _id);
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the selected account
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== CurrentChainID) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
            });
        }
        const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
        console.log(contracts);
        const id = _id.split(",");
        console.log("_NFTidClaim", id);
        const estimatedGasLimit = await contracts.methods
            .claimTTReward(id)
            .estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const idClaimValue = await contracts.methods.claimTTReward(id).send({
            from: account,
            gas: estimatedGasLimit,
            gasPrice: gasPrice
        });
        let messageNotification = `Claimed Avatar-Staked Rewards`;
        await postNotification(account, messageNotification);
        if (idClaimValue) {
            // window.location.reload();
        }
        console.log("setClaimNFTReward", idClaimValue);
        return idClaimValue.transactionHash;
    }
};

//dev: Set Repurchase NFT
export const setRepurchaseNFT = async (_id) => {
    console.log("_idRepurchaseNFT", _id);
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
        const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
        console.log(contracts);
        // const id = _id.split(",")
        // console.log("_idRepurchaseNFT", id);
        const estimatedGasLimit = await contracts.methods
            .repurchase(account, _id)
            .estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const repurchaseNFT = await contracts.methods.repurchase(account, _id).send({
            from: account,
            gas: estimatedGasLimit,
            gasPrice: gasPrice
        });
        console.log("RepurchaseNFT", repurchaseNFT);
        let messageNotification = `Repurchased Avatar: ${_id}`;
        await postNotification(account, messageNotification);
    }
};


export const getRepurchaseLimit = async (_id) => {
    console.log("getRepurchaseLimit");
    let contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    const repurchaseLimitWeiValue = await contracts.methods.tokenIdRepurchaseLimit(_id).call();
    // const repurchaseLimitEthValue = web3.utils.fromWei(repurchaseLimitWeiValue, "ether");
    console.log("repurchaseLimitEthValue", repurchaseLimitWeiValue);
    return repurchaseLimitWeiValue;
};

//dev: Get Tokens of Staker
export const getTokensOfStaker = async () => {
    console.log("getTokensOfStaker");
    let contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    const accounts = await window.ethereum.request({
        method: "eth_accounts",
    });
    const account = accounts[0];
    console.log("gettokensOfStakerNFTIDs_account", account);
    const tokensOfStakerNFTIDs = await contracts.methods.getAvatarsOfStaker(account).call();
    console.log("tokensOfStakerNFTIDs", tokensOfStakerNFTIDs);
    return tokensOfStakerNFTIDs;
};

export const getRewardPercentage = async (_id) => {
    console.log("getRewardPercentage");
    let contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    const accounts = await window.ethereum.request({
        method: "eth_accounts",
    });
    const account = accounts[0];
    console.log("getRewardPercentage_account", account);
    const rewardPercentage = await contracts.methods.getTTRewardPercentage(account, _id).call();
    console.log("rewardPercentage", rewardPercentage);
    return rewardPercentage;
};

//dev: Get Unclaimable Reward
export const getUnClaimableReward = async (_id) => {
    console.log("_NFTidClaim", _id);
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log(contracts);
    // const id = _id.split(",")
    // console.log("_NFTidClaim", id);
    const idUnClaimValue = await contracts.methods.getUnclaimedTTReward(_id).call();
    console.log("getUnClaimedReward", idUnClaimValue);
    let claimableNFTreward = web3.utils.fromWei(idUnClaimValue, "ether");
    console.log("claimableNFTreward", claimableNFTreward);
    let UnClaimedReward = parseFloat(claimableNFTreward).toFixed(6);
    console.log("UnClaimedReward", UnClaimedReward);
    return UnClaimedReward;
};
// getUnClaimableReward(90001)

export const getEVCToBUSDAmountsOut = async (_id) => {
    console.log("_NFTidClaim", _id);
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log(contracts);
    // const id = _id.split(",")
    // console.log("_NFTidClaim", id);
    let claimedEvc = await getRepurchaseLimit(_id)
    if (claimedEvc > 0) {
        const EVCToBUSDAmountsOutwei = await contracts.methods.getAmountoutTTToUsdc(claimedEvc).call();
        console.log("getUnClaimedReward", EVCToBUSDAmountsOutwei);
        let EVCToBUSDAmountsOut = web3.utils.fromWei(EVCToBUSDAmountsOutwei, "ether");
        let EVCtoBUSDAmountsOut = Number(EVCToBUSDAmountsOut).toFixed(4);
        console.log("EVCtoBUSDAmountsOut", EVCtoBUSDAmountsOut);
        return EVCtoBUSDAmountsOut;
    }
    return 0;
};

export const getamountsoutEVCToBUSD = async (_amountIn) => {
    console.log("_amountIn", _amountIn);
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log(contracts);
    if (_amountIn > 0) {
        let _amountInWei = web3.utils.toWei(_amountIn, "ether");
        const EVCToBUSDAmountsOutwei = await contracts.methods.getAmountoutTTToUsdc(_amountInWei).call();
        console.log("EVCToBUSDAmountsOutwei", EVCToBUSDAmountsOutwei);
        // let EVCToBUSDAmountsOut = web3.utils.fromWei(EVCToBUSDAmountsOutwei, "ether");
        let EVCToBUSDAmountsOut = Number(EVCToBUSDAmountsOutwei) / 10 ** 6;
        let EVCtoBUSDAmountsOut = Number(EVCToBUSDAmountsOut).toFixed(4);
        console.log("EVCtoBUSDAmountsOut1", EVCtoBUSDAmountsOut);
        return EVCtoBUSDAmountsOut;
    }
    return 0;
};

export const getCheckRepurchase = async (_id) => {
    console.log("getCheckRepurchaseId", _id);
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log(contracts);
    const accounts = await window.ethereum.request({
        method: "eth_accounts",
    });
    const account = accounts[0];
    const CheckRepurchase = await contracts.methods.checkRepurchase(account, _id).call();
    console.log("CheckRepurchase", CheckRepurchase);
    return CheckRepurchase;
};

export const getIsToBeCheckRepurchase = async () => {
    console.log("getIsToBeCheckRepurchase");
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log(contracts);
    const accounts = await window.ethereum.request({
        method: "eth_accounts",
    });
    const account = accounts[0];
    const userTokenId = await getUserMintedTrendNFTAvatars(account);
    console.log("userTokenId", userTokenId);
    const tokenIdArray = [1, 600001, 900001, 1100001, 1200001, 1250001, 1270001, 1280001];
    const expectedCheckRepurchase = [false, false, false, false, false, false, false, false];
    const checkRepurchaseResults = expectedCheckRepurchase.map(() => false);
    if (userTokenId.length > 0) {
        for (let i = 0; i < userTokenId.length; i++) {
            const _id = userTokenId[i];
            const index = tokenIdArray.indexOf(_id);
            if (index !== -1) {
                checkRepurchaseResults[index] = true;
            }
        }
    }
    console.log("checkRepurchaseResults", checkRepurchaseResults);
    return checkRepurchaseResults;
};
getIsToBeCheckRepurchase()

export const getTokenInfos = async (_id) => {
    console.log("getTokenInfos", _id);
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log(contracts);
    const tokenInfo = await contracts.methods.getTrendTokenInfo(_id).call();
    console.log("tokenInfo", tokenInfo);
    return tokenInfo;
};

//dev: get Next ClaimTime
export const getNextClaimingTime = async (_id) => {
    console.log("_NFTidNextClaim", _id);
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log(contracts);
    const accounts = await window.ethereum.request({
        method: "eth_accounts",
    });
    const account = accounts[0];
    console.log("getNFTNextClaim_account", account);
    // const id =( _id.split(",")).toString();
    // console.log("_NFTidNextClaim", id);
    const nextClaim = await contracts.methods.getNextClaimTime(account, _id).call();
    console.log("NextClaim111", nextClaim);
    const ClaimTime = window.localStorage.setItem("nextClaim ", nextClaim);
    console.log("ClaimTime", ClaimTime)
    return nextClaim;
};

//dev: get Current APR Of Plan
export const getCurrentAPROfNFTLevel = async (tokenId) => {
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log("APRForNftLevel", tokenId);
    const CurrentAPR = await contracts.methods.getCurrentAPRForAvatarId(tokenId).call();
    console.log("CurrentAPR", CurrentAPR);
    // const CurrentAprPerc = CurrentAPR;
    // console.log("CurrentAprPerc", CurrentAprPerc);
    return CurrentAPR;
};








//dev: get Stake Balances NFTs
// defined but never used nor such view function in contract.
export const getStakeBalancesNFTs = async () => {
    console.log("getStakeBalancesNFTs");
    let contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    const accounts = await window.ethereum.request({
        method: "eth_accounts",
    });
    const account = accounts[0];
    console.log("getStakeBalancesNFTs_account", account);
    const stakeBalancesNFTs = await contracts.methods.stakeBalances(account).call();
    console.log("stakeBalancesNFTs", stakeBalancesNFTs);
    return stakeBalancesNFTs;
};

//dev: get Stake Balances NFTs
// defined but never used nor such view function in contract.
export const getFinalWithdraw = async (_id) => {
    console.log("_NFTidFinalWithdraw", _id);
    const contracts = new web3.eth.Contract(abiEVCNFTStake, ContractAddressTTAVATARSSTAKE);
    console.log(contracts);
    const accounts = await window.ethereum.request({
        method: "eth_accounts",
    });
    const account = accounts[0];
    console.log("getNFTFinalWithdraw_account", account);
    const id = _id.split(",")
    console.log("_NFTidFinalWithdraw", id);
    const nextClaim = await contracts.methods.final_ID_withdraw(account, id).call();
    console.log("getFinalWithdraw", nextClaim);
    return nextClaim;
};