import React from "react";
import {DeviceEventEmitter} from "react-native";

class EventWatcher {
    static _Listeners = {
        count: 0,
        refs: {}
    }
    static _Watcher = { }
    static onEventListener(eventName, callback){
        EventWatcher._Watcher[eventName] = DeviceEventEmitter.addListener(eventName, callback);
    }
    static addEventListener(eventName, callback){
        const eventId = `E-${EventWatcher._Listeners.count}${eventName}`
        const remove = DeviceEventEmitter.addListener(eventId,callback)
        EventWatcher._Listeners.count++
        EventWatcher._Listeners.refs[eventId] = {
            eventName,
            callback,
            remove
        }
        DeviceEventEmitter.emit(eventName,true);
    }
    static emitEvent(eventName, data){
        for (const listenersKey in EventWatcher._Listeners){
            const {eventName: lookupEvent} = EventWatcher._Listeners[listenersKey];
            if(lookupEvent === eventName){
                DeviceEventEmitter.emit(listenersKey,data);
            }
        }
    }
    static removeEventListener(eventName){
        for (const listenersKey in EventWatcher._Listeners) {
            if(listenersKey in EventWatcher._Listeners){
                const {eventName: lookupEvent, remove} = EventWatcher._Listeners[listenersKey];
                if(lookupEvent === eventName){
                    remove && remove();
                    if(eventName in EventWatcher._Watcher){
                        EventWatcher._Watcher[eventName] && EventWatcher._Watcher[eventName]();
                        delete EventWatcher._Watcher[eventName];
                    }
                    delete EventWatcher._Listeners[listenersKey];
                }
            }
        }
        const null_safe = {};
        const copy = EventWatcher._Listeners;
        for (const copyKey in copy) {
            if(copy[copyKey]){
                null_safe[copyKey] = copy[copyKey];
            }
        }
        EventWatcher._Listeners = null_safe;
    }
    static removeAllListeners(){
        for (const listenersKey in EventWatcher._Listeners){
            if(listenersKey in EventWatcher._Listeners){
                const {eventName: lookupEvent} = EventWatcher._Listeners[listenersKey];
                EventWatcher.removeEventListener(lookupEvent);
            }
        }
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
