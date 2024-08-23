import React, { useEffect, useState } from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

const infuraKey = '5a15aa3454c24ab482eefb35dc2a1f57'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

// initialize Onboard
const onboard = init({
  apiKey,
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance Smart Chain Mainnet',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: 42161,
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
      rpcUrl: 'https://sepolia.base.org'
    },
    {
      id: '84532',
      token: 'ETH',
      label: 'sepolia Base',
      rpcUrl: 'https://sepolia.base.org'
    }
  ]
})

function ConnectButton() {

  const location = useLocation();

  const navigate = useNavigate()
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem('connectedAccount') || '')
  const { t } = useTranslation();
  console.log("walletAddress", walletAddress)
  console.log("wallet", wallet)
  // create an ethers provider
  let ethersProvider = null
  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
  }

  // useEffect(() => {
  //   const savedWalletAddress = localStorage.getItem('connectedAccount')
  //   if (savedWalletAddress && !wallet) {
  //     connect()
  //   }
  // }, [connect])

  useEffect(() => {
    if (wallet) {
      const address = wallet.accounts[0].address
      setWalletAddress(address)
      localStorage.setItem('connectedAccount', address)
      navigate("/dashboard/tt-avatars")
      // Listen for account changes
      wallet.provider.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          const newAddress = accounts[0]
          setWalletAddress(newAddress)
          localStorage.setItem('connectedAccount', newAddress)
        } else {
          setWalletAddress('')
          localStorage.removeItem('connectedAccount')
        }
      })

      // Clean up the event listener
      return () => {
        wallet.provider.removeListener('accountsChanged', () => { })
      }
    }
  }, [wallet])


  console.log("location", location.pathname);

  // Effect to update localStorage and state when walletAddress changes
  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('connectedAccount', walletAddress)
    } else {
      localStorage.removeItem('connectedAccount')
    }
  }, [walletAddress])

  const handleDisconnect = () => {
    disconnect(wallet)
    setWalletAddress('')
    localStorage.removeItem('connectedAccount')
    navigate("/")
  }

  const redirectToDashboard = () => {
    navigate("/dashboard/tt-avatars")
  }

  return (
    <>
      <div className="d-none d-xl-block">
        {!walletAddress ?
          <button className="btn btn-primary-bg-custom text-black" disabled={connecting} onClick={() => (walletAddress ? redirectToDashboard() : connect())}>
            {t("Connect Wallet")}
          </button>
          :
          <div className="position-relative z-1 cbd-navbar-hasDropdown">
            <Link to="/dashboard/main" className="cbd-navbar-profile d-flex align-items-center gap-2 d-none d-sm-flex cursor-pointer ">
              <div className="icon-user d-none d-lg-flex">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.078125" y="0.307861" width="24" height="24" rx="12" fill="#201F24" />
                  <g clip-path="url(#clip0_3388_7120)">
                    <path d="M9.57812 9.18286C9.57813 9.8459 9.84152 10.4818 10.3104 10.9506C10.7792 11.4195 11.4151 11.6829 12.0781 11.6829C12.7412 11.6829 13.3771 11.4195 13.8459 10.9506C14.3147 10.4818 14.5781 9.8459 14.5781 9.18286C14.5781 8.51982 14.3147 7.88394 13.8459 7.41509C13.3771 6.94625 12.7412 6.68286 12.0781 6.68286C11.4151 6.68286 10.7792 6.94625 10.3104 7.41509C9.84152 7.88394 9.57813 8.51982 9.57812 9.18286Z" stroke="#A3A3A3" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8.32812 17.9329V16.6829C8.32812 16.0198 8.59152 15.3839 9.06036 14.9151C9.5292 14.4463 10.1651 14.1829 10.8281 14.1829H13.3281C13.9912 14.1829 14.6271 14.4463 15.0959 14.9151C15.5647 15.3839 15.8281 16.0198 15.8281 16.6829V17.9329" stroke="#A3A3A3" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3388_7120">
                      <rect width="15" height="15" fill="white" transform="translate(4.57812 4.80786)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className='icon-text'>
                <div className="nav-tata fs-6 text-white">
                  {walletAddress.substring(0, 4)}...{walletAddress.substring(walletAddress.length - 4)}
                </div>
              </div>
              <div>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3388_7126)">
                    <path d="M3.57812 5.55786L7.07812 9.05786L10.5781 5.55786" stroke="white" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3388_7126">
                      <rect width="14" height="14" fill="white" transform="translate(0.078125 0.307861)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
            <ul className="cbd-navbar-profile-dropdown position-absolute top-100 start-0 w-100 m-0">
              <li>
                <button className="social-buttons nav-tata" onClick={handleDisconnect}>
                  {t("Log Out")}
                </button>
              </li>
            </ul>
          </div >
        }
      </div>
    </>
  )
}

export default ConnectButton
