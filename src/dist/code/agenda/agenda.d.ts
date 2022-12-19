export declare class agenda {
    protected agendaEl: HTMLElement;
    protected monthEl: HTMLElement;
    protected titles: HTMLCollectionOf<HTMLElement>;
    protected buttonLeft: HTMLButtonElement;
    protected buttonRight: HTMLButtonElement;
    protected day: Date;
    constructor(agendaEl: HTMLElement, monthEl: HTMLElement, titles: HTMLCollectionOf<HTMLElement>, buttonLeft: HTMLButtonElement, buttonRight: HTMLButtonElement, day: Date);
    createAgenda: () => void;
    protected setAgendaMonth: (num: number) => void;
    protected setAgendaSwipeEvent: () => void;
}
