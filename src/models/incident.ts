export class Incident {
    id: string;
    number: string;
    caller: string;
    state?: string;
    priority?: string;
    assignedTo?: string;
    description: string;
    notes?: string;

    constructor(id: string = '', number: string = '', caller: string = '', state: string = '', priority: string = '', assignedTo: string = '',
        description: string = '', notes: string = '') {
        this.id = id;
        this.number = number;
        this.caller = caller;
        this.state = state;
        this.priority = priority;
        this.assignedTo = assignedTo;
        this.description = description;
        this.notes = notes;
    }
}