import React from "react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygonMumbai, chain.goerli, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'KAI Launchpad',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function DataContext({children}) {
  return (
    <>
    <WagmiConfig  client={wagmiClient}>
      <RainbowKitProvider theme={darkTheme({
        accentColor: '#0e3ded',
        accentColorForeground: 'white',
        borderRadius: 'medium',
      })} modalSize="compact" chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
    </>
  )
}