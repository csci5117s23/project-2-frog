import { getPlantById, postPlant, postSpecies } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Test() {
    const [loading, setLoading] = useState(true)
    const [plant, setPlant] = useState(null)

    const { userId, getToken } = useAuth()

    useEffect(() => {
        async function process() {
            if (!userId) return
            const token = await getToken({ template: 'codehooks' })
            console.log(token)
            const speciesResp = await postSpecies({
                                    "species": "Acer platanoides",
                                    "commonName": "Norway Maple",
                                    "description": "Acer platanoides, commonly known as the Norway maple, is a species of maple native to eastern and central Europe and western Asia, from Spain east to Russia, north to southern Scandinavia and southeast to northern Iran. It was introduced to North America in the mid-1700s as a shade tree. ",
                                    "lightLevel": "bright",
                                    "waterLevel": 2,
                                    "tempLevel": "temprate"
                                }, token)

            const response = await postPlant({
                "userId": userId,
                "name": "billy bob",
                "species": speciesResp['_id']
            }, token)


            const data = await getPlantById(response['_id'], token)
            setPlant(data)
            setLoading(false)
        }
        process()
    }, [loading, userId])

    return <>{JSON.stringify(plant)}</>
}