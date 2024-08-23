import Web3 from "web3";
import { abiEVCTokenStake } from "./ABI/EVCStake"
import { ABIPancakeRouter } from "./ABI/PancakeRouter"
import { abiBUSD } from "./ABI/BUSD";
import { APISWAPTRADEHISTORY, ContractAddressTRNDToken, ContractAddressTrendRouter, ContractAddressPairTRNDUSDC, CurrentChainID } from "./ContractDependency.js";
import { postNotification } from "../ContractAction/EVCNFTContractAction";

const abiEVCToken = abiEVCTokenStake
const abiEVCRouter = ABIPancakeRouter;
const ContractAddressUSDC = "0xf9a9623ff0cf59ddf7d9d08f79807129996e993b";



export const allowanceBusdtoEvcRouter = async () => {
    console.log("allowanceBusdtoEvcRouter")
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const account = accounts[0];
            const contracts = new web3.eth.Contract(abiBUSD, ContractAddressUSDC);
            console.log("account", account);
            console.log("ContractAddressTrendRouter", ContractAddressTrendRouter);
            const response = await contracts.methods.allowance(account, ContractAddressTrendRouter).call();
            const allowance = web3.utils.fromWei(response, 'ether')
            console.log("allowanceBusdtoEvcRouter", allowance);
            return allowance;
        }
    } catch (error) {
        console.log("allowanceBusdtoEvcRouter_error", error);
    }
};
allowanceBusdtoEvcRouter()

export const allowanceEvcTokentoEvcRouter = async () => {
    console.log("allowanceEvcTokentoEvcRouter")
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const account = accounts[0];
            const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
            console.log("account", account);
            console.log("ContractAddressTrendRouter", ContractAddressTrendRouter);
            const response = await contracts.methods.allowance(account, ContractAddressTrendRouter).call();
            const allowance = web3.utils.fromWei(response, 'ether')
            console.log("allowanceEvcTokentoEvcRouter", allowance);
            return allowance;
        }
    } catch (error) {
        console.log("allowance", error);
    }
};

export const setBUSDApproveRouter = async (amountBusd) => {
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // Get the selected account
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            console.log("accounts", accounts)
            const account = accounts[0];
            const currentChainId = await web3.eth.net.getId();
            if (currentChainId !== CurrentChainID) {
                await web3.currentProvider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
                });
            }
            const contracts = new web3.eth.Contract(abiBUSD, ContractAddressUSDC);
            const amountBusdInWei = web3.utils.toWei(amountBusd.toString(), 'ether');
            console.log({ amountBusdInWei })
            const estimatedGasLimit = await contracts.methods
                .approve(ContractAddressTrendRouter, amountBusdInWei)
                .estimateGas({ from: account });
            const gasPrice = await web3.eth.getGasPrice();
            const approveRouter = await contracts.methods.approve(ContractAddressTrendRouter, amountBusdInWei).send({
                from: account,
                gas: estimatedGasLimit,
                gasPrice: gasPrice
            });
            if (approveRouter) {
                return true;
            }
        };
    } catch (error) {
        console.log("approveRouter", error);
    }
};

export const setEVCTokenApproveEvcRouter = async (amount) => {
    console.log("setEVCTokenApproveEvcRouter");
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
            const contracts = new web3.eth.Contract(abiEVCToken, ContractAddressTRNDToken);
            const amountEvcInWei = web3.utils.toWei(amount.toString(), 'ether');
            const estimatedGasLimit = await contracts.methods
                .approve(ContractAddressTrendRouter, amountEvcInWei)
                .estimateGas({ from: account });
            const gasPrice = await web3.eth.getGasPrice();
            const approveEvcRouter = await contracts.methods
                .approve(ContractAddressTrendRouter, amountEvcInWei)
                .send({
                    from: account,
                    gas: estimatedGasLimit,
                    gasPrice: gasPrice
                });
            console.log("setEVCTokenApproveEvcRouter", approveEvcRouter);
        }
    } catch (error) {
        console.log("approveEvcRouterError", error);
    }
};

