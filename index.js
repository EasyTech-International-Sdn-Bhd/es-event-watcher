class EventWatcher {

    static _WatchListener = {
        count: 0,
        refs: {}
    }

    static _Listeners = {
        count: 0,
        refs: {},
    }

    static onEventListener(eventName, callback) {
        if (
            typeof eventName=== 'string' &&
            typeof callback === 'function'
        ) {
            EventWatcher._WatchListener.count++
            const eventId = 'W' + EventWatcher._WatchListener.count
            EventWatcher._WatchListener.refs[eventId] = {
                name: eventName,
                callback
            }
            return eventId;
        }
        return false
    }

    static addEventListener(eventName, callback) {
        if (
            typeof eventName=== 'string' &&
            typeof callback === 'function'
        ) {
            EventWatcher._Listeners.count++
            const eventId = 'l' + EventWatcher._Listeners.count
            EventWatcher._Listeners.refs[eventId] = {
                name: eventName,
                callback,
            }
            Object.keys(EventWatcher._WatchListener.refs).forEach(_id => {
                if (
                    EventWatcher._WatchListener.refs[_id] &&
                    eventName === EventWatcher._WatchListener.refs[_id].name
                ) {
                    EventWatcher._WatchListener.refs[_id].callback(true)
                }
            })
            return eventId
        }
        return false
    }
    static removeEventListener(id) {
        if (typeof id === 'string') {
            if(id in EventWatcher._WatchListener.refs){
                EventWatcher._WatchListener.refs[id].callback(false)
            }
            return delete EventWatcher._Listeners.refs[id]
        }
        return false
    }

    static removeAllListeners() {
        let removeError = false
        Object.keys(EventWatcher._Listeners.refs).forEach(_id => {
            const removed = delete EventWatcher._Listeners.refs[_id]
            removeError = (!removeError) ? !removed : removeError
        })
        Object.keys(EventWatcher._WatchListener.refs).forEach(_id => {
            delete EventWatcher._WatchListener.refs[_id]
        })
        return !removeError
    }

    static emitEvent(eventName, data) {
        Object.keys(EventWatcher._Listeners.refs).forEach(_id => {
            if (
                EventWatcher._Listeners.refs[_id] &&
                eventName === EventWatcher._Listeners.refs[_id].name
            )
                EventWatcher._Listeners.refs[_id].callback(data)
        })
    }

    /*
     * shortener
     */
    static on(eventName, callback) {
        return EventWatcher.addEventListener(eventName, callback)
    }

    static rm(eventName) {
        return EventWatcher.removeEventListener(eventName)
    }

    static rmAll() {
        return EventWatcher.removeAllListeners()
    }

    static emit(eventName, data) {
        EventWatcher.emitEvent(eventName, data)
    }

    static onEvent(eventName, callback){
        return EventWatcher.onEventListener(eventName,callback);
    }

}
export { EventWatcher }
export { EventWatcher as EventRegister }
