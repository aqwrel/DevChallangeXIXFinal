import { Actions } from './actions.js'
import { Geo } from './geo.js'

class App {
    constructor() {
        this.actions = new Actions()
        this.geo = new Geo()
    }

    buttonGroupListener() {
        document.querySelector('.button_group').addEventListener('click', (e) => this.actions.clickListers(e))
    }

    init() {
        this.actions.init()
        this.buttonGroupListener()
        this.geo.watchPosition()
    }
}

const app = new App()
app.init()