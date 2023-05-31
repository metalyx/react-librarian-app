import React from 'react';

interface iPage {
    title?: string;
    children?: React.ReactNode;
}

const Page: React.FC<iPage> = ({ title = 'Page', children }) => {
    return (
        <div className='mt-10'>
            <div>
                <h1>{title}</h1>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Page;
