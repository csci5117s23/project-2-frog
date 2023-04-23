import { css } from "@emotion/react"
import Image from "next/image"

// a and b are javascript Date objects
//ripped from https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
export function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function decideLightImage(lightLevel){
    let lightLevelImg = <Image src={'/sun.png'} alt='sun' fill css={css`object-fit: cover;`}></Image>
    if (lightLevel == 'medium') 
        lightLevelImg = <Image src={'/sunAndCloud.png'} alt='sun and cloud' fill css={css`object-fit: cover;`}></Image>
    else if (lightLevel == 'low') 
        lightLevelImg = <Image src={'/cloud.png'} alt='cloud' fill css={css`object-fit: cover;`}></Image>

    return lightLevelImg
}