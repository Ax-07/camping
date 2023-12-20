export const getDataChalets = async () => {
    try {
        const response = await fetch('./db/descriptifChalet.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}