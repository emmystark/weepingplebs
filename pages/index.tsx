import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import NFTCards from "../components/NFTCards";
import {
  nftDropContractAddress,
  stakingContractAddress,
  tokenContractAddress,
} from "../consts/contractAddresses";
import StickyNavigation from "./StickyNavigation";
import Dashboard from "./dashboard";

const Home: NextPage = () => {
  const router = useRouter();

  const address = useAddress();
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract, isLoading } = useContract(stakingContractAddress);
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, contract]);

  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    await contract?.call("stake", [[id]]);
  }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div >
    {/* <StickyNavigation/> */}
    {/* <div className={styles.container}> */}
      {/* <h1 className={styles.h1}>Welcome To Weeping Plebs Staking Dapp</h1> */}
      {/* <hr className={`${styles.divider} ${styles.spacerTop}`} /> */}

      {!address ? (
        <div className={styles.contt}>

          <ConnectWallet  />
        </div>
      ) : (
        <>
          

          

          <Dashboard/>
        </>
      )}
    </div>
    // </div>
  );
};

export default Home;
