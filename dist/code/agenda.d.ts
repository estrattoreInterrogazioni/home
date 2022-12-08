export declare class agenda {
    agendaEl: HTMLElement;
    monthEl: HTMLElement;
    titles: HTMLCollectionOf<HTMLElement>;
    buttonLeft: HTMLButtonElement;
    buttonRight: HTMLButtonElement;
    day: Date;
    constructor(agendaEl: HTMLElement, monthEl: HTMLElement, titles: HTMLCollectionOf<HTMLElement>, buttonLeft: HTMLButtonElement, buttonRight: HTMLButtonElement, day: Date);
    createAgenda: () => void;
    protected setAgendaMonth: (num: number) => void;
    protected setAgendaSwipeEvent: () => void;
}
