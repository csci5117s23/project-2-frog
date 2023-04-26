//Add new plant page
//https://github.com/tbleckert/react-select-search
import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import { getSpecies, getSpeciesByName, postPlant } from '@/modules/Data'
import React from 'react'
import SelectSearch from 'react-select-search'
import ImageUploadComp from '@/components/ImageUploadComp'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NewPlant() {
	const { isLoaded, userId, isSignedIn, getToken } = useAuth()
	const [loading, setLoading] = useState(true)

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
					const list = await getSpeciesByName('', token)
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

	//style the rendering of the list, bug for arrow and tab keys
	function renderGroup(allGroup, { stack, name }, snapshot, className) {
		return (
			<button {...allGroup} className={className} type='button'>
				<span style={{ fontFamily: stack }}>{name}</span>
			</button>
		)
	}

	//Add new plant to plants db
	async function addPlant(e) {
		e.preventDefault()

		try {
			const token = await getToken({ template: 'codehooks' })
			const list = await postPlant(
				{
					userId: userId,
					name: plantName,
					species: getPlant['_id'],
					image: image,
					lastWatered: waterDate,
				},
				token
			)
			if (list == -1) {
				alert('Error Posting Plant ')
			}
			setGetPlant(list)
		} catch (error) {
			console.log('Error: ', error)
		}
		window.location.reload()
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
									// renderOption={renderGroup}
									options={[
										{
											type: 'group',
											name: 'Species',
											items: groupSpecies,
										},
										{
											type: 'group',
											name: 'Common Name',
											items: groupCommonName,
										},
									]}
									id='search'
									placeholder='Search Plants'
									search={true}
									type='group'
									multiple={false}
									onChange={(id) => submitSpeciesId(id)}
									// autoFucus
								></SelectSearch>
							</div>
							<div className='control'>
								<button className='button is-small'>Add New Species</button>
							</div>
						</div>
					</div>
					<div className='selectedPlant'>
						<div className='context mt-2 has-text-weight-bold'></div>
						<ul>
							{Object.entries(getPlant).map(function (el) {
								const [key, value] = el
								return (
									<li key={key}>
										<span className='context has-text-weight-bold'>{key}</span>{' '}
										: {value}
									</li>
								)
							})}
						</ul>
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
						<ImageUploadComp setImage={setImage}>

						</ImageUploadComp>
						{/* <div className='label'></div>
						<figure className='image is-128x128'>
							<img src='/sun.png'></img>
						</figure> */}
						{/* <div class='file is-small'>
                            <label class='file-label'>
                                <input
                                    className='file-input'
                                    type='file'
                                    name='resume'
                                    accept='image/*'
                                    onChange={(e) => {
                                        setImage(e.target.value);
                                        console.log('image', image);
                                    }}
                                />
                                <span class='file-cta'>
                                    <span class='file-icon'>
                                        <i class='fas fa-upload'></i>
                                    </span>
                                    <span class='file-label'>Upload</span>
                                </span>
                            </label>
                        </div> */}
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
