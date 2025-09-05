export interface Button {
    name: string,
    path: string,
    disabled: string,
    action?:string
}

export interface NavBar {
    name: string;
    buttons: Button[];
}