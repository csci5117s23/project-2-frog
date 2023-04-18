import { getPlantById, getSpecies } from "@/modules/Data";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { useRouter} from "next/router";
import { useEffect, useState } from "react";


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
                    setLoading(false)
                }else{
                    setPlantData(plant_json)
                    const species = await getSpecies(plant_json["species"], token)
                    if(species == -1){
                        set
                    }

                    setLoading(false)
                }

            }else if(router.isReady && isLoaded && !userId){
                console.log("attempting to access when not logged in")
                setLoading(false)

            }
        }
        getPlantInfo()
        
        
    }, [router, isLoaded])


    if(loading){
        return(<>Loading.....</>)
    }else{
        return(
            <>

                <SignedIn>

                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl={"/" + plant_id} />
                </SignedOut>

            </>
        )
    }

}