export const setSwapStableForTokens = async (amountIn) => {
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            // Ensure the user is connected to their wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Get the selected account
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });
            const account = accounts[0];
            // Create a new instance of the contract
            const contract = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
            // Convert the input values to BigNumber or use string (if required)
            const amountInWei = web3.utils.toWei(amountIn.toString(), 'ether');
            console.log("amountInWei", amountInWei)
            const amountOutMin = 1;
            const amountOutMinWei = web3.utils.toWei(amountOutMin.toString(), 'ether');
            console.log("amountOutMinWei", amountOutMinWei)
            // Calculate the deadline as 10 minutes ahead of the current time
            const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
            const deadline = currentTimestamp + 600; // 600 seconds = 10 minutes
            // Execute the swapExactTokensForTokens2 function
            const estimatedGasLimit = await contract.methods
                .swapExactTokensForTokens2(amountInWei, amountOutMinWei, account, account, deadline)
                .estimateGas({ from: account });
            const gasPrice = await web3.eth.getGasPrice();
            const result = await contract.methods
                .swapExactTokensForTokens2(amountInWei, amountOutMinWei, account, account, deadline)
                .send({
                    from: account,
                    gas: estimatedGasLimit,
                    gasPrice: gasPrice
                });
            console.log('setSwapStableForTokens_result:', result);
        }
    } catch (error) {
        console.error('setSwapStableForTokens_error:', error);
    }
};

export const setSwapTokensForStable = async (amountIn) => {
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });
            const account = accounts[0];
            const contract = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
            const amountInWei = web3.utils.toWei(amountIn.toString(), 'ether');
            console.log("amountInWei", amountInWei)
            const amountOutMin = 0;
            // const amountOutMinWei = web3.utils.toWei(amountOutMin.toString(), 'ether');
            // console.log("amountOutMinWei", amountOutMinWei)
            const path = [
                ContractAddressTRNDToken,
                ContractAddressUSDC
            ];
            const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
            const deadline = currentTimestamp + 600; // 600 seconds = 10 minutes
            const checkTaxedPair = await contract.methods.taxedPair(ContractAddressPairTRNDUSDC).call();
            console.log("checkTaxedPair", checkTaxedPair);
            let result;
            if (!checkTaxedPair) {
                const estimatedGasLimit = await contract.methods
                    .swapExactTokensForTokensSupportingFeeOnTransferTokens(amountInWei, amountOutMin, path, account, deadline)
                    .estimateGas({ from: account });
                const gasPrice = await web3.eth.getGasPrice();
                result = await contract.methods
                    .swapExactTokensForTokensSupportingFeeOnTransferTokens(amountInWei, amountOutMin, path, account, deadline)
                    .send({
                        from: account,
                        gas: estimatedGasLimit,
                        gasPrice: gasPrice
                    });
            } else {
                const estimatedGasLimit = await contract.methods
                    .swapExactTokensForTokens2(amountInWei, amountOutMin, path, account, deadline)
                    .estimateGas({ from: account });
                const gasPrice = await web3.eth.getGasPrice();
                result = await contract.methods
                    .swapExactTokensForTokens2(amountInWei, amountOutMin, path, account, deadline)
                    .send({
                        from: account,
                        gas: estimatedGasLimit,
                        gasPrice: gasPrice
                    });
            }
            console.log('swapExactTokensForTokens_E2B_result:', result);
            let amountOut = await getValueOutEvcToBusd(amountIn);
            console.log("swapExactTokensForTokensamountOut", amountOut);
            const requestBody = {
                maker: account,
                type: 'Sell',
                from: amountIn,
                to: amountOut,
                price: amountOut,
            };
            const apiResponse = await fetch(APISWAPTRADEHISTORY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const responseData = await apiResponse.json();
            console.log('SwapTradeHistoryApiData:', responseData);
            let notificationMessage = `swapped ${amountIn} TRND for: ${amountOut} USDC`
            await postNotification(account, notificationMessage)
            console.log('swapExactTokensForTokens_E2B_resultHash:', result.transactionHash);
            return result.transactionHash;;
        }
    } catch (error) {
        console.error('swapExactTokensForTokens_E2B_error:', error);
    }
};


export const getValueOutEvcToBusd = async (amountEvc) => {
    if (amountEvc > 0) {
        console.log("amountEvc", amountEvc);
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const contracts = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
            console.log("getValueOutEvcToBusdcontracts", contracts);
            const path = [
                ContractAddressTRNDToken,
                ContractAddressUSDC
            ];
            console.log("e2bpath", path)
            // alert(path)
            const _finalamountWei = web3.utils.toWei(amountEvc.toString(), 'ether');
            console.log("getValueOutEvcToBusd_finalamountWei", _finalamountWei)
            const response = await contracts.methods.getAmountsOut(_finalamountWei, path).call();
            console.log("getValueOutEvcToBusdContractresponse:", response);
            const res = response[1];
            // let resultAmount = web3.utils.fromWei(res, 'ether')
            let resultAmount = Number(res) / 10 ** 6;
            console.log("resultAmountE2B", resultAmount)
            let resultValue = parseFloat(resultAmount).toFixed(8)
            console.log("resultValueE2B", resultValue)
            return resultValue;
            // return response;
        } else {
            console.log("enter valid amount")
        }
    } else {
        return 0;
    }
};
getValueOutEvcToBusd(100)

