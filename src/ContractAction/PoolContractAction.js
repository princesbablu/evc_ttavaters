import Web3 from "web3";
import { abiPool } from "./ABI/Pool";
import { RPCURL,CurrentChainID, ContractAddressTRNDVEST } from "./ContractDependency.js"

var web3 = new Web3(new Web3.providers.HttpProvider(RPCURL));


export const getRemainingRbEvcValue = async () => {
    console.log("getRemainingRbEvcValue");
    let contracts = new web3.eth.Contract(abiPool, ContractAddressTRNDVEST);
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const account = accounts[0];
    console.log("getRemainingRbEvcValue_account", account);
    const response = await contracts.methods.getRemainingTTAmountRB(account).call();
    console.log("getRemainingRbEvcValue", response);
    const rbEvcValueRemaining = web3.utils.fromWei(response, 'ether');
    console.log("rbEvcValueRemaining", rbEvcValueRemaining);
    return rbEvcValueRemaining;
};
getRemainingRbEvcValue()

export const getClaimedRbEvcValue = async () => {
    console.log("getClaimedRbEvcValue");
    let contracts = new web3.eth.Contract(abiPool, ContractAddressTRNDVEST);
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const account = accounts[0];
    console.log("getClaimedRbEvcValue_account", account);
    const response = await contracts.methods.getUserTTRedeemedAmount(account).call();
    console.log("getClaimedRbEvcValue", response);
    const rbEvcValueClaimed = web3.utils.fromWei(response, 'ether');
    console.log("rbEvcValueClaimed", rbEvcValueClaimed);
    return rbEvcValueClaimed;
};

export const getRbClaimPerc = async () => {
    console.log("getRbClaimPerc");
    let contracts = new web3.eth.Contract(abiPool, ContractAddressTRNDVEST);
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const account = accounts[0];
    console.log("getRbClaimPerc_account", account);
    const RbClaimPerc = await contracts.methods.getRewardPercentageTTRB(account).call();
    console.log("RbClaimPerc", RbClaimPerc);
    return RbClaimPerc;
};

export const setClaimRB = async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== CurrentChainID) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
            });
        }
        const contracts = new web3.eth.Contract(abiPool, ContractAddressTRNDVEST);
        console.log(contracts);
        const estimatedGasLimit = await contracts.methods
            .claimVestRB()
            .estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const claimvestRb = await contracts.methods.claimVestRB().send({
            from: account,
            gas: estimatedGasLimit,
            gasPrice: gasPrice
        });
        console.log("claimvestRb", claimvestRb);
        console.log('claimvestRb_transactionHash:', claimvestRb.transactionHash);
        return claimvestRb.transactionHash;;
    }
};