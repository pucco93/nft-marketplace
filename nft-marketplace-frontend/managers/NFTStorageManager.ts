import { NFTStorage, File, Blob } from 'nft.storage';
import { NFT_storage_config } from '../configs/nftstorage.config';
import { mintNFT } from '../contracts_connections/Contracts_Connections';
import NFTToMint from '../models/NFTToMint';
import { store } from '../store/appStore';
import { cancelLoading } from '../store/slices/LoadingSlice';

export class NFTStorageManager {

    public mint = async (nftToMint: NFTToMint) => {
        try {
            const body = {
                name: nftToMint.name,
                description: nftToMint.description,
                image: undefined,
                properties: {
                    price: nftToMint.price,
                    author: nftToMint.author
                }
            };
            let formData = new FormData();
            formData.append("meta", JSON.stringify(body));
            formData.append("image", new File([nftToMint.image], 'nft.png', { type: 'image/png' }));

            const metadata = await fetch("https://api.nft.storage/store", {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + NFT_storage_config.apiKey,
                }
            });
            const result = await metadata.json();
            return mintNFT(result?.value);
        } catch (error) {
            store.dispatch(cancelLoading());
            console.log(error);
        }
        return undefined;
    }

    public getImage = async (url: string) => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            return result;
        } catch (error: any) {
            console.log(error);
            return '';
        }
    }
}

const nftAPIManager = new NFTStorageManager();
export default nftAPIManager;