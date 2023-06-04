import { useEffect, useState } from 'react';
import Page from '../Page';
import { getAllBooks } from '../../helpers/getAllBooks';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { bookSlice } from '../../store/reducers/BookSlice';
import Book from './Book';
import { iBook } from '../../models/iBook';
import Input from '../input/Input';

const Books = () => {
    const { books, error, isLoading } = useAppSelector(
        (state) => state.bookReducer
    );
    const { setIsLoading, setBooks, setError } = bookSlice.actions;
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');
    const [booksToShow, setBooksToShow] = useState<iBook[]>([]);

    useEffect(() => {
        (async () => {
            if (books.length === 0) {
                dispatch(setIsLoading(true));

                const allBooks = await getAllBooks();

                if (allBooks) {
                    dispatch(setBooks(allBooks));
                    dispatch(setIsLoading(false));
                } else {
                    dispatch(setError('Error with fetching books'));
                    dispatch(setIsLoading(false));
                }
            }
        })();
    }, []);

    useEffect(() => {
        setBooksToShow(books);
    }, [books]);

    useEffect(() => {
        if (search.length <= 0) {
            setBooksToShow(books);
            return;
        }
        console.log(search);
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
        );

        setBooksToShow(filtered);
    }, [search]);

    return (
        <Page title='Books'>
            <div className='my-5'>
                <label>Search by title</label>
                <Input
                    type='text'
                    value={search}
                    onChange={setSearch}
                    className='ml-[12px]'
                />
            </div>
            {isLoading && <div>Loading books...</div>}
            {!isLoading && error.length === 0 && (
                <div className='flex flex-wrap gap-4 justify-center'>
                    {booksToShow.map((book) => (
                        <Book
                            key={book._id}
                            book={book}
                        />
                    ))}
                </div>
            )}
            {error.length > 0 && <div className='text-red-600'>{error}</div>}
        </Page>
    );
};

export default Books;
