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

//Create Card component
//Add a useEffect and use a static array of nft addresses to get nft info using our defined endpoint.
//Set state of nfts
const solanaAddresses = [
  "6VxGFK7NTv8tmRS2NvMNGAdqwkN5Q1b4X2qEk71Uf8N2",
  "HVdz1hVzvGdQJeUGrj7Xd2WyRZ3CYYLgkvjEKCF7pJjV",
  "5KXFo1C8P17VaEqZPQFXDyNgYDjsnJrZ5Jk8XZRYswmw",
  "FCfTu3mQwjqcFRd56B9nmzF2wqmdrbHnUGtaSvaFN6up",
  "6PKU5dbY3c9eDnXkkwutM8Cm9DmiA1vMTnG891mn4aai",
  "77AtAZGErU1iXbeE52S11tKSEDieUAVJ2qopywBtKkoU",
  "2uJLwMrhmdBVGTV5PSHbF31nTmpkSmPtHTuwfi35ZCzU",
  "Aph6YCuamqB3H5DkknxtS6pQF5dcEcGSZvcgUuYj5PK1",
  "9KQTD4zgG3wWTk3UVkad9UyL5oVV4Hwnmczh4wTvwxdS",
  "FxMEEx5j7Kirz87fxHW8LK5peHm6NUsAgKYdMNdmi3o8",
  "5ZenUYt7ezy3kcLhxgWYCcqGRhkoaZc9yuLSyPKxZkuM",
  "8o8M1Gves2YpuifohDjig3fTo97ykSAeAeS3HTzhU5DT",
];

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nftAddress, setNftAddress] = useState("");
  const [defaultNfts, setDefaultNfs] = useState<any[]>([]);
  const [nftSelected, setNftSelected] = useState("");
  async function getNFT(value: string) {
    const { data } = await axios.get(`/api/getNFTInfo?address=${value}`);
    return data;
  }

  useEffect(() => {
    async function getSolanaNfts() {
      const nftPromises = solanaAddresses.map((solanaAddress) =>
        getNFT(solanaAddress)
      );
      const nfts = await Promise.all(nftPromises);
      setDefaultNfs(nfts);
      setLoading(false);
    }
    getSolanaNfts();
  }, []);

  const handleChange = async (e: any) => {
    debugger;
    const value = e.target.value;
    setNftAddress(value);
    console.log("value:", value);
    if (value.length >= 43) {
      const nft = await getNFT(value);
      setNftSelected(nft);
    } else {
      setNftSelected("");
    }
  };
  const convertDataToSolanaCardDisplay = (data: any): SolanaCardProps => ({
    image: data.metadata.image,
    name: data.metadata.name,
    collection: data.metadata.collection,
    description: data.metadata.description,
    royalty: (data.metadata.seller_fee_basis_points / 100).toString(),
    primarySaleHappened: data.nftData.metaplex.primarySaleHappened,
  });

  return (
    <>
      <Input
        top="-2em"
        position="absolute"
        background="white"
        boxShadow="0 2px 20px rgba(0, 0, 0, 0.5)"
        width="40vw"
        size="lg"
        padding="0.5em"
        variant="outline"
        placeholder="Address"
        onChange={handleChange}
        value={nftAddress}
      />
      {loading ? (
        <div className="loader" />
      ) : (
        <SpaceBetweenColumn>
          {nftSelected ? (
            <SolanaCard
              width="25em"
              {...convertDataToSolanaCardDisplay(nftSelected)}
            />
          ) : (
            <SpaceBetweenRow
              width="100%"
              flexWrap="wrap"
              alignItems={{ base: "center", lg: "space-between" }}
            >
              {defaultNfts.map((nft: any, idx: number) => (
                <SolanaCard
                  key={idx}
                  {...convertDataToSolanaCardDisplay(nft)}
                />
              ))}
            </SpaceBetweenRow>
          )}
        </SpaceBetweenColumn>
      )}
    </>
  );
};

export default Home;
