/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Image from "next/image"
import Link from "next/link"

export default function PlantCard(props) {

    let lightLevel = <Image src={'/sun.png'} fill css={css`object-fit: cover;`}></Image>
    if (props.lightLevel == 'medium') 
        lightLevel = <Image src={'/sunAndCloud.png'} fill css={css`object-fit: cover;`}></Image>
    else if (props.lightLevel == 'low') 
        lightLevel = <Image src={'/cloud.png'} fill css={css`object-fit: cover;`}></Image>

    return (
        <div css={css`
            width: 10rem;
            height: 20rem;
            background-color: slategray;
            margin: 1rem;
            border: 0.5rem solid green;
        `}>
            <div css={css`
                width: 100%;
                height: 50%;
                position: relative;
                border-bottom: 0.25rem solid green;
            `}>
                <Image src={props.image || '/default_plant.png'} fill></Image>
            </div>
            <div css={css`
                width: 100%;
                height: 50%;
            `}>
                <Link href={`/plants/${props.id}`}>
                    <h3 id='plantName' css={css`height: 20%; text-align: center;`}>{props.name || 'Unnamed Plant'}</h3>
                </Link>
                <div css={css`
                    display: flex;
                    flex-direction: row;
                    height: 80%;
                `}>
                    <div id='leftColumn' css={css`
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        
                    `}>
                        <div css={css`
                            height: 50%;
                            position: relative;
                            overflow: hidden;
                        `}>
                            {lightLevel}
                        </div>
                        <div css={css`
                            height: 50%;
                            position: relative;
                            text-align: center;
                        `}>
                            {props.tempLevel || '60-80'}
                        </div>
                    </div>
                    <div id='rightColumn' css={css`
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                    `}>
                        <div css={css`
                            height: 50%;
                            position: relative;
                            overflow: hidden;
                        `}>
                            <Image src='/watering_can.png' fill css={css`object-fit: cover;`}></Image>
                        </div>
                        <p css={css`text-align: center;`}> {props.lastWatered || 'today'} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}