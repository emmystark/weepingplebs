import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// const activeChain = "BaseSepolia";
const activeChain = BaseSepoliaTestnet;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