export const getValueOutBusdToEvc = async (amountBusd) => {
    if (amountBusd > 0) {
        console.log("amountBusd", amountBusd);
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);

            const contracts = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);

            console.log(contracts);
            const path = [
                ContractAddressUSDC,
                ContractAddressTRNDToken
            ];
            console.log("amount", typeof amountBusd)
            // const _finalamountWei = new web3.utils.BN(web3.utils.toWei(amountBusd.toString(), 'ether'));
            const _finalamountWei = Number(amountBusd) * 10 ** 6;
            console.log("_finalamountWei", _finalamountWei)
            const response = await contracts.methods.getAmountsOut(_finalamountWei, path).call();
            console.log("Contract response:", response);
            const res = response[1];
            let resultAmount = web3.utils.fromWei(res, 'ether')
            console.log("resultAmountB2E", resultAmount)
            let resultValue = parseFloat(resultAmount).toFixed(8)
            console.log("resultAmountB2E", resultValue)
            return resultValue;
            // return response;
        } else {
            console.log("enter valid amount")
        }
    } else {
        return 0;
    }
}

export const getAmountUserSwappedEvctoBusd = async () => {
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            // Get the selected account
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });
            const account = accounts[0];
            console.log("getAmountUserSwappedEvctoBusd_account", account);
            // Create a new instance of the contract
            const contract = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
            const amountUserSwappedEvctoBusdInWei = await contract.methods.getUserSwapEvctoBusdAmount(account).call();
            console.log("amountUserSwappedEvctoBusdInWei", amountUserSwappedEvctoBusdInWei);
            // Convert the result to a human-readable format
            const amountUserSwapEvctoBusd = web3.utils.fromWei(amountUserSwappedEvctoBusdInWei, "ether");
            console.log("amountUserSwapEvctoBusd", amountUserSwapEvctoBusd);
            // Round the amount to 6 decimal places
            const amountuserSwapEvctoBusd = parseFloat(amountUserSwapEvctoBusd).toFixed(6);
            console.log("getAmountUserSwappedEvctoBusd_return", amountuserSwapEvctoBusd);
            // return amountuserSwapEvctoBusd;
            return 2;

        }
    } catch (error) {
        console.error('getAmountUserSwappedEvctoBusd_error:', error);
    }
};

export const getUserTotalledEVCMinted = async () => {
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            // Get the selected account
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });
            const account = accounts[0];
            console.log("getUserTotalledEVCMinted_account", account);
            // Create a new instance of the contract
            const contract = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
            const userTotalEVCMintedInWei = await contract.methods.getUserTotalEVCMinted(account).call();
            console.log("userTotalEVCMintedInWei", userTotalEVCMintedInWei);
            // Convert the result to a human-readable format
            const userTotalEVCMinted = web3.utils.fromWei(userTotalEVCMintedInWei, "ether");
            console.log("userTotalEVCMinted", userTotalEVCMinted);
            // Round the amount to 6 decimal places
            const userTotalledEVCMinted = parseFloat(userTotalEVCMinted).toFixed(6);
            console.log("getUserTotalledEVCMinted_return", userTotalledEVCMinted);
            return userTotalledEVCMinted;
            // return 3;
        }
    } catch (error) {
        console.error('getUserTotalledEVCMinted_error:', error);
    }
};

export const estimateGasFeeForSwapBUSDToEVC = async (amountIn) => {
    if (amountIn > 0) {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                // Get the selected account
                const accounts = await window.ethereum.request({
                    method: 'eth_accounts',
                });
                const account = accounts[0];
                // Create a new instance of the contract
                const contract = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
                // Convert the input values to BigNumber or use string (if required)
                const amountInWei = web3.utils.toWei(amountIn.toString(), 'ether');
                const amountOutMin = 1;
                const amountOutMinWei = web3.utils.toWei(amountOutMin.toString(), 'ether');
                const path = [
                    ContractAddressUSDC,
                    ContractAddressTRNDToken
                ];
                // Calculate the deadline as 10 minutes ahead of the current time
                const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
                const deadline = currentTimestamp + 600; // 600 seconds = 10 minutes
                // Estimate gas cost for the swapExactTokensForTokens2 function
                const gasEstimate = await contract.methods
                    .swapExactTokensForTokens(amountInWei, amountOutMinWei, path, account, deadline)
                    .estimateGas({ from: account });
                // Get the current gas price
                const gasPrice = await web3.eth.getGasPrice();
                // Calculate the gas fee in Ether
                const gasFee = web3.utils.fromWei((gasEstimate * gasPrice).toString(), 'ether');
                console.log("estimateGasFeeForSwapBUSDToEVC", gasFee)
                return gasFee;
            }
        } catch (error) {
            console.error('estimateGasFeeForSwapBUSDToEVC_error:', error);
        }
    }
    return;
};

