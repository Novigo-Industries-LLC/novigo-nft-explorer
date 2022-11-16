import Head from "next/head";
import React from "react";
import { CenteredColumn } from "./Columns";
import { Image, Text, Button, Img, Spinner } from "@chakra-ui/react";
// import { ChakraProvider, HStack, VStack } from '@chakra-ui/react';

export interface SolanaCardProps {
  image: string;
  name: string;
  description: string;
  royalty: string;
  primarySaleHappened: number;
  width?: string;
  collection?: { name: string; family: string };
  redirectUrl: string;
}

const SolanaCard = ({
  image,
  name,
  collection,
  description,
  royalty,
  primarySaleHappened,
  width,
  redirectUrl,
}: SolanaCardProps) => {
  const [imageUrl, setImageUrl] = React.useState("https://res.cloudinary.com/aa1997/image/upload/v1668383195/dsEdj6lPPuVIne_ZYgyAuXg7w1dMw5EUKFH0JBVqpUC4ydWhWmjVd_FSDQrq1TSOTwn0Tfv0LIw9NUKuLKfhT9pva0dTaQ26ncyC4T880G1AeP9J3i-PgxiUZoGujobizMh28nv3.png");

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
      <Img
        position="relative"
        height="100%"
        width="100%"
        src={imageUrl}
        onLoad={e => {
          setImageUrl(image);
        }}
        alt={name}
        loading="lazy"
      />
      {imageUrl !== image && <Spinner position="absolute" size="lg" color="#a32edd" />}
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
        id="card-info"
      >
        <Text fontSize="1.5em">{name}</Text>
        <Text>{description}</Text>
        {collection && <Text>{collection.name}</Text>}
        <Text>Royalty: {royalty}%</Text>
        {new Boolean(primarySaleHappened) && <Text>Sold</Text>}
        <Button color="#a32edd" background='white' as='a' onClick={() => window.open(redirectUrl, '_blank')}>See NFT Details</Button>
      </CenteredColumn>
    </CenteredColumn>
  );
};

export default SolanaCard;
