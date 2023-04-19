/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TopBar from "@/components/Topbar";
import BottomBar from "@/components/BottomBar";
import PlantCard from "@/components/PlantCard";
import 'bulma/css/bulma.css'
import { SignInButton, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getPlantsForUser } from "@/modules/Data";
import Script from "next/script";

// export default function Home() {
  
//   return (
//     <>
//       <Head>
//         <title>Plant app idk</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main>
        
//           <nav class="navbar" role="navigation" aria-label="main navigation">
//             <div class="navbar-brand">
//               <a class="navbar-item" href="https://bulma.io">
//                 <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img>
//               </a>

//               <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
//                 <span aria-hidden="true"></span>
//                 <span aria-hidden="true"></span>
//                 <span aria-hidden="true"></span>
//               </a>
//             </div>

//             <div id="navbarBasicExample" class="navbar-menu">
//               <div class="navbar-start">
//                 <a class="navbar-item">
//                   Home
//                 </a>

//                 <a class="navbar-item">
//                   Documentation
//                 </a>

//                 <div class="navbar-item has-dropdown is-hoverable">
//                   <a class="navbar-link">
//                     More
//                   </a>

//                   <div class="navbar-dropdown">
//                     <a class="navbar-item">
//                       About
//                     </a>
//                     <a class="navbar-item">
//                       Jobs
//                     </a>
//                     <a class="navbar-item">
//                       Contact
//                     </a>
//                     <hr class="navbar-divider"></hr>
//                     <a class="navbar-item">
//                       Report an issue
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               <div class="navbar-end">
//                 <div class="navbar-item">
//                   <div class="buttons">
//                     <a class="button is-primary">
//                       <strong>Sign up</strong>
//                     </a>
//                     <a class="button is-light">
//                       Log in
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>
//           <div class="columns features">
//             <div class="column is-4">
//               <div class="card is-shady">
//                 <div class="card-image">
                  
//                 </div>
//                 <div class="card-content">
//                   <div class="content">
//                     <h4>Example plant 1</h4>
//                     <p>Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.</p>
                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="column is-4">
//               <div class="card is-shady">
//                 <div class="card-image">
                  
//                 </div>
//                 <div class="card-content">
//                   <div class="content">
//                     <h4>Example plant 2</h4>
//                     <p>example plant 2 description.</p>
                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
        
//       </main>
//     </>
//   )
// }


export default function Home() {
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const { userId, getToken } = useAuth()
  function burgerActive(){
    const navbarMenu = document.querySelector('#nav-links')
    navbarMenu.classList.toggle('is-active')
  }

  useEffect(() => {
    async function load() {
      if (!userId) return
      const token = await getToken({ template: 'codehooks' });
      const data = await getPlantsForUser(userId, token)
      if (data != -1) setPlants(data)
      else setPlants([])
      setLoading(false)
    }
    load()
  }, [loading, userId])

  const plantCards = []

  if (!plants.length) plantCards.push(<p key={'no'}>You have no plants</p>)
  for (const plant of plants) {
    plantCards.push(<PlantCard key={plant._id} plant={plant}></PlantCard>)
  }
  
  return (
    <>
      <Head>
        <title>Plant app idk</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Script src='/src/modules/hamburger.js'></Script>
      </Head>
      <main>
        
        <div className='container'>
          <nav className='navbar is-fixed-top is-dark' role="navigation" aria-label="main navigation">
            <div className='navbar-brand'>
            <a className="navbar-item">
              YOOOOOO PLANT APP
            </a>
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
                  <SignedIn>Welcome User!</SignedIn>
                  <SignedOut>
                    <SignInButton></SignInButton>
                  </SignedOut>
                </a>
              </div>
            </div>
          </nav>
          <div className='section'>
            <div className='columns'>
              {plantCards}
            </div>
          </div>
        </div>
        
      </main>
    </>
  );
}
