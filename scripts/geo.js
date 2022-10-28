export class Geo {
    constructor() {
        this.compassArrow = document.querySelector('.compass_arrow')
    }

    watchPosition() {
        navigator.geolocation.watchPosition((data) => {
            this.compassArrow.style.transform = `rotate(${data.coords.heading}deg)`;
        }, error => {
            console.error(error);
        });         
    }
}