import React from 'react'
import 'normalize.css';
import './styles.css'
import Header from '../Header/Header';

const Layout = (props: {children: JSX.Element | JSX.Element[]}) => {
    const {children} = props;
    
    return (
        <>
            <Header />
            <main id="main" className="main">
                <div className="layout">
                    {children}
                </div>
            </main>
        </>
        
    )
}

export default Layout
