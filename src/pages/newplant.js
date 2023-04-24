//Add new plant page
//https://github.com/tbleckert/react-select-search
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { getSpecies, getSpeciesByName, postPlant } from '@/modules/Data';
import React from 'react';
import SelectSearch from 'react-select-search';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NewPlant() {
    const { isLoaded, userId, isSignedIn, getToken } = useAuth();
    const [loading, setLoading] = useState(true);

    // All plants in db
    const [speciesList, setSpeciesList] = useState([]);

    //return the user selected species by _id
    const [getPlant, setGetPlant] = useState([]);

    //get user input for plant name, last water, and image
    const [plantName, setPlantName] = useState('');
    const [waterDate, setWaterDate] = useState('');
    const [image, setImage] = useState([]);

    // Get data from db
    useEffect(() => {
        async function process() {
            if (userId) {
                try {
                    //From CLERK JWT templates for authentication
                    const token = await getToken({ template: 'codehooks' });
                    const list = await getSpeciesByName('', token);
                    console.log('response: ', list);
                    setSpeciesList(list);
                } catch (e) {
                    console.log('error in todos useEffect::', e.message);
                }
            }
            setLoading(false);
        }
        process();
    }, [isLoaded]);

    //Get select plant from db using species id
    async function submitId(id) {
        try {
            const token = await getToken({ template: 'codehooks' });
            const list = await getSpecies(id, token);
            console.log('return object: ', list);
            setGetPlant(list);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    //style the rendering of the list, need to fix arrow and tab keys
    function renderGroup(allGroup, { stack, name }, snapshot, className) {
        return (
            <button {...allGroup} className={className} type='button'>
                <span style={{ fontFamily: stack }}>{name}</span>
            </button>
        );
    }

    async function addPlant(e) {
        e.preventDefault();
        console.log('in addPlant', userId, plantName);
        try {
            const token = await getToken({ template: 'codehooks' });
            const list = await postPlant(
                {
                    userId: userId,
                    name: plantName,
                    species: getPlant.species,
                    image: '',
                    lastWatered: waterDate,
                },
                token
            );
            console.log('return object: ', list);
            setGetPlant(list);
        } catch (error) {
            console.log('Error: ', error);
        }
    }
    //search species and common name
    const groupCommonName = speciesList.map((specs) => ({ name: specs.commonName, value: specs._id }));
    const groupSpecies = speciesList.map((specs) => ({ name: specs.species, value: specs._id }));

    if (loading) {
        return (
            <>
                <div>loading....</div>
            </>
        );
    } else {
        return (
            <>
                <form>
                    <div class='has-text-weight-bold newPlant'>
                        <div class='field is-grouped'>
                            <div class='label'>Select Plant </div>
                            <div class='control'>
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
                                    onChange={(id) => submitId(id)}></SelectSearch>
                            </div>
                            <div class='control'>
                                <button class='button is-small'>Add New Species</button>
                            </div>
                        </div>
                    </div>
                    <div class='selectedPlant'>
                        <div class='context mt-2 has-text-weight-bold'></div>
                        <ul>
                            {Object.entries(getPlant).map(function (el) {
                                const [key, value] = el;
                                return (
                                    <li key={key}>
                                        <span class='context has-text-weight-bold'>{key}</span> : {value}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </form>
                <form>
                    <div class='field mt-5'>
                        <div class='label'>Name</div>
                        <div class='control is-expanded'>
                            <input
                                class='input'
                                type='text'
                                id='name'
                                placeholder='Name Your Plant'
                                onChange={(e) => {
                                    e.preventDefault();
                                    setPlantName(e.target.value);
                                }}></input>
                        </div>
                    </div>
                    <div class='field'>
                        <div class='label'>Last Watered</div>
                        <div class='control is-expanded'>
                            <input
                                class='inputDate'
                                type='date'
                                id='date'
                                placeholder='Enter Date'
                                onChange={(e) => {
                                    e.preventDefault();
                                    setWaterDate(new Date(e.target.value));
                                }}></input>
                        </div>
                    </div>
                    <div class='field'>
                        <div class='label'>Add image component here</div>
                        <figure class='image is-128x128'>
                            <img src='/sun.png'></img>
                        </figure>
                        <div class='file'>
                            <label class='file-label'>
                                <input
                                    class='file-input'
                                    type='file'
                                    name='resume'
                                    accept='image/*'
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setImage(e.target.value);
                                        console.log('image', image);
                                    }}
                                />
                                <span class='file-cta'>
                                    <span class='file-icon'>
                                        <i class='fas fa-upload'></i>
                                    </span>
                                    <span class='file-label'>Upload image</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div class='control'>
                        <button class='button is-large' onClick={addPlant} value='submit'>
                            Add Plant
                        </button>
                    </div>
                </form>
            </>
        );
    }
}
