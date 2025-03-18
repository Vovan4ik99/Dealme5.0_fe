import { useEffect, useRef } from "react";

type EventHandlerCallback = () => void;

export type EMITTER_EVENTS = "updateAvatar";

const eventEmitter = {
    events: new Map<string, EventHandlerCallback[]>(),

    subscribe(event: EMITTER_EVENTS, handler: EventHandlerCallback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(handler);
    },

    unsubscribe(event: EMITTER_EVENTS, handler: EventHandlerCallback) {
        if (!this.events.has(event)) return;
        const handlers = this.events.get(event)!.filter((h) => h !== handler);
        this.events.set(event, handlers);
    },

    emit(event: EMITTER_EVENTS) {
        if (!this.events.has(event)) return;
        this.events.get(event)!.forEach((handler) => handler());
    },
};

export const useEventEmitter = (event: EMITTER_EVENTS, handler: EventHandlerCallback) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [ handler ]);

    useEffect(() => {
        const eventHandler = () => handlerRef.current();
        eventEmitter.subscribe(event, eventHandler);
        return () => {
            eventEmitter.unsubscribe(event, eventHandler);
        };
    }, [ event, handler ]);
};

export const publishEvent = (event: EMITTER_EVENTS) => {
    eventEmitter.emit(event)
};