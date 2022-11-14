import Head from "next/head";
import React from "react";
import { CenteredColumn } from "./Columns";
import { Image, Text, VStack } from "@chakra-ui/react";
// import { ChakraProvider, HStack, VStack } from '@chakra-ui/react';

export interface SolanaCardProps {
  image: string;
  name: string;
  description: string;
  royalty: string;
  primarySaleHappened: number;
  width?: string;
  collection?: { name: string; family: string };
}

const SolanaCard = ({
  image,
  name,
  collection,
  description,
  royalty,
  primarySaleHappened,
  width,
}: SolanaCardProps) => {
  return (
    <CenteredColumn
      padding="0"
      zIndex="1"
      width={width ? width : { base: '95%', md: '32%', lg: '30%', '2xl': "22%"}}
      height="22.5em"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      marginTop="1em !important"
      position="relative"
      boxSizing="border-box"
      id="solana-card"
      overflow="hidden"
    >
      <Image
        position="relative"
        height="100%"
        width="100%"
        src={image}
        alt={name}
      />
      <CenteredColumn
        marginTop="0 !important"
        background="#a32edd"
        color="white"
        position="absolute"
        width="100%"
        height="22.5em"
        transition="all 0.5s"
        top="100%"
        left="0"
        boxSizing="border-box"
        padding="1em"
        cursor='pointer'
        id="solana-card-info"
      >
        <Text fontSize="1.5em">{name}</Text>
        <Text>{description}</Text>
        {collection && <Text>{collection.name}</Text>}
        <Text>Royalty: {royalty}%</Text>
        {new Boolean(primarySaleHappened) && <Text>Sold</Text>}
      </CenteredColumn>
    </CenteredColumn>
  );
};

export default SolanaCard;
