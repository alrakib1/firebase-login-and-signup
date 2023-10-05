import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <h2 className="text-3xl">THis is home</h2>
        </div>
    );
};

export default Home;