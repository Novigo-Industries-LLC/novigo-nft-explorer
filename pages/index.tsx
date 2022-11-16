import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Input } from "@chakra-ui/react";
import axios from "axios";

import { SpaceBetweenColumn } from "components/Columns";
import styles from "../styles/Home.module.css";
import SolanaCard, { SolanaCardProps } from "components/SolanaCard";
import { SpaceBetweenRow } from "components/Rows";
import {
  solanaAddresses,
  binanceAddresses,
  getChainLogoUrl,
  getRedirectUri,
} from "constants/defaultAddresses";
import NonSolanaNFTCard, {
  NonSolanaNFTCardProps,
} from "components/NonSolanaNFTCard";

//Create Card component
//Add a useEffect and use a static array of nft addresses to get nft info using our defined endpoint.
//Set state of nfts

interface HomeProps {
  currentChainSelected: string;
  setCurrentChainSelected: (value: boolean) => void;
  nftValue: string;
  setNftValue: (value: string) => void;
  nftsSelected: any[];
  setNftsSelected: (selectedNFTs: any[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const Home: NextPage<HomeProps> = ({
  currentChainSelected,
  nftValue,
  setNftValue,
  nftsSelected,
  setNftsSelected,
  loading,
  setLoading,
}: HomeProps) => {
  //Default and Loading States
  const [solanaDefaultNfts, setSolanaDefaultNfs] = useState<any[]>([]);
  const [binanceDefaultNfts, setBinanceDefaultNfs] = useState<any[]>([]);
  const [avalancheDefaultNfts, setAvalancheDefaultNfs] = useState<any[]>([]);
  const [polygonDefaultNfts, setPolygonDefaultNfs] = useState<any[]>([]);
  const [cronosDefaultNfts, setCronosDefaultNfs] = useState<any[]>([]);
  const isSolanaChain = currentChainSelected === "solana";

  async function getSolanaNft(value: string) {
    const { data } = await axios.get(`/api/getSolanaNFTInfo?address=${value}`, {
      headers: {
        "Retry-After": 4800,
      },
    });
    return data;
  }
  async function getNonSolanaNft(value: string) {
    const { data } = await axios.get(
      `/api/getOtherNFTInfo?chain=${currentChainSelected}&qry=${value}`
    );
    return data;
  }

  async function getNfts() {
    const { data } = await axios.get(
      `/api/getDefaultNFTsFromMoralis?chain=${currentChainSelected}`,
      {
        headers: {
          "Retry-After": 7200,
        },
      }
    );
    return data;
  }

  async function setDefaultAddresses(nfts: any[]) {
    if (currentChainSelected === "bsc") return setBinanceDefaultNfs(nfts);
    if (currentChainSelected === "avalanche")
      return setAvalancheDefaultNfs(nfts);
    if (currentChainSelected === "polygon") return setPolygonDefaultNfs(nfts);
    if (currentChainSelected === "cronos") return setCronosDefaultNfs(nfts);
    return setSolanaDefaultNfs(nfts);
  }

  const doGetDefaultNFTs = () =>
    (currentChainSelected === "avalanche" && !avalancheDefaultNfts.length) ||
    (currentChainSelected === "polygon" && !polygonDefaultNfts.length) ||
    (currentChainSelected === "bsc" && !binanceDefaultNfts.length) ||
    (currentChainSelected === "cronos" && !cronosDefaultNfts.length) ||
    (currentChainSelected === "solana" && !solanaDefaultNfts.length);

  useEffect(() => {
    async function getDefaultNFTs() {
      let nftPromises = [];
      if (isSolanaChain) {
        nftPromises = solanaAddresses.map((solanaAddress) =>
          getSolanaNft(solanaAddress)
        );
        // console.log("NFTPROMISES:", nftPromises);
        const nfts = await Promise.all(nftPromises);
        // console.log("nfts", nfts);
        setDefaultAddresses(nfts);
      } else {
        const nfts = await getNfts();
        // console.log("nfts:", nfts);
        setDefaultAddresses(nfts);
      }

      setLoading(false);
    }
    if (doGetDefaultNFTs()) getDefaultNFTs();
    else setLoading(false);
  }, [currentChainSelected]);

  const handleChange = async (e: any) => {
    const value = e.target.value;
    setLoading(true);
    setNftValue(value);
    if (isSolanaChain && value.length >= 43) {
      const nft = await getSolanaNft(value);
      setNftsSelected([nft]);
    } else if (!isSolanaChain && value.length >= 3) {
      const nft = await getNonSolanaNft(value);
      setNftsSelected(nft);
    }
    setLoading(false);
  };
  const convertDataToSolanaCardDisplay = (data: any): SolanaCardProps => ({
    image: data.metadata.image,
    name: data.metadata.name,
    collection: data.metadata.collection,
    description: data.metadata.description,
    royalty: (data.metadata.seller_fee_basis_points / 100).toString(),
    primarySaleHappened: data.nftData.metaplex.primarySaleHappened,
    redirectUrl: getRedirectUri(
      {
        isAvalanche: false,
        isPolygon: false,
        isBinance: false,
        isCronos: false,
      },
      { tokenAddress: data.nftData.tokenAddress, tokenId: "" }
    ),
  });
  const getNFTImageUrl = (image: string) =>
    image
      .replace("ipfs://", "https://ipfs.io/ipfs/")
      .replace(".io/ipfs/ipfs/", ".io/ipfs/");
  const convertDataToNonSolanaCardDisplay = (
    data: any
  ): NonSolanaNFTCardProps => {
    const cardMetadata = Array.isArray(data.metadata)
      ? data.metadata[0]
      : data.metadata;
    return {
      image:
        cardMetadata && cardMetadata.image
          ? getNFTImageUrl(cardMetadata.image)
          : getChainLogoUrl(
              currentChainSelected === "avalanche",
              currentChainSelected === "polygon",
              currentChainSelected === 'cronos'
            ),
      name: cardMetadata.name,
      collectionName: data.name,
      description: cardMetadata.description,
      tokenID: data.tokenId,
      redirectUrl: getRedirectUri(
        {
          isAvalanche: currentChainSelected === "avalanche",
          isPolygon: currentChainSelected === "polygon",
          isBinance: currentChainSelected === "bsc",
          isCronos: currentChainSelected === 'cronos',
        },
        { tokenAddress: data.tokenAddress, tokenId: data.tokenId }
      ),
    };
  };

  function renderSelectedNFTCollection() {
    if (isSolanaChain) {
      return nftsSelected.map((nft: any, idx: number) => (
        <SolanaCard
          key={idx}
          {...convertDataToSolanaCardDisplay(nft)}
          width="20em"
        />
      ));
    } else {
      return nftsSelected.map((nft: any, idx: number) => (
        <NonSolanaNFTCard
          key={idx}
          isAvalanche={currentChainSelected === "avalanche"}
          isPolygon={currentChainSelected === "polygon"}
          isCronos={currentChainSelected === "cronos"}
          {...convertDataToNonSolanaCardDisplay(nft)}
        />
      ));
    }
  }

  function renderCollection() {
    if (currentChainSelected === "solana") {
      return solanaDefaultNfts.map((nft: any, idx: number) => (
        <SolanaCard key={idx} {...convertDataToSolanaCardDisplay(nft)} />
      ));
    }
    if (currentChainSelected === "avalanche") {
      return avalancheDefaultNfts.map((nft: any, idx: number) => (
        <NonSolanaNFTCard
          key={idx}
          {...convertDataToNonSolanaCardDisplay(nft)}
          isAvalanche
        />
      ));
    }
    if (currentChainSelected === "polygon") {
      return polygonDefaultNfts.map((nft: any, idx: number) => (
        <NonSolanaNFTCard
          key={idx}
          {...convertDataToNonSolanaCardDisplay(nft)}
          isPolygon
        />
      ));
    }
    if (currentChainSelected === "cronos") {
      return cronosDefaultNfts.map((nft: any, idx: number) => (
        <NonSolanaNFTCard
          key={idx}
          {...convertDataToNonSolanaCardDisplay(nft)}
          isCronos
        />
      ));
    }
    return binanceDefaultNfts.map((nft: any, idx: number) => (
      <NonSolanaNFTCard
        key={idx}
        {...convertDataToNonSolanaCardDisplay(nft)}
        isCronos
      />
    ));
  }

  return (
    <>
      <Input
        top="-2em"
        position="absolute"
        background="white"
        boxShadow="0 2px 20px rgba(0, 0, 0, 0.5)"
        width={{ base: "90vw", md: "40vw" }}
        size="lg"
        padding="0.5em"
        variant="outline"
        placeholder={
          isSolanaChain
            ? "Enter nft address..."
            : "Enter name of nft collection..."
        }
        onChange={handleChange}
        value={nftValue}
      />
      {loading ? (
        <div style={{ height: "100vh", position: "relative" }}>
          <div className={`loader ${currentChainSelected}`} />
        </div>
      ) : (
        <SpaceBetweenColumn>
          <SpaceBetweenRow
            width="100%"
            flexWrap="wrap"
            flexDir={{ base: "column", md: "row" }}
            alignItems={{ base: "center", lg: "space-between" }}
          >
            {nftsSelected && nftsSelected.length
              ? renderSelectedNFTCollection()
              : renderCollection()}
          </SpaceBetweenRow>
        </SpaceBetweenColumn>
      )}
    </>
  );
};

export default Home;
