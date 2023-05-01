/** @jsxImportSource @emotion/react */
import { getSpecies } from "@/modules/Data"
import { dateDiffInDays } from "@/modules/randomHelpers"
import {useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import Image from "next/image"
import Link from "next/link"

export default function PlantCard(props) {
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const [speciesInfo, setSpeciesInfo] = useState(null)
    const [water, setWater] = useState(null)
    const [waterLevel, setWaterLevel] = useState(null)
    const [emergency, setEmergency] = useState(null)
    useEffect(()=>{
        async function calcWater(){
            //get time since last watered and subtract from number of days between waters
            const token = await getToken({Template: "codehooks"});
            const today = new Date()
            const lastWatered = new Date(props.plant.lastWatered)
            const difference = dateDiffInDays( lastWatered, today)
            const species = await getSpecies(props.plant.species, token)
           
            if(species){
                setSpeciesInfo(species)
                if(speciesInfo){
                    setWater(speciesInfo['waterLevel'] - difference)
                    if (water <= 0 ){
                        setEmergency(1)
                        setWaterLevel(0)
                    }
                    else{
                        setEmergency(0)
                        setWaterLevel( (water /speciesInfo['waterLevel'])*100)
                    }
                    return water
                }
            }
        }
        calcWater()
    }, [isLoaded, speciesInfo])

    return <div className='card' css={css`margin: 0.25rem;`}>
        <Link href={`/plants/${props.plant._id}`}>
            <div className='card-image'>
                <figure className='image is-square'>
                    <Image 
                        src={props.plant.image || '/default_plant.png'} 
                        alt={props.plant.name} 
                        fill>
                    </Image>
                </figure>
            </div>
            <div className={emergency ?  'card-content has-background-danger' : 'card-content'}>
                <h1 className= {emergency ?  'title is-spaced has-text-centered has-text-white' : 'title is-spaced has-text-centered'} 
                    css={css`height: 3rem;`}>{props.plant.name || 'Unnamed Plant'}</h1>
                <p className= {emergency ?  'subtitle has-text-centered has-text-white' : 'subtitle has-text-centered'} >Water in {water} days</p>
                <progress class="progress is-info" value={waterLevel} max="100"></progress>
            </div>
        </Link>
    </div>
}