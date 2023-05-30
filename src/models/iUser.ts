import { iRole } from './iRole';

export interface iUser {
    id: number;
    name: string;
    email: string;
    roles: iRole[];
}
