// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Moralis from "moralis";
// import { SolAddressish  } from '@moralisweb3/sol-utils';
// import type { SolAddressish } from 'moralis';
import { EvmAddressish, EvmChain } from "@moralisweb3/evm-utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { getChain } from 'constants/defaultAddresses';
import axios from "axios";
import { ApiFormatType } from "@moralisweb3/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  const nftChain = getChain(req.query.chain as string);
  const qry = req.query.qry;
  const nextCursor = req.query.cursor as string;
  // console.log('qry:', qry);
  if (qry) {
    const nftInfo = (await Moralis.EvmApi.nft.searchNFTs({
        q: qry as string,
        chain: nftChain,
        filter: 'name',
        limit: 12,
        cursor: nextCursor ? nextCursor : ''
      })).toJSON().map(nft => nft.token)
    // console.log('nftInfo:', nftInfo);
    return res.status(200).json(nftInfo);
  }
  return res.status(200).json({ nftInfo: [] });
}
