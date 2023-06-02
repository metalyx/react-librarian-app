import { iBooking } from './iBooking';
import { iRole } from './iRole';

export interface iUser {
    _id: string;
    username: string;
    roles: iRole[];
    bookings: iBooking[];
}
