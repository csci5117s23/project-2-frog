//https://nextjs.org/docs/basic-features/layouts
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Topbar from './Topbar';

export default function Layout({ children }) {
    return (
        <>
            <Topbar />
            <main css={css`margin-top: 5rem;`}>{children}</main>
        </>
    );
}
