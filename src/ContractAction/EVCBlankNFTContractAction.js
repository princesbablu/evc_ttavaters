import Web3 from "web3";
import { abiEVCBlankNFT } from "./ABI/EVCBlankNFT"
import { RPCURL, APIBLANKNFT, ContractAddressTTBLANKAVATARS } from "./ContractDependency.js"

var web3 = new Web3(new Web3.providers.HttpProvider(RPCURL));



export const getUserBlankNFT = async () => {
    try {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        let account = accounts[0];
        // let account = useraddress.toLowerCase();
        const response = await fetch(`${APIBLANKNFT}${account}`);
        const data = await response.json();
        if (data.status) {
            console.log('getUserBlankNFT_data:', data);
            return data;
        } else {
            console.error('getUserBlankNFT_ERROR:', data.message);
            return null;
        }
    } catch (error) {
        console.error('getUserBlankNFT_ERROR:', error);
        return null;
    }
}

export const getUserHasBlankNft = async () => {
    console.log("getUserHasBlankNft");
    const contracts = new web3.eth.Contract(abiEVCBlankNFT, ContractAddressTTBLANKAVATARS);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    console.log("getUserHasBlankNft_account", account);
    const userHasBlankNft = await contracts.methods.getUserAssignedBlankNFT(account).call();
    console.log("userHasBlankNft", userHasBlankNft);
    const userAssignBlankNFt = await Promise.all(
        userHasBlankNft.map(async (userHasBlankNFT) => {
            const userHasBlankNftRevoked = await getIsRevokedTokenId(userHasBlankNFT);
            return !userHasBlankNftRevoked ? userHasBlankNFT : null;
        })
    );
    const filteredUserAssignBlankNFt = userAssignBlankNFt.filter(Boolean);
    console.log("filteredUserAssignBlankNFt", filteredUserAssignBlankNFt);
    return filteredUserAssignBlankNFt;
};

export const getBlankTokenIdPendingRewards = async (tokenId) => {
    try {
        const contract = new web3.eth.Contract(abiEVCBlankNFT, ContractAddressTTBLANKAVATARS);
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const tokenIdPendingRewards = await contract.methods.getPendingAutoRevokedNFT(account, tokenId.toString()).call();
        const isRevoked = await getIsRevokedTokenId(tokenId);
        console.log("getBlankTokenIdPendingRewards", tokenId, "tokenIdPendingRewards", tokenIdPendingRewards, "isRevoked", isRevoked);
        return isRevoked ? 0 : parseFloat(tokenIdPendingRewards) / 10 ** 6;
    } catch (error) {
        console.error("Error_getBlankTokenIdPendingRewards:", error);
        return 0;
    }
};

export const getIsRevokedTokenId = async (tokenId) => {
    try {
        const contracts = new web3.eth.Contract(abiEVCBlankNFT, ContractAddressTTBLANKAVATARS);
        const isRevoked = await contracts.methods.getIsRevokedNFT(tokenId).call();
        console.log("getIsRevokedTokenId", isRevoked)
        return isRevoked;
    } catch (error) {
        console.error("Error_getBlankTokenIdPendingRewards:", error);
    }
};

export const getActiveBlankNFT = async () => {
    console.log("getActiveBlankNFT");
    const blankLevelRangeMap = [
        { start: 1285001, end: 1286000, level: 1, price: 100 },
        { start: 1286001, end: 1287000, level: 2, price: 500 },
        { start: 1287001, end: 1288000, level: 3, price: 1000 },
        { start: 1288001, end: 1290000, level: 4, price: 2500 },
        { start: 1290001, end: 1291000, level: 5, price: 5000 },
        { start: 1291001, end: 1292000, level: 6, price: 10000 },
        { start: 1292001, end: 1293000, level: 7, price: 25000 },
        { start: 1293001, end: 1294000, level: 8, price: 50000 },
    ];
    const getBlankLevelAndPrice = (blankNFT) => {
        const range = blankLevelRangeMap.find(({ start, end }) => blankNFT >= start && blankNFT <= end);
        return range ? { level: range.level, price: range.price } : { level: 0, price: 0 };
    };
    try {
        const activeBlankList = await getUserHasBlankNft();
        console.log("activeBlankList:", activeBlankList);
        const activeBlankNFTs = activeBlankList.map((blankNFT) => {
            const { level, price } = getBlankLevelAndPrice(blankNFT);
            return {
                blankNFTId: blankNFT,
                blankLevel: level,
                levelprice: price,
            };
        });
        console.log("activeBlankNFTs:", activeBlankNFTs);
        return activeBlankNFTs;
    } catch (error) {
        console.error("Error_getActiveBlankNFT:", error);
    }
};





getUserBlankNFT()
getIsRevokedTokenId("1290011")
getUserHasBlankNft();
getActiveBlankNFT();