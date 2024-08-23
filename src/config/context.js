// Web3OnboardContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';
import metamaskModule from '@web3-onboard/metamask';
import injectedModule from '@web3-onboard/injected-wallets';
import { ethers } from 'ethers';
import { activeCurrentChainId } from '../ContractAction/ContractDependency';


const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070';
const injected = injectedModule();

const infuraKey = '5a15aa3454c24ab482eefb35dc2a1f57';
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;


const metamask = metamaskModule({
  options: {
    extensionOnly: false,
    i18nOptions: {
      enabled: true
    },
    dappMetadata: {
      name: 'Web3Onboard React Demo'
    }
  }
});

//walletConnect


// initialize the module with options
const walletConnect = walletConnectModule({
  // projectId: '5a15aa3454c24ab482eefb35dc2a1f57',
  // requiredChains: [0x14a34],
  // optionalChains: [1, 42161, 8453, 10, 137, 56],
  // dappUrl: 'https://cyperts.xyz'

  handleUri: uri => console.log(uri, 'uri'),
  projectId: '5a15aa3454c24ab482eefb35dc2a1f57',
  dappUrl: 'https://www.onboard.blocknative.com'
})
const web3Onboard = init({
  apiKey,
  wallets: [injected, metamask, walletConnect],
  chains: [
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance Smart Chain Mainnet',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0xa4b1',
      token: 'ARB-ETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
      id: '0xa4ba',
      token: 'ARB',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc'
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    },
    {
      id: 11155111,
      token: 'ETH',
      label: 'Sepolia',
      rpcUrl: 'https://rpc.sepolia.org/'
    }
  ],
  accountCenter: {
    desktop: {
      enabled: true,
      position: 'topRight'
    },
    mobile: {
      enabled: true,
      position: 'topRight'
    }
  }
});

// Create the context
const Web3OnboardContext = createContext();

export const Web3OnboardProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  useEffect(() => {
    if (wallet?.provider) {
      const ethersProvider = new ethers.providers.Web3Provider(wallet.provider);
      console.log("ethersProvider", ethersProvider);
      setProvider(ethersProvider);
    } else {
      setProvider(undefined);
    }
  }, [wallet]);
  useEffect(() => {
    if (wallet)
      activeCurrentChainId();
  }, [wallet])
  return (
    <Web3OnboardContext.Provider value={{ web3Onboard, wallet, connecting, connect, disconnect, provider, setProvider }}>
      {children}
    </Web3OnboardContext.Provider>
  );
};

// Custom hook to use the Web3Onboard context
export const useWeb3Onboard = () => {
  return useContext(Web3OnboardContext);
};
