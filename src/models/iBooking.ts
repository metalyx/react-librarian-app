import { iBook } from './iBook';
import { iUser } from './iUser';

export interface iBooking {
    date: string;
    booker: iUser;
    book: iBook;
    isActive: boolean;
}
