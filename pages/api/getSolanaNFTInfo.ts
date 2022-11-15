// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Moralis from "moralis";
import { SolAddressish } from "@moralisweb3/sol-utils";
// import type { SolAddressish } from 'moralis';
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  const nftAddress = req.query.address;
  if (nftAddress) {
    const nftData = await (
      await Moralis.SolApi.nft.getNFTMetadata({
        address: nftAddress as SolAddressish,
      })
    ).toJSON();
    const { data: nftMetadata } = await axios.get(nftData.metaplex.metadataUri);

    return res.status(200).json({
      nftData: { ...nftData, tokenAddress: nftAddress },
      metadata: nftMetadata,
    });
  }
  return res.status(200).json({ nftData: {}, metadata: {} });
}
