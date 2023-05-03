import { deletePlant, getPlantById, getSpecies, patchPlant } from "@/modules/Data";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { css } from "@emotion/react"
import { useRouter} from "next/router";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import  Image  from "next/image";
import { dateDiffInDays, decideLightImage } from "@/modules/randomHelpers";
import ImageUploadComp from "@/components/ImageUploadComp";

export default function SinglePlant(){
    const [loading, setLoading] = useState(true)
    const [fakePlant, setFakePlant] = useState(false)
    const [speciesNoLoad, setSpeciesNoLoad] = useState(null)
    const [plantData, setPlantData] = useState(null)
    const [speciesInfo, setSpeciesInfo] = useState(null)
    const [editingName, setEditingName] = useState(false)
    const [tempName, setTempName] = useState("")
    const [editingPhoto, setEditingPhoto] = useState(false)
    const [tempPhoto, setTempPhoto] = useState("")
    

    const { isLoaded, userId, sessionId, getToken } = useAuth()

    const router = useRouter()
    const {plant_id} = router.query

    useEffect(()=>{
        async function getPlantInfo(){
            if(router.isReady && isLoaded){
                console.log("getting token and grabbing the plant");
                const token = await getToken({Template: "codehooks"});
                const plant_json = await getPlantById(plant_id, token)

                if(plant_json == -1){
                    setFakePlant(true)
                }else{
                    setPlantData(plant_json)
                    const species = await getSpecies(plant_json["species"], token)
                    if(species == -1){
                        setSpeciesNoLoad(true)
                    }else{
                        setSpeciesInfo(species)
                    }
                }
                setLoading(false)
            }
        }
        getPlantInfo()
        
    }, [router, isLoaded])

    function calcTimeTillNextWater(){
        //get time since last watered and subtract from number of days between waters
        const today = new Date()
        const lastWatered = new Date(plantData["lastWatered"])
        const difference = dateDiffInDays( lastWatered, today)

        //assuming that waterLevel is number of days between waters
        return speciesInfo["waterLevel"] - difference

    }

    async function waterPlant(){
        const token = await getToken({Template: "codehooks"});

        const response = await patchPlant(plant_id, {"lastWatered": new Date()}, token)

        if (response == -1){alert("wasn't able to update db")}

        setPlantData(response)
    }

    function toggleEditingName(){
        setEditingName(!editingName)
    }

    async function changeName(){
        toggleEditingName()
        const token = await getToken({Template: "codehooks"});

        const response = await patchPlant(plant_id, {"name": tempName}, token)

        if (response == -1){alert("wasn't able to update db")}

        setPlantData(response)

    }

    function nameInput(event){
        setTempName(event.target.value)
    }

    function toggleEditingPic(){
        setEditingPhoto(!editingPhoto)
    }

    async function submitPicChange(){
        toggleEditingPic()
        const token = await getToken({Template: "codehooks"})

        const response = await patchPlant(plant_id, {"image": tempPhoto}, token)

        if (response == -1){alert("wasn't able to update db")}

        setPlantData(response)

    }

    async function killPlant(){
        const token = await getToken({Template: "codehooks"})

        const response = await deletePlant(plant_id, token)

        if (response == -1){alert("wasn't able to update db")}

        router.push('/')


    }
    


    const nameEditActive = editingName ? "is-active" : "";
    const photoEditActive = editingPhoto ? "is-active" : "";

    if(loading){
        return(<>Loading.....</>)
    }else{
        return(<>
            <div className={`modal ${nameEditActive}`}>
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Edit Plant Name</p>
                    <button
                        onClick={toggleEditingName}
                        className="delete"
                        aria-label="close"
                    />
                    </header>
                    <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder={plantData["name"]}
                            value= {tempName}
                            onChange={nameInput}
                        />
                        </div>
                    </div>
                    </section>
                    <footer className="modal-card-foot">
                    <button className="button is-success" onClick={changeName}>Save changes</button>
                    <button onClick={toggleEditingName} className="button">
                        Cancel
                    </button>
                    </footer>
                </div>
            </div>
            <div className={`modal ${photoEditActive}`}>
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Change Plant Picture</p>
                    <button
                        onClick={toggleEditingPic}
                        className="delete"
                        aria-label="close"
                    />
                    </header>
                    <section className="modal-card-body">
                        <ImageUploadComp
                        setImage = {setTempPhoto}
                        />
                    </section>
                    <footer className="modal-card-foot">
                    <button onClick={submitPicChange} className="button">
                        Complete
                    </button>
                    <button onClick={toggleEditingPic} className="button">
                        Cancel
                    </button>
                    </footer>
                </div>
            </div>   
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="columns is-vcentered">
                    <div className="column is-5">
                        <figure className="image is-4by3" onClick={toggleEditingPic}>
                            <Image alt='plant image' src = {plantData["image"]} fill></Image>
                        </figure>
                    </div>
                    <div className="column is-6 is-offset-1">
                        <h1 className="title is-2" onClick={toggleEditingName}>
                            {plantData["name"]}
                        </h1>
                        <h2 className="subtitle is-4">
                            Species: {speciesInfo['species']} <br></br>
                            Common name: {speciesInfo['commonName']}<br></br>
                            Description:<br></br>
                            {speciesInfo['description']}
                        </h2>
                        <br></br>
                        <div className="columns is-multiline is-mobile is-3 is-vcentered">
                            <div className="column is-full-mobile is-half-desktop">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-content">
                                            <p className="title">{calcTimeTillNextWater()}</p>
                                            <p className="subtitle">Days until next water</p>
                                        </div> 
                                        <div className="media">
                                            <div className="media-content">
                                                <figure className="image is-48x48">
                                                    {decideLightImage(speciesInfo["lightLevel"])}
                                                </figure>
                                            </div> 
                                            <div className="media-content">
                                                <p className="title">{speciesInfo["lightLevel"]} light</p>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <p className="title">{speciesInfo["tempLevel"]}(&#8457;)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="column is-half-mobile is-quarter-desktop">
                    <div className="card">
                        <div className="card-footer">
                            <button 
                            className="card-footer-item button"  
                            onClick={waterPlant}
                            >Water Plant!</button>
                        </div>
                    </div>
                </div>

                <div className="column is-half-mobile is-quarter-desktop">
                    <div className="card">
                        <div className="card-footer">
                            <button 
                            className="card-footer-item button is-danger"  
                            onClick={killPlant}
                            >Kill Plant :&#40;</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>)
    }

}
