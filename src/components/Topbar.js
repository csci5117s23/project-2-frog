/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SignInButton, useAuth, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
export default function TopBar() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    function burgerActive() {
        const navbarMenu = document.querySelector('#nav-links');
        navbarMenu.classList.toggle('is-active');
    }
    return (
        <nav className='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <a className='navbar-item'>YOOOOOO PLANT APP</a>
                <a className='navbar-burger' id='burger' onClick={burgerActive}>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div className='navbar-menu ' id='nav-links'>
                <div className='navbar-end '>
                    <a className='navbar-item '>Settings</a>
                    <a className='navbar-item '>
                        <SignedIn>
                            <UserButton></UserButton>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton></SignInButton>
                        </SignedOut>
                    </a>
                </div>
            </div>
        </nav>
    )
}
