import { getPlantById } from "@/modules/Data";
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
            const data = await getPlantById('187958b7138-4fb5z2zz4e95sg', token)
            setPlant(data)
            setLoading(false)
        }
        process()
    }, [loading, userId])

    return <>{JSON.stringify(plant)}</>
}