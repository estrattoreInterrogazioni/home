declare class person {
    name: string;
    score: number;
    constructor(name: string, score: number);
}
declare class subject {
    name: string;
    number: number;
    days: number[];
    constructor(name: string, number: number, days: Array<number>);
}
declare class past {
    subject: string;
    people: string[];
    date: string;
    constructor(subject: string, people: Array<string>, date: string);
}
export declare class jsonFileFormat {
    people: person[] | undefined;
    subjects: subject[] | undefined;
    past: past[] | undefined;
    constructor(people: Array<person> | undefined, subjects: Array<subject> | undefined, past: Array<past> | undefined);
}
export declare function compute(json: jsonFileFormat): void;
export {};
