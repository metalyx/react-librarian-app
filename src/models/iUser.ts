import { iRole } from './iRole';

export interface iUser {
    username: string;
    roles: iRole[];
    booked: string[] | undefined;
}
