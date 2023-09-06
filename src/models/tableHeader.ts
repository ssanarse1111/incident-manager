export class TableHeader {
    id!: string;
    label!: string;
    name!: string;
    dataType!: string;
    // priority!: string;
    // assignedTo!: string;
    // description!: string;
    // notes!: string;

    constructor(id: string, label: string, name: string, dataType: string, priority: string, assignedTo: string, description: string, notes: string) {
        this.id = id;
        this.label = label;
        this.name = name;
        this.dataType = dataType;
        // this.priority = priority;
        // this.assignedTo = assignedTo;
        // this.description = description;
        // this.notes = notes;
    }
}