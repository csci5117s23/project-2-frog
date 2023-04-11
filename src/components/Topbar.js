/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export default function TopBar() {
    return (<div css={css`
        position: fixed;
        top: 0;
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
            <p css={css`margin: auto;`}>Logo</p>
        </div>
        <div css={css`
            flex: 1;
            display: flex;
            justify-content: center;
        `}>
            <p css={css`margin: auto;`}>Search</p>
        </div>
        <div css={css`
            flex: 1;
            display: flex;
            justify-content: center;
        `}>
            <p css={css`margin: auto;`}>Menu</p>
        </div>
    </div>)
}