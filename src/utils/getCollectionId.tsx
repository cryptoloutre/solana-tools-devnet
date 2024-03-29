import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';



export async function getCollectionId(mintPublickey: PublicKey, connection:Connection) {

  const metaplex = new Metaplex(connection);
  const collectionId = (await metaplex.nfts().findByMint({mintAddress: mintPublickey})).collection?.address
  return collectionId
}
