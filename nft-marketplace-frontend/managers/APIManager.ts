
export const getWinemakers = async () => {
    try {
        const response = await fetch('../../winemakersDB/winemakersDB.json');
        const winemakers = await response.json();
        if(winemakers) {
            return winemakers;
        }
    } catch (error) {
        console.log(error);
    }
    return [];
};
