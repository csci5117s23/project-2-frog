import { getPlantById, getSpecies, patchPlant } from "@/modules/Data";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { css } from "@emotion/react"
import { useRouter} from "next/router";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import  Image  from "next/image";
import { dateDiffInDays, decideLightImage } from "@/modules/randomHelpers";


export default function SinglePlant(){
    const [loading, setLoading] = useState(true)
    const [fakePlant, setFakePlant] = useState(false)
    const [speciesNoLoad, setSpeciesNoLoad] = useState(null)
    const [plantData, setPlantData] = useState(null)
    const [speciesInfo, setSpeciesInfo] = useState(null)

    const { isLoaded, userId, sessionId, getToken } = useAuth()

    const router = useRouter()
    const {plant_id} = router.query

    useEffect(()=>{
        async function getPlantInfo(){
            if(router.isReady && isLoaded){
                console.log("getting toekn and grabbing the plant");
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
            // }else if(router.isReady && isLoaded && !userId){
            //     console.log("attempting to access when not logged in")
            //     setLoading(false)

            // }
        }
        getPlantInfo()
        
        
    }, [router, isLoaded])

    function calcTimeTillNextWater(){
        //get time since last watered and subtract from number of days between waters
        const today = new Date()
        const lastWatered = new Date(plantData["lastWatered"])
        const difference = dateDiffInDays(today, lastWatered)

        //assuming that waterLevel is number of days between waters
        return speciesInfo["waterLevel"] - difference

    }

    async function waterPlant(){
        const token = await getToken({Template: "codehooks"});

        const response = await patchPlant(plant_id, {"lastWatered": new Date()}, token)

        if (response == -1){alert("wasn't able to update db")}

        setPlantData(response)
    }
    



    if(loading){
        return(<>Loading.....</>)
    }else{
        return(<>
            
            <div className="columns is-multiline is-mobile is-3 is-vcentered">
                <div className="column is-full-mobile is-half-desktop ">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <Image src = {plantData["image"]} fill></Image>
                            </figure>
                        </div>
                        <div className="card-content"> 
                            <div className="title">{plantData["name"]}</div>
                            <div className="subtitle">{speciesInfo["commonName"]}</div>
                        </div>
                    </div>
                </div>
                <div className="column is-full-mobile is-half-desktop">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                {speciesInfo['description']}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="column is-half-mobile is-quarter-desktop">
                    <div className="card">
                        <div className="card-content">
                            <p className="title">{calcTimeTillNextWater()}</p>
                            <p className="subtitle">Days until next water</p>
                        </div> 
                    </div>

                    
                </div>
                <div className="column is-half-mobile is-quarter-desktop">
                    <div className="card">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    {/* <Image src={'/sun.png'} alt='sun' fill css={css`object-fit: cover;`}></Image> */}
                                    {decideLightImage(speciesInfo["lightLevel"])}
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title">{speciesInfo["lightLevel"]}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="column is-half-mobile is-quarter-desktop">
                    <div className="card">
                        <div className="card-footer">
                            <button className="card-footer-item button is-primary" onClick={waterPlant}>Water Plant!</button>
                        </div>
                    </div>
                </div>

                <div className="column is-half-mobile is-quarter-desktop">
                    <div className="card">
                        <div className="card-content">
                            <p className="title">{speciesInfo["tempLevel"]}</p>
                        </div> 
                    </div>

                </div> 
            </div>
        </>)
    }

}