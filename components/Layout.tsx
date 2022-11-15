import Head from "next/head";
import React, { useState } from "react";
import { ChakraProvider, Button, HStack, Text, VStack } from "@chakra-ui/react";

export interface ChainSelected {
  chain: string;
  name: string;
}

const chains = [
  {
    image:
      "https://res.cloudinary.com/aa1997/image/upload/v1668398929/solana.jpg",
    value: "solana",
  },
  {
    image: "https://res.cloudinary.com/aa1997/image/upload/v1668398929/bsc.png",
    value: "bsc",
  },
  {
    image:
      "https://res.cloudinary.com/aa1997/image/upload/v1668398929/poly.png",
    value: "polygon",
  },
  {
    image:
      "https://res.cloudinary.com/aa1997/image/upload/v1668398929/aval.png",
    value: "avalanche",
  },
];

const Layout = (props: React.PropsWithChildren<any>) => {
  const [currentChainSelected, setCurrentChainSelected] = useState("solana");
  const [nftValue, setNftValue] = useState("");
  const [nftsSelected, setNftsSelected] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getNavbarId = () => {
    // console.log("currentChainSelected:", currentChainSelected);
    if (currentChainSelected === "bsc") return "bsc-navbar";
    if (currentChainSelected === "avalanche") return "aval-navbar";
    if (currentChainSelected === "polygon") return "polygon-navbar";
    return "solana-navbar";
  };

  const getNFTExplorerTitle = () => {
    if (currentChainSelected === "bsc") return "Binance NFT Explorer";
    if (currentChainSelected === "avalanche") return "Avalanche NFT Explorer";
    if (currentChainSelected === "polygon") return "Polygon NFT Explorer";
    return "Solana NFT Explorer";
  };
  return (
    <div>
      <Head>
        <title>NFT Explorer</title>
        <meta name="description" content="Novigo nft explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <HStack
          paddingX="2vw"
          flexDir={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
          w="100%"
          height={{ base: "12em", md: "10em" }}
          id={getNavbarId()}
        >
          <Text fontSize="2em" fontWeight={900} color="white">
            {getNFTExplorerTitle()}
          </Text>
          <HStack zIndex={2} minWidth="30%" justifyContent="space-between">
            {chains.map((chain: any, idx: number) => (
              <Button
                key={idx}
                background={`url("${chain.image}")`}
                _hover={{
                  background: `url("${chain.image}")`,
                }}
                _active={{
                  background: `url("${chain.image}")`,
                }}
                onClick={() => {
                  setLoading(true);
                  setNftValue("");
                  setNftsSelected([]);
                  setCurrentChainSelected(chain.value);
                }}
                className={`${
                  currentChainSelected === chain.value && "selected-button"
                }`}
                id="navbar-button"
              />
            ))}
          </HStack>
        </HStack>
        <VStack
          w="100%"
          paddingX={{ base: "2vw", md: "2.5vw", lg: "10vw", xl: "15vw" }}
          justifyContent="space-between"
          alignItems="center"
          position="relative"
        >
          {React.cloneElement(props.children, {
            currentChainSelected,
            setCurrentChainSelected,
            nftValue,
            setNftValue,
            nftsSelected,
            setNftsSelected,
            setLoading,
            loading
          })}
        </VStack>
        <HStack
          flexDir={{ base: "column", md: "row" }}
          padding="1em"
          marginTop="2em"
          w="100%"
          bg="#1a1a1a"
          justify="center"
          position="absolute"
          top="100%"
        >
          <Text color="white">
            This solana nft explorer was created by{" "}
            <a
              style={{ fontSize: "1.2em", fontWeight: 900 }}
              href="#"
              onClick={() => window.open("https://novigo.info", "_blank")}
            >
              Novigo Inc.
            </a>
          </Text>
        </HStack>
      </ChakraProvider>
    </div>
  );
};

export default Layout;
