//https://nextjs.org/docs/basic-features/layouts

import Navbar from './Topbar';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
}
