import React from 'react';

interface iPage {
    title?: string;
    children?: React.ReactNode;
}

const Page: React.FC<iPage> = ({ title = 'Page', children }) => {
    return (
        <div className='px-24'>
            <div className='border-b-2 border-solid border-blue-500'>
                <h1>{title}</h1>
            </div>
            <div className='my-5'>{children}</div>
        </div>
    );
};

export default Page;
