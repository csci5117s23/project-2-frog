//Add new plant
//https://github.com/tbleckert/react-select-search
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { getSpecies, getReqSpecies } from '@/modules/Data';
import React from 'react';
import SelectSearch from 'react-select-search';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NewPlant() {
    const { isLoaded, userId, isSignedIn, getToken } = useAuth();
    const [loading, setLoading] = useState(true);

    //returning all species in db
    const [speciesList, setSpeciesList] = useState([]);
    //return the user selected species by _id
    const [oneSpec, setOneSpec] = useState([]);

    //may need to use userInput in later code, rn empty string
    const [userInput, setUserInput] = useState('');

    // Get to do items that are false
    useEffect(() => {
        async function process() {
            if (userId) {
                try {
                    //From CLERK JWT templates for authentication
                    const token = await getToken({ template: 'codehooks' });
                    const list = await getReqSpecies(userInput, token);
                    console.log('list: ', list);
                    setSpeciesList(list);
                } catch (e) {
                    console.log('error in todos useEffect::', e.message);
                }
            }
            setLoading(false);
        }
        process();
    }, [isLoaded, userInput]);

    //Get species from db
    async function submitId(id) {
        //console.log('species list: ', speciesList);
        //console.log('id: ', id);

        try {
            const token = await getToken({ template: 'codehooks' });
            const list = await getSpecies(id, token);
            console.log('return object: ', list);
            setOneSpec(list);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

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
                            <div class='label'>Select Species </div>
                            <div class='control'>
                                <SelectSearch
                                    options={speciesList.map((specs) => ({ name: specs.species, value: specs._id }))}
                                    id='species'
                                    placeholder='Search Species'
                                    search={true}
                                    multiple={false}
                                    onChange={(id) => submitId(id)}></SelectSearch>
                            </div>
                            <div class='control'>
                                <button class='button is-small'>Add New Species</button>
                            </div>
                        </div>
                    </div>
                    <div className='speciesInfo'>
                        <div class='context mt-2 has-text-weight-bold'></div>
                        <ul>
                            {Object.entries(oneSpec).map(function (el) {
                                const [key, value] = el;
                                return (
                                    <li>
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
                            <input class='input' type='text' id='name' placeholder='Name Your Plant'></input>
                        </div>
                    </div>
                    <div class='field'>
                        <div class='label'>Last Watered</div>
                        <div class='control is-expanded'>
                            <input class='input' type='date' id='date' placeholder='Enter Date'></input>
                        </div>
                    </div>
                    <div class='field'>
                        <div class='label'>Add image component here</div>
                        <figure class='image is-128x128'>
                            <img src='/sun.png'></img>
                        </figure>
                    </div>

                    <div class='control'>
                        <button class='button is-large'>Add Plant</button>
                    </div>
                </form>
            </>
        );
    }
}
