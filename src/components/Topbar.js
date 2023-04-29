/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import icon from '../../public/plant_icon.png'
export default function TopBar() {
    return <nav css={css`
        z-index: 1;
        position: fixed;
        top: 0;
        height: 3rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #3E5641;
        a:hover {
            background-color: #435B46;
        }
    `}>
        <Link href='/' className='navbar-item'>
            <figure className='image' css={css`padding: 0;`}>
                <Image src={icon} alt='icon'></Image>
            </figure>
        </Link>
        <div css={css`
            margin: 0.5rem;
        `}>
            <SignedIn>
                <UserButton></UserButton>
            </SignedIn>
            <SignedOut>
                <SignInButton></SignInButton>
            </SignedOut>    
        </div>
    </nav>

}
