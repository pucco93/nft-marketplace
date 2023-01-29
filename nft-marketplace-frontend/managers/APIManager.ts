
export const getWinemakers = async () => {
    try {
        debugger
        const response = await fetch('../../winemakersDB/winemakersDB.json');
        const winemakers = await response.json();
        debugger
        if(winemakers) {
            return winemakers;
        }
    } catch (error) {
        console.log(error);
    }
    return [];
};
