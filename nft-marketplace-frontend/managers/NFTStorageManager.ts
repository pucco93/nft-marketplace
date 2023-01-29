import { NFTStorage, File, Blob } from 'nft.storage';
import { NFT_storage_config } from '../configs/nftstorage.config';

export const metadata = {
    "title": "Asset Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this NFT represents"
        },
        "description": {
            "type": "string",
            "description": "Describes the asset to which this NFT represents"
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
        }
    }
}

export class NFTStorageManager {
    constructor() {
        const NFT_STORAGE_TOKEN = NFT_storage_config.apiKey;
        const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    }

    public mint = async () => { 
        const imageFile = new File([ someBinaryImageData ], 'nft.png', { type: 'image/png' })
        const metadata = await client.store({
        name: 'My sweet NFT',
        description: 'Just try to funge it. You can\'t do it.',
        image: imageFile
        });
    }
}