import { iRole } from './iRole';

export interface iUser {
    _id: string;
    username: string;
    roles: iRole[];
    booked: string[] | undefined;
}
