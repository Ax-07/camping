export const getTarifsBarRestaurants = async () => {
    try {
        const response = await fetch('./db/carteComplete.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}