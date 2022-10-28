const types = [
    {
        img: './assets/images/rocket.svg',
        value: 'rocket',
        text: 'Ракета',
    },
    {
        img: './assets/images/drone.svg',
        value: 'drone',
        text: 'Безпілотник',
    },
    {
        img: './assets/images/plane.svg',
        value: 'plane',
        text: 'Літак',
    },
    {
        img: './assets/images/helicopter.svg',
        value: 'helicopter',
        text: 'Гелікоптер',
    },
    {
        img: './assets/images/explosion.svg',
        value: 'explosion',
        text: 'Вибух',
    },
    {
        img: './assets/images/hammer.svg',
        value: 'test',
        text: 'Тест',
    },
];

export class Actions {
    constructor() {
        this.buttonsBlock = document.querySelector('.button_group');
        this.notifyBtn = document.querySelector('.notify_btn');
        this.currentAction = types[types.length - 1];
    }

    createButtons() {
        types.forEach((action) => {
            const button = document.createElement('button');
            const image = document.createElement('img');
            const text = document.createTextNode(action.text);
            button.classList.add('button_group__btn');
            if (action.value === this.currentAction.value) {
                button.classList.add('button_group__btn--active');
            }
            image.src = action.img;
            image.alt = action.text;
            button.appendChild(image);
            button.appendChild(text);
            button.dataset.value = action.value;
            this.buttonsBlock.appendChild(button);
        });
    }

    clickListers(e) {
        this.currentAction = types.find((item) => item.value === e.target.dataset.value);
        const previousActive = document.querySelector('.button_group__btn--active');
        previousActive.classList.remove('button_group__btn--active');
        e.target.classList.add('button_group__btn--active');
    }

    init() {
        this.createButtons();
    }
}
