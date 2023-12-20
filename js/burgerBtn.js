export class BurgerBtn {
    constructor() {
        this.container = document.querySelector('.burgerBtn');
        this.open = false;

        this.onClick = this.onClick.bind(this);
        this.container.addEventListener('click', this.onClick);



        this.checkScreenWidth();
        window.addEventListener('resize', this.checkScreenWidth.bind(this));

        this.render();
    }

    onClick() {
        this.open = !this.open;
        this.container.classList.toggle('active', this.open);

        if (this.open) {
            console.log('open');
        } else {
            console.log('close');
        }
    }

    checkScreenWidth() {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (screenWidth <= 768) {
            this.container.style.display = 'flex';
        } else {
            this.container.style.display = 'none';
        }
    }

    render() {
        console.log('render');
        return this.container;
    }
}
