import { getTarifsBarRestaurants } from "../services/api/tarifsBarRestaurantsApi.js";

const container = document.querySelector('#tarifs-bar-restaurant');

const createTableForFamille = (famille, produits) => {
    container.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table');

    const caption = document.createElement('caption');
    caption.classList.add('table__title');
    caption.textContent = famille;
    table.appendChild(caption);

    const tbody = document.createElement('tbody');
    tbody.classList.add('table__body');
    for (const produit of produits) {
        const tr = document.createElement('tr');
        tr.classList.add('table__row');
        const td1 = document.createElement('td');
        td1.classList.add('table__cell');
        td1.textContent = produit.Nom;
        const td2 = document.createElement('td');
        td2.classList.add('table__cell');
        td2.textContent = produit.Prix;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    return table;
}

export const TARIFS_BAR_RESTAURANTS = async () => {
    try {
        const data = await getTarifsBarRestaurants();
        console.log(data);

        const familles = data.reduce((acc, element) => {
            if (!acc[element.Famille]) {
                acc[element.Famille] = [];
            }
            acc[element.Famille].push(element);
            return acc;
        }, {});

        console.log(familles);

        const fragment = document.createDocumentFragment();
        for (const famille in familles) {
            const table = createTableForFamille(famille, familles[famille]);
            fragment.appendChild(table);
        }

        container.appendChild(fragment);
    } catch (error) {
        console.error('Failed to initialize tarifsBarRestaurants:', error);
    }
};