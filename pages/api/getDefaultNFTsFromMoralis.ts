// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Moralis from "moralis";
// import { SolAddressish  } from '@moralisweb3/sol-utils';
// import type { SolAddressish } from 'moralis';
import { EvmAddressish, EvmChain } from "@moralisweb3/evm-utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDefaultAddresses, getChain } from "constants/defaultAddresses";

function getNFTData(chain: EvmChain, address: string, tokenId: string) {
  return new Promise((resolve, reject) => {
    return Moralis.EvmApi.nft
      .getNFTMetadata({
        chain: chain,
        address: address as EvmAddressish,
        tokenId: tokenId as string,
      })
      .then((response) => response?.toJSON())
      .then((responseJson) => resolve(responseJson));
  }).catch((error) => console.error(error));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  if (req.query.chain) {
    const chainValue = req.query.chain as string;
    const nftChain = getChain(chainValue);
    const addresses = getDefaultAddresses(chainValue);
    console.log("chainValue:", chainValue);
    let nfts: any[] = [];
    try {
      for (let i = 0; i < addresses.length; i++) {
        const addInfo = addresses[i];
        const nftInfo: any = await getNFTData(
          nftChain,
          addInfo.address,
          addInfo.tokenId
        );
        // console.log("NFTINFO:", nftInfo)
        if (nftInfo && nftInfo.metadata) nfts.push(nftInfo);
      }

      return res.status(200).json(nfts);
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  }
  return res.status(200).json({ nfts: [] });
}
