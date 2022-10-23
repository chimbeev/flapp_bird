class InputHandler {
    eventHandlerMap = {}

    constructor(eventHandlerConfig) {
        this._eventHandlerConfig = eventHandlerConfig
    }
}

class MouseInputHandler extends InputHandler {
    buttonIndexNameMap = { //Названия кнопок
        0: 'left',
        1: 'middle',
        2: 'right',
    }

    eventHandlerMap = {
        click: (event) => {
            const buttonName = this.buttonIndexNameMap[event.button] // выбрать название кнопки из массива
            const handler = this._eventHandlerConfig[buttonName] //выбрать обработчик по названию кнопки
            if (handler) { //Если есть обработчик то передать ему событие
                handler(event)
            }
        },
    }
    subscribe() {
        Object.entries(this.eventHandlerMap).forEach(([name,handler]) => {
            document.addEventListener(name, handler)
        })
    }
}

