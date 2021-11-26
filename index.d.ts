declare module 'es-event-watcher' {
    type Callback = (data: any) => void;
  
    class EventWatcher {
      public static onEventListener(eventName: string, callback: Callback): string | boolean

      public static addEventListener(eventName: string, callback: Callback): string | boolean
  
      public static removeEventListener(id: string): boolean
  
      public static removeAllListeners(): boolean
  
      public static emitEvent(eventName: string, data?: any): void
  
      // shortener
      public static onEvent(eventName: string, callback: Callback): string | boolean
      
      public static on(eventName: string, callback: Callback): string | boolean
  
      public static rm(id: string): boolean
  
      public static rmAll(): boolean
  
      public static emit(eventName: string, data?: any): void
    }
  
    export { EventWatcher };
    export { EventWatcher as EventRegister };
}
  