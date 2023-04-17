export async function getSpecies(speciesId, token) {
    const result = await fetch(`${backend_base}/species/${speciesId}`, {
        'method': 'GET',
        'headers': {
            Authorization: `Bearer: ${token}`
        }
    })
    return await result.json()
}

export async function postSpecies(speciesJSON, token) {
    const result = await fetch(`${backend_base}/species/`, {
        'method': 'POST',
        'headers': {
            'Authorization': `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(speciesJSON)
    })
    return await result.json()
}

export async function patchSpecies(speciesId, speciesJSON, token) {
    const result = await fetch(`${backend_base}/species/${speciesId}`, {
        'method': 'PATCH',
        'headers': {
            'Authorization': `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(speciesJSON)
    })
    return await result.json()
}

export async function getPlantsForUser(userId, token) {
    const result = await fetch(`${backend_base}/plants?userId=${userId}`, {
        'method': 'GET',
        'headers': {
            'Authorization': `Bearer: ${token}`,
        }
    })
    return await result.json()
}

export async function getPlantById(plantId, token) {
    const result = await fetch(`${backend_base}/plants/${plantId}`, {
        'method': 'GET',
        'headers': {
            'Authorization': `Bearer: ${token}`,
        }
    })
    return await result.json()
}


export async function postPlant(plantJSON, token) {
    const result = await fetch(`${backend_base}/plants/`, {
        'method': 'POST',
        'headers': {
            'Authorization': `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(plantJSON)
    })
    return await result.json()
}

export async function patchPlant(plantId, plantJSON, token) {
    const result = await fetch(`${backend_base}/plants/${plantId}`, {
        'method': 'PATCH',
        'headers': {
            'Authorization': `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(plantJSON)
    })
    return await result.json()
}