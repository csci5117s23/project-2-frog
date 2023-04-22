//Add new plant
//https://github.com/tbleckert/react-select-search
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { getSpecies, getAllSpecies } from '@/modules/Data';
import React from 'react';
import SelectSearch from 'react-select-search';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NewPlant() {
    const { isLoaded, userId, isSignedIn, getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState('');
    const [speciesList, setSpeciesList] = useState([]);
    const [oneSpec, setOneSpec] = useState([]);

    // Get to do items that are false
    useEffect(() => {
        async function process() {
            if (userId) {
                try {
                    //From CLERK JWT templates for authentication
                    const token = await getToken({ template: 'codehooks' });
                    const list = await getAllSpecies(userInput, token);
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
    async function submitHandler(id) {
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
                        <div class='field'>
                            <div class='label'>Select Species</div>
                            <div class='control is-expanded'>
                                <SelectSearch
                                    options={speciesList.map((specs) => ({ name: specs.species, value: specs._id }))}
                                    id='species'
                                    placeholder='Select Species'
                                    search={true}
                                    multiple={false}
                                    onChange={(id) => submitHandler(id)}></SelectSearch>
                            </div>
                        </div>
                        <div class='field'>
                            <div class='label'>Name Your Plant</div>
                            <div class='control is-expanded'>
                                <input class='input' type='text' id='name' placeholder='Name Your Plant'></input>
                            </div>
                        </div>
                        {/* <div class='field'>
                            <div class='label'>Description</div>
                            <div class='control is-expanded'>
                                <textarea class='input' type='text' id='description' placeholder='Description'></textarea>
                            </div>
                        </div> */}
                        <div>
                            <figure class='image is-128x128'>
                                <img src='/'></img>
                            </figure>
                        </div>
                    </div>
                </form>
                <div>{console.log('oneSpecOutside', oneSpec)}</div>
                <div className='speciesCards'>
                    <div>{oneSpec._id}</div>
                    <div>{oneSpec.species}</div>
                    <div>{oneSpec.commonName}</div>
                    <div>{oneSpec.description}</div>
                    <div>{oneSpec.lightLevel}</div>
                    <div>{oneSpec.waterLevel}</div>
                    <div>{oneSpec.tempLevel}</div>
                </div>
            </>
        );
    }
}
