import { getPlantById, getSpecies } from "@/modules/Data";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { useRouter} from "next/router";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";


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
            if(router.isReady && isLoaded && userId){
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

            }else if(router.isReady && isLoaded && !userId){
                console.log("attempting to access when not logged in")
                setLoading(false)

            }
        }
        getPlantInfo()
        
        
    }, [router, isLoaded])

    function calcTimeTillNextWater(){
        
    }


    if(loading){
        return(<>Loading.....</>)
    }else if(fakePlant){
        redirect('/404')

    }else if(speciesNoLoad){
        redirect('/create_species') //not sure if this is what we want to do

    }else{
        return(
            <>
                <SignedIn>
                    {/*Image at top */}
                    <div className="columns">
                        <div className="column is-full">
                            <div>{plantData["name"]}</div>
                            <div>{speciesInfo["commonName"]}</div>
                        </div>
                        <div className="column is-half">
                            <div className="card">
                                <div className="card-content">
                                    <p className="title">{calcTimeTillNextWater()}</p>
                                </div> 
                            </div>
                        </div>
                        <div className="column is-half">

                        </div>
                    </div>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl={"/" + plant_id} />
                </SignedOut>

            </>
        )
    }

}