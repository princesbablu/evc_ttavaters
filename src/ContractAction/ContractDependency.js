import Web3 from "web3";

export const RPCURL = "https://base-rpc.publicnode.com";

export const BaseExplorerUrl = "https://basescan.org/";

export const URLDOMAIN = "https://ttavatars.io/";

export const CurrentChainID = 8453;

export const ContractAddressTTAVATARS = "0x62768E297e2dE88554472cAF3FF22BB5cD1bc569";

export const ContractAddressTTBLANKAVATARS = "0x2Ae2FDbFe8eb374A2f0541F74b5C74603D4B16D1";

export const ContractAddressTTAVATARSSTAKE = "0x5aEe83CFD0281DC647e8Db6B01C8e7f4c45A7881";

export const ContractAddressTRNDVEST = "0x4826F7638Bbe2efF59D273f8a10117B2a0dE540e";

export const ContractAddressUSDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export const ContractAddressTRNDToken = "0xf3995f5a2faa01d909afd7e17eb94c2bd9ee8d50";

export const ContractAddressTrendRouter = "0x11aedb8dca34f124da81673e34b150f84424e79c";

export const ContractAddressPairTRNDUSDC = "0xee2C7429fFc7E0B69B36DB608b7d82753dC8382F";

export const ContractAddressDead = "0x000000000000000000000000000000000000dEaD";

export const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else {
        console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
};
export const activeCurrentChainId = async () => {
    const web3 = new Web3(window.ethereum);
    const currentChainId = await web3.eth.net.getId();
    if (currentChainId !== CurrentChainID) {
        await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(CurrentChainID) }],
        });
    }
}


export const APIBLANKNFT = `${URLDOMAIN}api/admin/currentblanknft/`;

export const APISWAPTRADEHISTORY = `${URLDOMAIN}api/swaps`;

export const APINFTMINT = `${URLDOMAIN}api/mintnfts`;

export const APITEAMSTATISTICS = `${URLDOMAIN}api/partneractivity/getteamstatistics`; //NOTE: here should be pass user address as parameter

export const APIDIRECTTEAMSTATISTICS = `${URLDOMAIN}api/partneractivity/getdirectteamstatistics/`;

export const APIUSERJOINEDDETAILS = `${URLDOMAIN}api/mintnfts/getUserJoinedDetails/`;

export const APIJOINEDPARTNERS = `${URLDOMAIN}api/partneractivity/getjoinedPartner/`;

export const APIUSERRANK = `${URLDOMAIN}api/partneractivity/getuserrank/`;

export const APIUSERRANKBONUSES = `${URLDOMAIN}api/partneractivity/getuserrankbonuses/`;

export const APIDIRECTDETAILTEAMSTATISTICS = `${URLDOMAIN}api/partneractivity/getDirectDetailteamstatistics/`;

export const APINOTIFICATIONS = `${URLDOMAIN}api/notification/`;

export const APICHECKREFERRER = `${URLDOMAIN}api/activity/checkReffer/`;

export const APISTORETEAMSTATISTICS = `${URLDOMAIN}api/activity/storeteamstatistics/`;

export const APIUSEREFERRAL = `${URLDOMAIN}api/users/userreferral`;

export const APIDASHBOARDREF = `${URLDOMAIN}dashboard?ref=$`;

export const APIGETADS = "https://viewer.trendads.ai/api/ads/fortt/getAds/video";

export const DELETENOTIFICATIONBYID = `${URLDOMAIN}api/notification/deletenotification`;

export const DELETENOTIFICATIONBYADDRESS = `${URLDOMAIN}api/notification/deletenotificationbywalletaddress`;