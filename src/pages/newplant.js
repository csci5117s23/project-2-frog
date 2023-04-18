//Add new plant
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NewPlant() {
    //Clerk
    const { isLoaded, userId, isSignedIn, getToken } = useAuth();
    const [loading, setLoading] = useState(true);

    // Get to do items that are false
    useEffect(() => {
        async function process() {
            if (userId) {
                try {
                    //From CLERK JWT templates for authentication
                    const token = await getToken({ template: 'codehooks' });
                } catch (e) {
                    console.log('error in todos useEffect::', e.message);
                }
            }
            setLoading(false);
        }
        process();
    }, [isLoaded]);

    //Retrieve input data
    async function submitHandler(e) {
        e.preventDefault();
        const data = event.target.item.value;
        const token = await getToken({ template: 'todo' });
        console.log('token:', token);

        try {
            console.log('try');
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
                            <div class='label'>Common Name</div>
                            <div class='control is-expanded'>
                                <input class='input' type='text' id='commonName' placeholder='Add Plant Name'></input>
                            </div>
                        </div>
                        <div class='field'>
                            <div class='label'>Species</div>
                            <div class='control is-expanded'>
                                <input class='input' type='text' id='species' placeholder='Add Plant Species'></input>
                            </div>
                        </div>
                        <div class='field'>
                            <div class='label'>Sunlight</div>
                            <div class='control is-expanded'>
                                <input class='input' type='text' id='lightLevel' placeholder='Add Sunlight Care'></input>
                                <span class='icon is-left'></span>
                                {/* <FontAwesomeIcon icon='fa-light fa-sun' /> */}
                            </div>
                        </div>
                        <div class='field'>
                            <div class='label'>Water</div>
                            <div class='control is-expanded'>
                                <input class='input' type='text' id='waterLevel' placeholder='Add Water Care'></input>
                                <span class='icon is-left'></span>
                                {/* add icon */}
                            </div>
                        </div>
                        <div class='field'>
                            <div class='label'>Temperature</div>
                            <div class='control is-expanded'>
                                <input class='input' type='text' id='tempLevel' placeholder='Add Temperature Care'></input>
                                <span class='icon is-left'></span>
                                {/* add icon */}
                            </div>
                        </div>
                        <div class='field'>
                            <div class='label'>Description</div>
                            <div class='control is-expanded'>
                                <textarea class='input' type='text' id='description' placeholder='Description'></textarea>
                            </div>
                        </div>
                        <div class='field'>
                            <div class='control'>
                                <a class='button'>Submit</a>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}
