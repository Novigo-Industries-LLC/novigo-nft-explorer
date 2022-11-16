import Head from "next/head";
import React from "react";
import { CenteredColumn } from "./Columns";
import { Image, Text, Button } from "@chakra-ui/react";
import { getChainLogoUrl } from "constants/defaultAddresses";
// import { ChakraProvider, HStack, VStack } from '@chakra-ui/react';

export interface NonSolanaNFTCardProps {
  image: string;
  name: string;
  description: string;
  tokenID: string;
  collectionName: string;
  redirectUrl: string;
  isAvalanche?: boolean;
  isPolygon?: boolean;
  isCronos?: boolean;
  width?: string;
}

const NonSolanaNFTCard = ({
  image,
  name,
  description,
  tokenID,
  collectionName,
  isAvalanche,
  isPolygon,
  isCronos,
  width,
  redirectUrl,
}: NonSolanaNFTCardProps) => {
  const getCardColorScheme = () => {
    if (isAvalanche)
      return {
        background: "#E84142",
        color: "white",
        borderColor: "white",
      };
    if (isPolygon)
      return {
        background: "#8247e5",
        color: "white",
        borderColor: "white",
      };
    if(isCronos)
      return {
        background: "#00286a",
        color: "white",
        borderColor: "white",
      };
    return {
      background: "#FAD338",
      color: "black",
      borderColor: "black",
    };
  };
  // console.log("DESCRIPTION:", description);
  const getCardDesription = () =>
    description && description.length > 150
      ? description.slice(0, 150) + "..."
      : description;

  return (
    <CenteredColumn
      padding="0"
      zIndex="1"
      width={
        width ? width : { base: "95%", md: "32%", lg: "30%", "2xl": "22%" }
      }
      height="22.5em"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      marginTop="1em !important"
      position="relative"
      boxSizing="border-box"
      id="nft-card"
      overflow="hidden"
    >
      <Image
        position="relative"
        height="100%"
        width="100%"
        src={image}
        fallbackSrc={getChainLogoUrl(isAvalanche ?? false, isPolygon ?? false, isCronos ?? false)}
        alt={name}
        loading="lazy"
      />
      <CenteredColumn
        marginTop="0 !important"
        position="absolute"
        width="100%"
        height="22.5em"
        transition="all 0.5s"
        top="100%"
        left="0"
        boxSizing="border-box"
        padding="1em"
        cursor="pointer"
        {...getCardColorScheme()}
        borderColor="none"
        id="card-info"
      >
        <Text fontSize="1.5em">{name}</Text>
        <Text fontSize="1.2em">Collection: {collectionName}</Text>
        <Text>
          {typeof description === "string" ? getCardDesription() : ""}
        </Text>
        <Text>Token ID: {tokenID}%</Text>
        <Button
          as="a"
          borderWidth="2px"
          {...getCardColorScheme()}
          _hover={{ opacity: 0.8 }}
          onClick={() => window.open(redirectUrl, "_blank")}
        >
          See NFT Details
        </Button>
      </CenteredColumn>
    </CenteredColumn>
  );
};

export default NonSolanaNFTCard;