export const estimateGasFeeForSwap = async (amountIn) => {
    if (amountIn > 0) {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                // Get the selected account
                const accounts = await window.ethereum.request({
                    method: 'eth_accounts',
                });
                const account = accounts[0];
                // Create a new instance of the contract
                const contract = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
                // Convert the input values to BigNumber or use string (if required)
                const amountInWei = web3.utils.toWei(amountIn.toString(), 'ether');
                const amountOutMin = 0;
                const amountOutMinWei = web3.utils.toWei(amountOutMin.toString(), 'ether');
                const path = [
                    ContractAddressTRNDToken,
                    ContractAddressUSDC
                ];
                // Calculate the deadline as 10 minutes ahead of the current time
                const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
                const deadline = currentTimestamp + 600; // 600 seconds = 10 minutes
                // Estimate gas cost for the swapTokensForStable function
                const gasEstimate = await contract.methods
                    .swapExactTokensForTokens(amountInWei, amountOutMinWei, path, account, deadline)
                    .estimateGas({ from: account });
                // Get the current gas price
                const gasPrice = await web3.eth.getGasPrice();
                // Calculate the gas fee in Ether
                const gasFee = web3.utils.fromWei((gasEstimate * gasPrice).toString(), 'ether');
                console.log("estimateGasFeeForSwap", gasFee)
                return gasFee;
            }
        } catch (error) {
            console.error('estimateGasFeeForSwap_error:', error);
        }
    }
    return;
};


// NOTE: EVC deployed for providing liquidity remove it when addressess are being changed 
// and also replace variable in allownceEVC function and also remove ABIEVCToken in EVCStake.js in ABI file

// export const getValueOutBusdToEvc = async (amountBusd) => {
//     try {
//         if (window.ethereum) {
//             const web3 = new Web3(window.ethereum);
//             const accounts = await window.ethereum.request({
//                 method: 'eth_accounts',
//             });
//             const account = accounts[0];
//             const contracts = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
//             // Convert amountBusd to a BigNumber
//             const amountInBusd = new web3.utils.BN(web3.utils.toWei(amountBusd.toString(), 'ether'));
//             // Check if amountInEvc is zero
//             if (amountInBusd.isZero()) {
//                 return "0"; // Return "0" as a string
//             }
//             // Call the smart contract function
//             const response = await contracts.methods.getAmountoutBusdToEvc(amountInBusd).call();
//             const amountOutBUSD = web3.utils.fromWei(response, 'ether');
//             console.log('AmountoutBusdToEvc:', amountOutBUSD);
//             return amountOutBUSD;
//         }
//     } catch (error) {
//         console.error('getValueOutBusdToEvc', error);
//     }
// };
// getValueOutBusdToEvc(1)

// export const getValueOutEvcToBusd = async (amountEvc) => {
//     try {
//         if (window.ethereum) {
//             const web3 = new Web3(window.ethereum);
//             const accounts = await window.ethereum.request({
//                 method: 'eth_accounts',
//             });
//             const account = accounts[0];
//             const contracts = new web3.eth.Contract(abiEVCRouter, ContractAddressTrendRouter);
//             // Convert amountEvc to a BigNumber
//             const amountInEvc = new web3.utils.BN(web3.utils.toWei(amountEvc.toString(), 'ether'));
//             // Check if amountInEvc is zero
//             if (amountInEvc.isZero()) {
//                 return "0"; // Return "0" as a string
//             }
//             // Call the smart contract function
//             const response = await contracts.methods.getAmountoutEvcToBusd(amountInEvc).call();
//             const amountOutBUSD = web3.utils.fromWei(response, 'ether');
//             console.log('AmountoutEvcToBusd:', amountOutBUSD);
//             return amountOutBUSD;
//         }
//     } catch (error) {
//         console.error('getAmountoutEvcToBusd', error);
//     }
// };
// getValueOutEvcToBusd(1)
