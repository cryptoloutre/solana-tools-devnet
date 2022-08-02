import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { FC, useEffect, useState } from 'react';

type Props = {
    tokenMintAddress: PublicKey;
    toBurn: any;
    publicKey: PublicKey | null;
    connection: Connection;
};

export const SelectBurnButton: FC<Props> = ({
    tokenMintAddress,
    toBurn,
    publicKey,
    connection,
}) => {

    const [accountExist, setAccountExist] = useState<boolean>();

    useEffect(() => {

        async function BalanceIsNull() {
            const accountInfo: any = await connection.getParsedAccountInfo(tokenMintAddress)
            // const mintPublickey = new PublicKey(accountInfo?.value?.data.parsed.info.mint)

            try {

                if (publicKey) {

                    const balance = await connection.getBalance(tokenMintAddress)
                    if (balance != 0) {
                        setAccountExist(true)
                    }
                    else {
                        setAccountExist(false)
                    }
                }
            }
            catch (error) {
                setAccountExist(false)
                const err = (error as any)?.message;
                console.log('loioi', err)
            }
        }
        BalanceIsNull();
    }, []);

    const [isSelected, setIsSelected] = useState(false);


    return (
        <div>
            {!isSelected && accountExist == true &&
                <button className="btn bg-[#55268e] hover:bg-[#3d1b66] uppercase mb-2 sm:mb-4 sm:mr-1" onClick={() => { setIsSelected(true); toBurn.push(tokenMintAddress) }}>select</button>
            }
            {isSelected && accountExist == true &&
                <button className="btn bg-[#3d1b66] hover:bg-[#55268e] uppercase mb-2 sm:mb-4 sm:mr-1" onClick={() => { setIsSelected(false); toBurn.splice(toBurn.indexOf(tokenMintAddress), 1) }}>unselect</button>
            }

            {accountExist == false &&
                <button className="btn btn-primary uppercase mb-2 sm:mb-4 sm:mr-1" disabled>success!</button>
            }


        </div>
    );
};


