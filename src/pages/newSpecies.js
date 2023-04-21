import { postSpecies } from "@/modules/Data"
import { useAuth } from "@clerk/nextjs"
import { useState } from "react"

export default function NewSpecies() {
    const [scientificName, setScientificName] = useState('')
    const [commonName, setCommonName] = useState('')
    const [description, setDescription] = useState('')
    const [lightLevel, setLightLevel] = useState('high')
    const [wateringDays, setWateringDays] = useState(1)
    const [tempLevel, setTempLevel] = useState('60-80')
    const { getToken } = useAuth()

    async function submit() {
        const token = await getToken({ template: 'codehooks' })
        const result = postSpecies({
            species: scientificName,
            commonName: commonName,
            description: description,
            lightLevel: lightLevel,
            waterLevel: wateringDays,
            tempLevel: tempLevel
        }, token)
        if (result == -1) alert('error posting species')
    }

    return (<>
        <label htmlFor='scientificName'>Scientific Name: </label>
        <input id='scientificName' value={scientificName} onChange={(e)=>setScientificName(e.target.value)}></input>
        <label htmlFor='commonName'>Common Name: </label>
        <input id='commonName' value={commonName} onChange={(e)=>setCommonName(e.target.value)}></input>
        <label htmlFor='description'>Description: </label>
        <textarea id='description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <label htmlFor='lightLevel'>Light Level: </label>
        <select id='lightLevel' value={lightLevel} onChange={(e)=>setLightLevel(e.target.value)}>
            <option value='high'>high</option>
            <option value='medium'>medium</option>
            <option value='low'>low</option>
        </select>
        <label htmlFor='wateringDays'>Days between watering: </label>
        <input id='wateringDays' value={wateringDays} onChange={(e)=>setWateringDays(e.target.value)}></input>
        <label htmlFor='tempLevel'>Temperature Range: </label>
        <input id='tempLevel' value={tempLevel} onChange={(e)=>setTempLevel(e.target.value)}></input>
        <button onClick={submit} value='submit'>submit</button>
    </>)
}