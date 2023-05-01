//Add new plant page
//https://github.com/tbleckert/react-select-search
import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import { getSpecies, getAllSpecies, postPlant } from '@/modules/Data'
import React from 'react'
import SelectSearch from 'react-select-search'
import ImageUploadComp from '@/components/ImageUploadComp'
import { useRouter } from 'next/router'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NewPlant() {
	const { isLoaded, userId, isSignedIn, getToken } = useAuth()
	const [loading, setLoading] = useState(true)
	const router = useRouter()
	const redirect = () => {
		router.push('/species/new')
	}

	// All plants in db
	const [speciesList, setSpeciesList] = useState([])

	//The returned user selected species by _id
	const [getPlant, setGetPlant] = useState([])

	//User input for plant name, last water, and image
	const [plantName, setPlantName] = useState('')
	const [waterDate, setWaterDate] = useState(() => new Date())
	const [image, setImage] = useState('')

	//Get all plant data from db
	useEffect(() => {
		async function process() {
			if (userId) {
				try {
					//From CLERK JWT templates for authentication
					const token = await getToken({
						template: 'codehooks',
					})
					const list = await getAllSpecies(token)
					setSpeciesList(list)
				} catch (e) {
					console.log('error in useEffect::', e.message)
				}
			}
			setLoading(false)
		}
		process()
	}, [isLoaded, loading])

	//Get user selected plant from db using species id
	async function submitSpeciesId(id) {
		try {
			const token = await getToken({ template: 'codehooks' })
			const list = await getSpecies(id, token)
			setGetPlant(list)
		} catch (error) {
			console.log('Error: ', error)
		}
	}

	//Add new plant to plants db
	async function addPlant(e) {
		e.preventDefault()

		try {
			const token = await getToken({ template: 'codehooks' })
			let list = []
			if(image == ''){
				list = await postPlant(
					{
						userId: userId,
						name: plantName,
						species: getPlant['_id'],
						lastWatered: waterDate
					},
					token
				)
			}else{
				list = await postPlant(
					{
						userId: userId,
						name: plantName,
						species: getPlant['_id'],
						image: image,
						lastWatered: waterDate,
					},
					token
				)
			}
			if (list == -1) {
				alert('Error Posting Plant ')
			}
			setGetPlant(list)
			router.push(`/plants/${list['_id']}`)

		} catch (error) {
			console.log('Error: ', error)
		}
	}

	//Separate species and common name for search filter
	const groupCommonName = speciesList.map((specs) => ({ name: specs.commonName, value: specs._id }))
	const groupSpecies = speciesList.map((specs) => ({ name: specs.species, value: specs._id }))

	if (loading) {
		return (
			<>
				<div>loading....</div>
			</>
		)
	} else {
		return (
			<>
				<form>
					<div className='has-text-weight-bold newPlant'>
						<div className='field is-grouped'>
							<div className='label'>Select Plant </div>
							<div className='control'>
								<SelectSearch
									options={[
										{
											type: 'group',
											name: 'Common Name',
											items: groupCommonName,
										},
										{
											type: 'group',
											name: 'Species',
											items: groupSpecies,
										},
									]}
									id='search'
									placeholder='Search Plants'
									search={true}
									type='group'
									multiple={false}
									onChange={(id) => submitSpeciesId(id)}></SelectSearch>
							</div>
							<div className='control'>
								<button className='button is-small' onClick={redirect}>
									Add New Species
								</button>
							</div>
						</div>
					</div>
					<div className='selectedPlant'>
						<div className='context mt-2 has-text-weight-bold'>
							<ul>
								{console.log('species is ', getPlant.species)}
								<li>
									{getPlant.species
										? [getPlant.species, ' - ', getPlant.commonName]
										: 'Species Not Selected'}
								</li>
							</ul>
						</div>
					</div>
				</form>
				<form>
					<div className='field mt-5'>
						<div className='label'>Name</div>
						<div className='control is-expanded'>
							<input
								className='input'
								type='text'
								id='name'
								placeholder='Name Your Plant'
								onChange={(e) => {
									setPlantName(e.target.value)
								}}></input>
						</div>
					</div>
					<div className='field'>
						<div className='label'>Last Watered</div>
						<div className='control is-expanded'>
							<input
								className='inputDate'
								type='date'
								id='date'
								placeholder='Enter Date'
								onChange={(e) => {
									setWaterDate(new Date(e.target.value))
								}}></input>
						</div>
					</div>

					<div className='field'>
						<ImageUploadComp setImage={setImage}></ImageUploadComp>
					</div>
					<div className='control'>
						<button className='button is-large' onClick={addPlant} value='submit'>
							Add Plant
						</button>
					</div>
				</form>
			</>
		)
	}
}
