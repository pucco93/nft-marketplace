import nftAPIManager from '../managers/NFTStorageManager';
import winemakers from '../winemakersDB/WinemakersDB.json';
import data from "../winemakersDB/WinemakersDB.json" assert { type: "JSON" };

export const checkWinemaker = (connectedAccount: string): boolean => {
    return winemakers?.some((winemaker) => winemaker.etherId === connectedAccount);
};


export const truncate = (text: string, startChars: number, endChars: number, maxLength: number) => {
    if (text.length > maxLength) {
        let start = text.substring(0, startChars);
        const end = text.substring(text.length - endChars, text.length);
        while (start.length + end.length < maxLength) {
            start = start + '.';
        }
        return start + end;
    }
    return text;
};

export const retrieveImagePath = async (ipfsAddress: string) => {
    let metadataJson = `https://nftstorage.link/ipfs/${ipfsAddress.replace('ipfs://', '').replace('/metadata.json', '')}/metadata.json`;
    const data = await nftAPIManager.getImage(metadataJson);
    return `https://nftstorage.link/ipfs/${data?.image?.replace('ipfs://', '')}`;
};

export const winemakerChecker = (connectedAccount: string) => {
  return data.some((item: any) => item.etherId.toLowerCase() === connectedAccount.toLowerCase());
};