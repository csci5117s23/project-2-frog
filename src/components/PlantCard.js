/** @jsxImportSource @emotion/react */
import { getSpecies } from "@/modules/Data"
import { dateDiffInDays } from "@/modules/randomHelpers"
import { css } from "@emotion/react"
import Image from "next/image"
import Link from "next/link"

export default function PlantCard(props) {
    const lastWatered = new Date(props.plant.lastWatered)

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
            <div className='card-content'>
                <h1 className='subtitle has-text-centered'
                    css={css`height: 3rem;`}>{props.plant.name || 'Unnamed Plant'}</h1>
            </div>
        </Link>
    </div>
}