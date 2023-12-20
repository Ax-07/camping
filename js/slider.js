import { getDataChalets } from "/services/api/chaletApi.js";

export class Slider {
    constructor() {
        console.log('Slider initialized');
        this.init();
        this.container = document.querySelector('.container');
        this.slider = document.querySelector('.slider');
        this.sliderList = document.querySelector('.slider__list');
        this.sliderDots = document.querySelector('.slider__dots');
        this.dots = document.querySelectorAll('.slider__dot');
        document.addEventListener('click', this.activate.bind(this), false);

    }

    createDotsAndItems() {
        const items = [];
        const dotsFragment = document.createDocumentFragment();

        getDataChalets().then(data => {
            data.forEach((chalet, index) => {
                const item = this.createItem(chalet.src, chalet.alt, index);
                items.push(item);

                const dot = this.createDot(index);
                dotsFragment.appendChild(dot);
            });

            this.sliderList.append(...items);
            this.sliderDots.appendChild(dotsFragment);
        }).catch(error => {
            console.error('Failed to initialize slider:', error);
        });
    }

    createDot(index) {
        const dot = document.createElement('div');
        dot.classList.add('slider__dot');
        dot.dataset.id = index;
        if (index === 0) {
            dot.classList.add('slider__dot--active');
        }
        return dot;
    }

    createItem(imgSrc, altText, index) {
        const item = document.createElement('li');
        item.classList.add('slider__item', 'slider__item--' + index);
        item.style.backgroundImage = 'url(' + imgSrc + ')';
        item.id = index;
        const tag = document.createElement('span');
        tag.classList.add('slider__img-tag');
        tag.textContent = altText;
        item.append(tag);
        return item;
    }

    setActiveDot(targetDot) {
        const items = document.querySelectorAll('.slider__item');
        const activeDot = document.querySelector('.slider__dot.slider__dot--active');
        const activeIndex = Array.from(items).findIndex(item => item.id === activeDot?.dataset.id); console.log('activeIndex', activeIndex);
        if (activeDot) {
            activeDot.classList.remove('slider__dot--active');
            console.log('activeDot', activeDot);
        }
        if (targetDot) {
            targetDot.classList.add('slider__dot--active');
            console.log('targetDot', targetDot);
        }
    }


    moveToIndex(index) {
        const items = document.querySelectorAll('.slider__item');
        const currentIndex = Array.from(items).findIndex(item => item.id === index.toString()); console.log('currentIndex', currentIndex);

        if (currentIndex !== -1) {
            const itemsToMove = Array.from(items).slice(0, currentIndex); console.log('itemsToMove', itemsToMove);
            itemsToMove.forEach(item => this.sliderList.append(item)); console.log('sliderList', this.sliderList);
            this.animate(this.sliderList, this.slider, items);
        }
    }
    animate(a, b, items) {
        a.style.transform += `translateX(${-items[0].offsetWidth}px)`;
        b.style.transform += `translateX(${items[0].offsetWidth}px)`;
        console.log('animate', a, b, items);
    }

    previous(items) {
        this.sliderList.prepend(items[items.length - 1]);
        this.animate(this.slider, this.sliderList, items);
        const newActiveItem = items[items.length - 2];
        const targetDot = document.querySelector(`.slider__dot[data-id="${newActiveItem.id}"]`);
        this.setActiveDot(targetDot);
    }

    next(items) {
        this.sliderList.append(items[0]);
        this.animate(this.sliderList, this.slider, items);
        const newActiveItem = items[1];
        const targetDot = document.querySelector(`.slider__dot[data-id="${newActiveItem.id}"]`);
        this.setActiveDot(targetDot);
    }

    activate(e) {
        const items = document.querySelectorAll('.slider__item');
        const targetDot = e.target.closest('.slider__dot');

        if (targetDot) {
            const index = targetDot.dataset.id; console.log('targetDot', targetDot);
            this.moveToIndex(index);
            this.setActiveDot(targetDot);
        } else if (e.target.closest('.next')) {
            this.next(items);
        } else if (e.target.closest('.prev')) {
            this.previous(items);
        }
    }

    async init() {
        this.createDotsAndItems();
    }
}
