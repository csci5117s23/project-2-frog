import { getSpecies } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function viewSpecies() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [species, setSpecies] = useState(null)
    const { userId, getToken } = useAuth()
    const { id } = router.query
    useEffect(() => {
        async function process() {
            console.log('loading')
            const token = await getToken({ template: 'codehooks' })
            const result = await getSpecies(id, token)
            setLoading(false)
            if (result == -1) return
            setSpecies(result)
        }
        process()
    }, [loading, userId])

    if (species) {
        return (<div className='container'>
            <div className='content'>
                <h1 className='title'>{species.species}</h1>
                <h2 className='subtitle'>Common name: {species.commonName}</h2>
                <p>Description: {species.description}</p>
                <div className='block'>
                    <h2>Care</h2>
                    <p>Light Level: {species.lightLevel}</p>
                    <p>Days between watering: {species.waterLevel}</p>
                    <p>Temperature Range: {species.tempLevel}</p>
                </div>
            </div>
        </div>)
    }
}