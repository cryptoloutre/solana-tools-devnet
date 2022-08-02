import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";

import { fetcher } from "utils/fetcher";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LegitOrScam } from '../../utils/LegitOrScam';
import { SelectBurnButton } from '../../utils/SelectBurnButton';
import { TokenIcon } from "utils/TokenIcon";
import { TokenName } from "utils/TokenName";


type Props = {
  mint: string;
  toBurn: any;
};

export const TokenCard: FC<Props> = ({
  mint,
  toBurn,

}) => {


  const wallet = useWallet();

  const { connection } = useConnection();

  const { publicKey } = useWallet();

  return (
    <div className={`card bordered max-w-xs compact rounded-md`}>
      <figure className="min-h-16 animation-pulse-color">
        <TokenIcon mint={mint}/>
      </figure>
      <div className="card-body h-20 sm:h-16 mb-4">
        <h2 className="card-title text-sm text-left">
          <TokenName mint={mint} />
        </h2>
      </div>
      <div className="sm:flex justify-center">
        <SelectBurnButton tokenMintAddress={mint} connection={connection} publicKey={publicKey} toBurn={toBurn} />

        <a target="_blank" className="btn text-xs bg-[#9945FF] hover:bg-[#7a37cc] uppercase sm:w-[50%] sm:ml-1 mb-2 sm:mb-4" href={"https://solscan.io/token/" + mint +'?cluster=devnet'}>Check Solscan</a>
      </div>
    </div>
  );
};
