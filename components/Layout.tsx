import Head from "next/head";
import React from "react";
import { ChakraProvider, HStack, Text, VStack } from "@chakra-ui/react";

const Layout = (props: React.PropsWithChildren<any>) => {
  return (
    <div>
      <Head>
        <title>NFT Explorer</title>
        <meta name="description" content="Novigo nft explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <HStack justifyContent='center' w="100%" height="10em" id="navbar">
          <Text fontSize="2em" fontWeight={900} color='white'>Solana NFT Explorer</Text>
        </HStack>
        <VStack
          w="100%"
          paddingX={{ base: "2vw", md: "2.5vw", lg: "10vw", xl: "15vw" }}
          justifyContent="space-between"
          alignItems="center"
          position="relative"
        >
          {props.children}
        </VStack>
        <HStack
          flexDir={{ base: "column", md: "row" }}
          padding='1em'
          marginTop='2em'
          w="100%"
          bg="#1a1a1a"
          justify="center"
          position='absolute'
          top='100vh'
        >
          <Text color="white">
            This solana nft explorer was created by {" "}
            <a
              style={{ fontSize: '1.2em', fontWeight: 900 }}
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
