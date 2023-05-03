import '@/styles/globals.css'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import 'bulma/css/bulma.css'

// If the current route is listed as public, render it directly
// Otherwise, use Clerk to require authentication
//  Only home page and sign-in page public
const publicPages = ['/sign-in/[[...index]]', '/sign-up/[[...index]]', '/']

export default function App({ Component, pageProps }) {
	// Get the pathname
	const { pathname } = useRouter()

	// Check if the current route matches a public page
	const isPublicPage = publicPages.includes(pathname)

	return (
		<ClerkProvider {...pageProps}>
			{isPublicPage ? (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			) : (
				<>
					<SignedIn>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</SignedIn>
					<SignedOut>
						<SignIn />
					</SignedOut>
				</>
			)}
		</ClerkProvider>
	)
}
