/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { SignInButton, useAuth, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import icon from '../../public/plant_icon.png'
export default function TopBar() {
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    function burgerActive() {
        const navbarMenu = document.querySelector('#nav-links')
        const burger = document.querySelector('#burger')
        burger.classList.toggle('is-active')
        navbarMenu.classList.toggle('is-active')
    }
    return (
        <nav className='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <Link href='/' className='navbar-item'>
                    <figure className='image' css={css`padding: 0;`}>
                        <Image src={icon} alt='icon'></Image>
                    </figure>
                </Link>
                <div className='navbar-item'>Plant App</div>
                <a className='navbar-burger' id='burger' onClick={burgerActive}>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div className='navbar-menu' id='nav-links'>
                <div className='navbar-end'>
                    <a className='navbar-item'>
                        <SignedIn>
                            <UserButton a></UserButton>
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
