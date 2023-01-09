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
    planFor: number;
    waitTime: number;
    people: person[] | undefined;
    subjects: subject[] | undefined;
    past: past[] | undefined;
    constructor(planFor: number, waitTime: number, people: Array<person> | undefined, subjects: Array<subject> | undefined, past: Array<past> | undefined);
}
declare class subjectGroup {
    subject: string | undefined;
    people: string[] | undefined;
    constructor(subject: string | undefined, people: string[] | undefined);
}
export declare class dayList {
    day: Date;
    tests: subjectGroup[];
    constructor(day: Date, tests: subjectGroup[]);
}
export declare function isSameDate(d1: Date, d2: Date): boolean;
export declare function isLesserDate(d1: Date, d2: Date): boolean;
export declare function compute(json: jsonFileFormat, day: Date, agenda: dayList[]): void;
export {};
