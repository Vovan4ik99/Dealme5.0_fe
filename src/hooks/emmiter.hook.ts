import { useEffect, useRef } from "react";

type EventHandlerCallback<T = any> = (payload: T) => void;

export const EMITTER_EVENTS = ["updateAvatar"];

const eventEmitter = {
    events: new Map<string, EventHandlerCallback[]>(),

    subscribe<T>(event: string, handler: EventHandlerCallback<T>) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(handler);
    },

    unsubscribe<T>(event: string, handler: EventHandlerCallback<T>) {
        if (!this.events.has(event)) return;
        const handlers = this.events.get(event)!.filter((h) => h !== handler);
        this.events.set(event, handlers);
    },

    emit<T>(event: string, payload: T) {
        if (!this.events.has(event)) return;
        this.events.get(event)!.forEach((handler) => handler(payload));
    },
};

export const useEventEmitter = <T>(event: string, handler: EventHandlerCallback<T>) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        const eventHandler = (payload: T) => handlerRef.current(payload);
        eventEmitter.subscribe<T>(event, eventHandler);
        return () => {
            eventEmitter.unsubscribe<T>(event, eventHandler);
        };
    }, [event]);
};

export const publishEvent = <T>(event: string, payload: T) => eventEmitter.emit(event, payload);
