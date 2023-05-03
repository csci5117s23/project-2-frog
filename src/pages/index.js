/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import BottomBar from '@/components/BottomBar'
import PlantCard from '@/components/PlantCard'
import 'bulma/css/bulma.css'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { getPlantsForUser } from '@/modules/Data'
import Script from 'next/script'
import PlusButton from '@/components/PlusButton'
import { useSignIn, useUser } from '@clerk/nextjs'

export default function Home() {
	const [plants, setPlants] = useState([])
	const [loading, setLoading] = useState(true)
	const { userId, getToken } = useAuth()
	const { isSignedIn } = useUser()

	useEffect(() => {
		async function load() {
			if (!userId) return
			const token = await getToken({ template: 'codehooks' })
			const data = await getPlantsForUser(token)
			if (data != -1) setPlants(data)
			else setPlants([])
			setLoading(false)
		}
		load()
	}, [loading, userId])

	const plantCards = [[], [], [], []]

	if (!plants.length) plantCards.push(<p key={'no'}>You have no plants</p>)
	let i = 0
	for (const plant of plants) {
		plantCards[i].push(<PlantCard key={plant._id} plant={plant}></PlantCard>)
		i++
		if (i > 3) i = 0
	}

	if (!isSignedIn) {
		return (
			<>
				<div className='hero'>
					<div className='hero-body'>
						<div className='container has-text-centered'>
							<span>
								<figure className='image is-128x128'>
									<img src='/plant_icon.png'></img>
								</figure>

								<p className='title'>EntMoot</p>
							</span>
							<p className='subtitle'>Plant Care</p>
						</div>
					</div>
				</div>
			</>
		)
	}
	return (
		<>
			<Head>
				<title>EntMoot</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
				<Script src='/src/modules/hamburger.js'></Script>
			</Head>
			<div className='container'>
				<div className='section'>
					<div className='columns'>
						<div className='column'>
							<div className='columns is-mobile'>
								<div className='column is-half'>{plantCards[0]}</div>
								<div className='column is-half'>{plantCards[1]}</div>
							</div>
						</div>
						<div className='column'>
							<div className='columns is-mobile'>
								<div className='column is-half'>{plantCards[2]}</div>
								<div className='column is-half'>{plantCards[3]}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<PlusButton />
		</>
	)
}
