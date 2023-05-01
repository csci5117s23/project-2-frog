import Link from "next/link";

export default function Custom404(){
    return(<>
        <h1>Wrong page jack!</h1>
        <button className="button background-is-danger"><Link href='/'>Take me back home please!</Link></button>
        </>
    )
}