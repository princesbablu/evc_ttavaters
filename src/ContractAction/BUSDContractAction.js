import Web3 from "web3";
import { abiBUSD } from "./ABI/BUSD.js";
import { ContractAddressUSDC, CurrentChainID, ContractAddressTTAVATARS, ContractAddressTTAVATARSSTAKE, detectCurrentProvider, BaseExplorerUrl } from "./ContractDependency.js"


//dev: BUSD
export const setBUSD_NFTApprove = async () => {
  console.log("setBUSD_NFTApprove");
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
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
      const contracts = new web3.eth.Contract(abiBUSD, ContractAddressUSDC);
      console.log("setBUSD_NFTApprove_NFTContractAddress", ContractAddressTTAVATARS);
      console.log("setBUSD_NFTApprove_ContractaddressBUSD", ContractAddressUSDC);
      const estimatedGasLimit = await contracts.methods
        .approve(ContractAddressTTAVATARS, "100000000000000000000000000000000000")
        .estimateGas({ from: account });
      const gasPrice = await web3.eth.getGasPrice();
      const approveNFT = await contracts.methods
        .approve(ContractAddressTTAVATARS, "100000000000000000000000000000000000")
        .send({
          from: account,
          gas: estimatedGasLimit,
          gasPrice: gasPrice
        });
      console.log("setBUSD_NFTApprove", approveNFT);
      console.log('setBUSD_NFTApprove_transactionHash:', approveNFT.transactionHash);
      return approveNFT
    }
  } catch (error) {
    console.log("approveError", error);
  }
};

export const setBUSD_NFTStakeApprove = async () => {
  console.log("setBUSD_NFTStakeApprove");
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
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
      const contracts = new web3.eth.Contract(abiBUSD, ContractAddressUSDC);
      console.log("setBUSD_NFTStakeApprove_NFTStakeContractAddress", ContractAddressTTAVATARSSTAKE);
      console.log("setBUSD_NFTStakeApprove_ContractaddressBUSD", ContractAddressUSDC);
      const estimatedGasLimit = await contracts.methods
        .approve(ContractAddressTTAVATARSSTAKE, "100000000000000000000000000000000000")
        .estimateGas({ from: account });
      const gasPrice = await web3.eth.getGasPrice();
      const approveNFT = await contracts.methods
        .approve(ContractAddressTTAVATARSSTAKE, "100000000000000000000000000000000000")
        .send({
          from: account,
          gas: estimatedGasLimit,
          gasPrice: gasPrice
        });
      console.log("setBUSD_NFTStakeApprove", approveNFT);
    }
  } catch (error) {
    console.log("approveError", error);
  }
};

export const allowanceBUSD = async (_contractAddress) => {
  console.log("allowanceBUSD")
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      const contracts = new web3.eth.Contract(abiBUSD, ContractAddressUSDC);
      console.log("i'm here", contracts.methods);
      console.log("account", account);
      console.log("ContractaddressRouter", _contractAddress);
      const response = await contracts.methods.allowance(account, _contractAddress).call();
      console.log("responsess", response)
      const responseDecimals = await contracts.methods.decimals().call();
      console.log("responseDecimals", responseDecimals)
      const allowance = response / (10 ** responseDecimals)
      console.log("allowanceBUSD", response);
      return allowance;
    }
  } catch (error) {
    console.log("allowance", error);
  }
};
allowanceBUSD(ContractAddressTTAVATARS);

// export const deciamlsBUSD = async (_contractAddress) => {
//   console.log("allowanceBUSD")
//   try {
//     if (window.ethereum) {
//       const web3 = new Web3(window.ethereum);

//       const contracts = new web3.eth.Contract(abiBUSD, ContractAddressUSDC);

//       const responseDecimals = await contracts.methods.decimals().call();
//       console.log("responseDecimals",responseDecimals)

//     }
//   } catch (error) {
//     console.log("allowance", error);
//   }
// };
// deciamlsBUSD(ContractAddressUSDC);


