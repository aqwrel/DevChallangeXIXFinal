export class Geo {
    constructor() {
        this.compassCircle = document.querySelector('.compass_arrow');
        this.myPoint = document.querySelector('.compass_point');
        this.compass = null;
        this.cities = null;
    }

    get isIOS() {
        return !(navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/));
    }

    startCompass() {
        if (!this.isIOS) {
            DeviceOrientationEvent.requestPermission()
                .then((response) => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', (e) => this.handler(e), true);
                    } else {
                        alert('has to be allowed!');
                    }
                })
                .catch(() => alert('not supported'));
        } else {
            window.addEventListener('deviceorientationabsolute', (e) => this.handler(e), true);
        }
    }

    toRadians(degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    toDegrees(radians) {
        return radians * 180 / Math.PI;
    }


    calcDegreeToPoint(latitude, longitude) {
        const arr = [];
        this.cities.forEach((item) => {
            const point = {
                lat: item.geometry.coordinates[1],
                lng: item.geometry.coordinates[0],
            };

            const phiK = (point.lat * Math.PI) / 180.0;
            const lambdaK = (point.lng * Math.PI) / 180.0;
            const phi = (latitude * Math.PI) / 180.0;
            const lambda = (longitude * Math.PI) / 180.0;
            const psi = (180.0 / Math.PI) * Math.atan2(
                Math.sin(lambdaK - lambda),
                Math.cos(phi) * Math.tan(phiK) -
        Math.sin(phi) * Math.cos(lambdaK - lambda),
            );
            let pointDegree = Math.round(psi);
            if (pointDegree < 0) {
                pointDegree = pointDegree + 360;
            }
            arr.push({pointDegree, item});
        });
        return arr;
    }

    calcCrow(lat1, lon1, lat2, lon2) {
        const R = 6371; // km
        const dLat = this.toRadians(lat2-lat1);
        const dLon = this.toRadians(lon2-lon1);
        lat1 = this.toRadians(lat1);
        lat2 = this.toRadians(lat2);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;
        return d.toFixed(2);
    }

    handler(e) {
        this.compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
        // this.compass = 288.5;
        this.compassCircle.style.transform = `rotate(${-this.compass}deg)`;
    }

    async getCities() {
        const response = await fetch('../data/cities.json');
        const data = await response.json();
        this.cities = data;
    }

    async init() {
        await this.getCities();
        document.querySelector('.start').addEventListener('click', () => {
            document.querySelector('.app_cofirm').remove();
            this.startCompass();
        });
    }
}
