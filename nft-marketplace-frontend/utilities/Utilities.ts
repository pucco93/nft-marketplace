import winemakers from '../winemakersDB/WinemakersDB.json';

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