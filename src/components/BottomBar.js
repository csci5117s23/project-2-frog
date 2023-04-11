/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export default function BottomBar() {
    return (<div css={css`
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        background-color: slategray;
    `}>
        <div css={css`
            flex: 1;
            display: flex;
            justify-content: center;
        `}>
            <p css={css`margin: auto;`}>Smthn</p>
        </div>
        <div css={css`
            flex: 1;
            display: flex;
            justify-content: center;
        `}>
            <p css={css`margin: auto;`}>Smthn</p>
        </div>
        <div css={css`
            flex: 1;
            display: flex;
            justify-content: center;
        `}>
            <p css={css`margin: auto;`}>Add</p>
        </div>
    </div>)
}