export class SideMenuItem {
    id!: number;
    label!: string;
    routeUrl!: string;
    constructor(id: number, label: string, routeUrl: string) {
        this.id = id;
        this.label = label;
        this.routeUrl = routeUrl;
    }
}