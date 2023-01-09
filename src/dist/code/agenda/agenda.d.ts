import { dayList } from "../compute/compute.js";
export declare class agenda {
    protected agendaEl: HTMLElement;
    protected monthEl: HTMLElement;
    protected buttonLeft: HTMLButtonElement;
    protected buttonRight: HTMLButtonElement;
    day: Date;
    agendaData: dayList[];
    constructor(agendaEl: HTMLElement, monthEl: HTMLElement, buttonLeft: HTMLButtonElement, buttonRight: HTMLButtonElement, day: Date, agendaData?: dayList[]);
    createAgenda: () => void;
    setAgendaMonth: (num: number) => void;
    protected setAgendaSwipeEvent: () => void;
}
