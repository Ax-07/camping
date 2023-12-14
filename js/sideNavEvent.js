import { toggle } from "./toggleOpen.js";

export class SideNav {
    constructor() {
        this.element = document.querySelector('.sideNav');
        this.init();
    }

    init() {
        console.log('sideNav initialized');
        this.element.addEventListener('click', (event) => {
            toggle(this.element);
        });
    
        // Stop propagation for links
        const links = this.element.querySelectorAll('.sideNav__link');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
    
                const targetId = link.getAttribute('data-target');
                const targetSection = document.querySelector(targetId);
    
                if (targetSection) {
                    // Scroll smoothly to the target section
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};