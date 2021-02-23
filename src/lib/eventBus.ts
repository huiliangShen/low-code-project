class EventBus {
    _events: any

    constructor() {
        this._events = Object.create(null)
    }

    on(event: string | string[], cb: any) {
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.on(event[i], cb)
            }
        } else {
            (this._events[event] || (this._events[event] = [])).push(cb)
        }
    }

    off(event: string, cb: any) {
        const cbs = this._events[event]
        if (cbs && cbs.indexOf(cb)) {
            cbs.splice(cbs.indexOf(cb), 1)
        }
        return this
    }

    emit(event: string, ...args: any[]) {
        const arr = this._events[event] || []
        for (const i in arr) {
            const handler = arr[i]
            handler.apply(this, args)
        }
        return this
    }
}

export default new EventBus()
