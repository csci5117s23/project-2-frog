/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export default function PlantCard(props) {

    return (
        <div css={css`
            width: 10rem;
            height: 20rem;
            background-color: slategray;
            margin: 1rem;
        `}>
            <div css={css`
                width: 100%;
                height: 50%;
                background-color: orange;
            `}>
                {/*Image goes here*/}
            </div>
            <div css={css`
                width: 100%;
                height: 50%;
                background-color: blue;
            `}>
                <h2 id='plantName'>{props.name}</h2>
                <div id='waterSchedule'>
                    {/*<Image>WATER IMAGE???</Image>*/}
                    {/*<p> X days </p>*/}
                </div>
            </div>
        </div>
    )
}