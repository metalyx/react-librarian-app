import React, { useEffect } from 'react';
import Page from './Page';
import { getAllBooks } from '../helpers/getAllBooks';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { bookSlice } from '../store/reducers/BookSlice';
import Book from './books/Book';

const Books = () => {
    const { books, error, isLoading } = useAppSelector(
        (state) => state.bookReducer
    );
    const { setIsLoading, setBooks, setError } = bookSlice.actions;
    const dispatch = useAppDispatch();

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

    return (
        <Page title='Books'>
            {isLoading && <div>Loading books...</div>}
            {!isLoading && error.length === 0 && (
                <div className='flex flex-wrap'>
                    {books.map((book) => (
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
