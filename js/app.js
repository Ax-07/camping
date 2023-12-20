import { BurgerBtn } from "./burgerBtn.js";
import { SideNav } from "./sideNavEvent.js";
import { Slider } from "./slider.js";
import { TARIFS_BAR_RESTAURANTS } from "./tarifBarRestaurant.js";

class App {
    constructor() {
        this.init();
        document.addEventListener('click', (e) => {
            console.log(e.target);
        });
    }
    pagetarifBarRestaurnant = window.location.pathname.includes('/pages/tarifsBarRestaurant.html');
    init() {
        new BurgerBtn();
        console.log('App initialized');
        if(!this.pagetarifBarRestaurnant) {
            new SideNav();
            console.log('Slider & sideNav initialized');
            new Slider();
        }
        else {
            console.log('Tarif Bar Restaurant initialized');
            TARIFS_BAR_RESTAURANTS();
        }
        TARIFS_BAR_RESTAURANTS();
    }
}

new App();