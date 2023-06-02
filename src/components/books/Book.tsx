import React from 'react';
import { iBook } from '../../models/iBook';

interface iBookComponent {
    book: iBook;
}

const Book: React.FC<iBookComponent> = ({ book }) => {
    return (
        <div className='sm:w-full lg:w-[400px] xl:w-[270px] '>
            <div className='h-full max-h-full p-2 rounded border border-solid border-blue-500 overflow-hidden flex'>
                <div className='w-[50%]'>
                    <img
                        className='object-cover max-h-[100%]'
                        src={book.cover}
                        alt='book cover'
                    />
                </div>
                <div className='w-[45%] ml-[5%]'>
                    <p className='text-xl'>
                        {book.title} ({book.year})
                    </p>
                    <p>
                        <b>Authors: </b> {book.authors}
                    </p>
                    <p>
                        <b>Description: </b>
                        {book.description}
                    </p>
                    <p>
                        <b>Available at library: </b>
                        {book.isAvailable ? (
                            <span className='text-green-600'>yes</span>
                        ) : (
                            <span className='text-red-600'>no</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Book;
