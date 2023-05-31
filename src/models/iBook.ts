export interface iBook {
    _id: string;
    title: string;
    year: string;
    isAvailable: boolean;
    authors: string[];
    description?: string;
    cover?: string;
}
