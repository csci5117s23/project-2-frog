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

    return (<div className="container">
        <h1 className='title'>Add a species</h1>
        <div className='field'>
            <label className='label' htmlFor='scientificName'>Scientific Name: </label>
            <div className='control'>
                <input className='input' id='scientificName' value={scientificName} onChange={(e)=>setScientificName(e.target.value)}></input>
            </div>
        </div>
        <div className='field'>
            <label className='label' htmlFor='commonName'>Common Name: </label>
            <div className='control'>
                <input className='input' id='commonName' value={commonName} onChange={(e)=>setCommonName(e.target.value)}></input>
            </div>
        </div>
        <div className='field'>
            <label className='label' htmlFor='description'>Description: </label>
            <div className='control'>
                <textarea className='textarea' id='description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>
        </div>
        <div className='field'>
            <label htmlFor='lightLevel'>Light Level: </label>
            <div className='control'>
                <div className='select'>
                    <select id='lightLevel' value={lightLevel} onChange={(e)=>setLightLevel(e.target.value)}>
                        <option value='high'>high</option>
                        <option value='medium'>medium</option>
                        <option value='low'>low</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='field'>
            <label className='label' htmlFor='wateringDays'>Days between watering: </label>
            <div className='control'>
                <input className='input' id='wateringDays' value={wateringDays} onChange={(e)=>setWateringDays(e.target.value)}></input>
            </div>
        </div>
        <div className='field'>
            <label className='label' htmlFor='tempLevel'>Temperature Range: </label>
            <div className='control'>
                <input className='input' id='tempLevel' value={tempLevel} onChange={(e)=>setTempLevel(e.target.value)}></input>
            </div>
        </div>
        <div className='control'>
            <button className='button' onClick={submit} value='submit'>submit</button>
        </div>
    </div>)
}