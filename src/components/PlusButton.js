/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Link from "next/link";
import Image from 'next/image';
import plus from '../../public/plus_button.png'

export default function PlusButton() {
    return <Link href='/newplant' 
            css={css`
                position: fixed;
                bottom: 3rem;
                right: 3rem;
                height: 3rem; 
                width: 3rem;
                border-radius: 1.5rem;
                background-color: #E88965;
            `}>
        <Image src={plus} alt='add plant'></Image>
    </Link>
}