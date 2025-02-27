import React from 'react';
// import './home.css';

const imgUrl = "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Home = () => {
    return (
        <div className="home-container">
            <div className="image-section">
                <img src={imgUrl} alt="Description" />
            </div>
            <div className="text-section">
                <h1>Empower your Vision, Take Control of your Data</h1>
                <p>Track key metrics, manage projects, and make strategic decisions with real-time data insights.</p>
                <button onClick={() => window.location.href='/partners'}>Start Now</button>
            </div>
        </div>
    );
};

export default Home;