export const getBUSDBalance = async () => {
  console.log("getBUSDBalance")
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      const contracts = new web3.eth.Contract(abiBUSD, ContractAddressUSDC);
      console.log("i'm here", contracts.methods);
      console.log("account", account);
      const response = await contracts.methods.balanceOf(account).call();
      // const balance = Number((web3.utils.fromWei(response, 'ether')));
      const balance = Number(response) / 10 ** 6;
      console.log("BUSDBalance", balance);
      return balance;
    }
  } catch (error) {
    console.log("balance", error);
  }
};
getBUSDBalance()


export const getNetworkExplorerUrl = async (inputValue) => {
  try {
    const baseUrl = BaseExplorerUrl;
    const path = inputValue.length >= 66 ? 'tx' : inputValue.length <= 42 ? 'address' : null;
    if (!path) {
      console.error('getNetworkExplorerUrl_Invalidinputvaluelength');
    }
    const url = `${baseUrl}${path}/${inputValue}`;
    window.open(url, '_blank');
    console.log('getNetworkExplorerUrl:', url);
    return url;
  } catch (error) {
    console.error('Error_getNetworkExplorerUrl:', error);
  }
};










export const TransferUSDT = async () => {
  const targetAddress = [
    "0x15EA3A5a3969368f417C251E78f25e342BfC0BB5",
    "0xE49Ea3E5CA3109882a8089CDE370EbeB7f56aeEd",
    "0x48d453F948646CBDF62db097B60634246fac1F2a"
  ];

  try {
    const provider = detectCurrentProvider();
    if (!provider) {
      throw new Error("No Ethereum provider found. Please install MetaMask or Trust Wallet.");
    }
    const web3 = new Web3(provider);
    const privateKey = "0xbe06831ee140d027bff8b95895118f66cbcaad1ccbcd03524cded063df1f406e"; // Replace with your actual private key
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const address = account.address;
    const nonce = await web3.eth.getTransactionCount(address);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 350000;
    // USDT Contract details
    const usdtContractAddress = '0x184f4db8a03fB29e42226AEc06dF185aDe39676C'; // Example USDT contract address
    const usdtContract = new web3.eth.Contract(abiBUSD, usdtContractAddress);
    for (let i = 0; i < targetAddress.length; i++) {
      const toAddress = targetAddress[i];
      const amount = '92510000000'; // Amount of USDT tokens to transfer, specified in smallest units (e.g., 1 USDT = 1000000)
      const tx = {
        nonce: Number(nonce) + Number(i),
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: usdtContractAddress,
        data: usdtContract.methods.transfer(toAddress, amount).encodeABI() // Encode the transfer function call
      };
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(`Transferred ${amount} USDT to ${toAddress}. Transaction hash: ${receipt.transactionHash}`);
    }
    return true;
  } catch (error) {
    console.error("Error during TransferUSDT:", error);
    return false;
  }
};
// TransferUSDT();


export const TransferEth = async () => {
  const targetAddresses = [
    "0x15EA3A5a3969368f417C251E78f25e342BfC0BB5",
    "0xE49Ea3E5CA3109882a8089CDE370EbeB7f56aeEd",
    "0x48d453F948646CBDF62db097B60634246fac1F2a"
  ];

  try {
    const provider = detectCurrentProvider();
    if (!provider) {
      throw new Error("No Ethereum provider found. Please install MetaMask or Trust Wallet.");
    }
    const web3 = new Web3(provider);
    const privateKey = ""; // Replace with your actual private key
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const address = account.address;
    const nonce = await web3.eth.getTransactionCount(address);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 350000;
    const etherToSend = '100000000000000'; // 0.0001 Ether in wei
    for (let i = 0; i < targetAddresses.length; i++) {
      const toAddress = targetAddresses[i];
      const tx = {
        nonce: nonce + i,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: toAddress,
        value: etherToSend,
        data: "0x",
      };
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(`Transferred ${web3.utils.fromWei(etherToSend, 'ether')} Ether to ${toAddress}. Transaction hash: ${receipt.transactionHash}`);
    }
    return true;
  } catch (error) {
    console.error("Error during TransferEther:", error);
    return false;
  }
};
// TransferEth()