/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Image from "next/image"
import Link from "next/link"
import { decideLightImage } from "@/modules/randomHelpers"

export default function PlantCard(props) {


    return <div className='card'>
        <Link href={`/plants/${props.plant._id}`}>
            <div className='card-image'>
                <figure className='image is-square'>
                    <Image src={props.plant.image || '/default_plant.png'} alt={props.plant.name} fill></Image>
                </div>
                <div css={css`
                    width: 100%;
                    height: 50%;
                `}>
                    <h3 id='plantName' css={css`height: 20%; text-align: center;`}>{props.plant.name || 'Unnamed Plant'}</h3>
                    
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
                                {decideLightImage(props.lightLevel)}
                            </div>
                            <div css={css`
                                height: 50%;
                                position: relative;
                                text-align: center;
                            `}>
                                {props.plant.tempLevel || '60-80'}
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
                                <Image src='/watering_can.png' alt='watering can' fill css={css`object-fit: cover;`}></Image>
                            </div>
                            <p css={css`text-align: center;`}> {props.plant.lastWatered || 'today'} </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
    // return (
    //     <Link href={`/plants/${props.plant._id}`}>
    //         <div css={css`
    //             width: 10rem;
    //             height: 20rem;
    //             background-color: slategray;
    //             margin: 1rem;
    //             border: 0.5rem solid green;
    //         `}>
    //             <div css={css`
    //                 width: 100%;
    //                 height: 50%;
    //                 position: relative;
    //                 border-bottom: 0.25rem solid green;
    //             `}>
    //                 <Image src={props.plant.image || '/default_plant.png'} alt={props.plant.name} fill></Image>
    //             </div>
    //             <div css={css`
    //                 width: 100%;
    //                 height: 50%;
    //             `}>
    //                 <h3 id='plantName' css={css`height: 20%; text-align: center;`}>{props.plant.name || 'Unnamed Plant'}</h3>
                    
    //                 <div css={css`
    //                     display: flex;
    //                     flex-direction: row;
    //                     height: 80%;
    //                 `}>
    //                     <div id='leftColumn' css={css`
    //                         display: flex;
    //                         flex-direction: column;
    //                         flex: 1;
                            
    //                     `}>
    //                         <div css={css`
    //                             height: 50%;
    //                             position: relative;
    //                             overflow: hidden;
    //                         `}>
    //                             {lightLevel}
    //                         </div>
    //                         <div css={css`
    //                             height: 50%;
    //                             position: relative;
    //                             text-align: center;
    //                         `}>
    //                             {props.plant.tempLevel || '60-80'}
    //                         </div>
    //                     </div>
    //                     <div id='rightColumn' css={css`
    //                         display: flex;
    //                         flex-direction: column;
    //                         flex: 1;
    //                     `}>
    //                         <div css={css`
    //                             height: 50%;
    //                             position: relative;
    //                             overflow: hidden;
    //                         `}>
    //                             <Image src='/watering_can.png' alt='watering can' fill css={css`object-fit: cover;`}></Image>
    //                         </div>
    //                         <p css={css`text-align: center;`}> {props.plant.lastWatered || 'today'} </p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </Link>
    // )
}