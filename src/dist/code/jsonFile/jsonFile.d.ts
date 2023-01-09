import { agenda } from "../agenda/agenda.js";
export declare class inputElWithJsonFileAttr extends HTMLInputElement {
    attriAgenda: agenda;
    attriDate: Date;
    constructor(attriAgenda: agenda, attriDate: Date);
}
export declare class jsonFile {
    protected el: inputElWithJsonFileAttr;
    protected agenda: agenda;
    protected date: Date;
    constructor(el: inputElWithJsonFileAttr, agenda: agenda, date: Date);
}
