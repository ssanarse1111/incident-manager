export class InputValidations {
    name!: string;
    isTouched!: boolean;
    errorMessages!: string[];
    isValid!: boolean;

    constructor(name: string, isTouched: boolean, errorMessages: string[], isValid: boolean, priority?: string, assignedTo?: string, description?: string, notes?: string) {
        this.name = name;
        this.isTouched = isTouched;
        this.errorMessages = errorMessages;
        this.isValid = isValid;
        // this.priority = priority;
        // this.assignedTo = assignedTo;
        // this.description = description;
        // this.notes = notes;
    }
}