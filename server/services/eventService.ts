import type {Event, Operation} from "../database";
import {EventRoles} from "../database";

async function appendOperations(eventId: number, operation: Operation) {
    const operations = EventRoles.getOperations.get(eventId) as Operation[];
    operations.push(operation);
    EventRoles.updateOperations.run(JSON.stringify(operations), eventId);
}

export async function createEvent(name: string, type: string, description: string, imagePaths: string[], creator: number) {
    const imagePathsJson = JSON.stringify(imagePaths)
    const operation: Operation = {
        userId: creator,
        timestamp: Date.now(),
        after: {
            name: name,
            type: type,
            description: description,
            imagePaths: imagePathsJson
        }
    };
    EventRoles.insert.run(name, type, 'open', description, imagePathsJson, JSON.stringify(operation));
    return {name: name, status: 'open'};
}

export async function editEvent(eventId: number, userId: number, changes: Operation) {
    const status = EventRoles.getStatus.get(eventId);
    switch (status) {
        case 'taken':
            throw new Error('cannotEditTakenEvent');
        case 'closed':
            throw new Error('cannotEditClosedEvent');
    }
    EventRoles.edit.run(changes.after.name, changes.after.type, changes.after.description, JSON.stringify(changes.after.imagePaths), eventId);
    await appendOperations(eventId, changes);
}

export async function EventChangeStatus(eventId: number, userId: number, status: 'open' | 'taken' | 'closed') {
    EventRoles.updateStatus.run(status, eventId);
    const operation: Operation = {
        userId: userId,
        timestamp: Date.now(),
        after: {
            status: status
        }
    };
    await appendOperations(eventId, operation);
    return {id: eventId, status: status};
}

export async function selectAllOpenEvent() {
    const events = EventRoles.selectAllOpen.all() as Event[];
    events.forEach(event => {
        event.imagePaths = JSON.parse(<string>event.imagePaths)
    });
    return events;
}