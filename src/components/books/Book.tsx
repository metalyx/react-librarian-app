import React from 'react';
import { iBook } from '../../models/iBook';

interface iBookComponent {
    book: iBook;
}

const Book: React.FC<iBookComponent> = ({ book }) => {
    return (
        <div className='h-[250px] w-[100%]'>
            <div className='max-h-full p-2 rounded border border-solid border-blue-500 overflow-hidden flex'>
                <div className=' w-[50%]'>
                    <img
                        className='object-cover max-h-[100%]'
                        src={book.cover}
                        alt='book cover'
                    />
                </div>
                <div className='w-[50%]'>
                    <p className='text-xl'>
                        {book.title} ({book.year})
                    </p>
                    <p>Authors: {book.authors}</p>
                    <p>{book.description}</p>
                    <p>
                        Available at library:{' '}
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
