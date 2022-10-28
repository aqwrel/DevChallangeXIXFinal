import {Actions} from './actions.js';
import {Geo} from './geo.js';

class App {
    constructor() {
        this.notifyBtn = document.querySelector('.notify_btn');
        this.actions = new Actions();
        this.geo = new Geo();
        this.cities = null;
    }

    buttonGroupListener() {
        document.querySelector('.button_group').addEventListener('click', (e) => this.actions.clickListers(e));
    }

    clickNotify() {
        navigator.geolocation.getCurrentPosition((e) => {
            const {latitude, longitude} = e.coords;
            const coord = this.geo.calcDegreeToPoint(latitude, longitude);
            const nearest = coord.reduce((prev, curr) => {
                return Math.abs(curr.pointDegree - this.geo.compass) < Math.abs(prev.pointDegree - this.geo.compass) ? curr : prev;
            }, coord[0]);

            this.showModal(latitude, longitude, nearest);
        });
    }

    showModal(latitude, longitude, nearest) {
        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal_wrapper');
        const modal = document.createElement('div');
        modal.classList.add('modal');
        const position = document.createElement('p');
        position.textContent = `Координати: ${latitude.toFixed(2)} lat ${longitude.toFixed(2)} lng`;
        modal.appendChild(position);
        const type = document.createElement('p');
        type.textContent = `Тип: ${this.actions.currentAction.text}`;
        modal.appendChild(type);
        const distance = document.createElement('p');
        distance.textContent = `Відстань: ${this.geo.calcCrow(latitude, longitude, nearest.item.geometry.coordinates[1], nearest.item.geometry.coordinates[0])} км`;
        modal.appendChild(distance);
        const city = document.createElement('p');
        city.textContent = `Найбільш ймовірне місто: ${nearest.item.properties.capital}, ${nearest.item.properties.country}`;
        modal.appendChild(city);
        const heading = document.createElement('p');
        heading.textContent = `Напрямок: ${this.geo.compass}°`;
        modal.appendChild(heading);
        const button = document.createElement('button');
        button.textContent = `OK`;
        button.addEventListener('click', () => {
            document.querySelector('.modal_wrapper').remove();
        });
        modal.appendChild(button);
        modalWrapper.appendChild(modal);
        document.body.appendChild(modalWrapper);
    }


    init() {
        this.actions.init();
        this.buttonGroupListener();
        this.geo.init();
        this.notifyBtn.addEventListener('click', (e) => this.clickNotify(e));
    }
}

const app = new App();
app.init();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('/serviceWorker.js')
            .then((res) => console.log('service worker registered'))
            .catch((err) => console.log('service worker not registered', err));
    });
}
