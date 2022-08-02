import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, MintLayout } from '@solana/spl-token';
import { Connection, PublicKey, Transaction, SystemProgram, Keypair, TransactionInstruction } from '@solana/web3.js';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Dispatch, SetStateAction } from 'react';


export async function MintToken(owner: PublicKey, wallet: WalletContextState, connection: Connection, tokenAddresss: string, quantity: number, setIsminting: Dispatch<SetStateAction<boolean>>) {
    try {
        setIsminting(true)
        console.log("min")
        const mintAddress = new PublicKey(tokenAddresss)

        const associatedTokenAccount = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintAddress,
            owner
        );

        const mintInstruction = await Token.createMintToInstruction(
            TOKEN_PROGRAM_ID,
            mintAddress,
            associatedTokenAccount,
            owner,
            [],
            quantity
            // quantity * 10 ** decimals récupérer le decimals avec token info de @solana/spl-token-registry
        );

        const createMintTransaction = new Transaction().add(mintInstruction);

        const createMintSignature = await wallet.sendTransaction(createMintTransaction, connection);

        const createMintconfirmed = await connection.confirmTransaction(createMintSignature, 'processed');

        if (createMintconfirmed) {
            setIsminting(false)
        }


    } catch (error) {
        setIsminting(false)
        error
    }

}