const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getSpecies(speciesId, token) {
    const result = await fetch(`${backend_base}/species/${speciesId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer: ${token}`,
        },
    });
    if (!result.ok) return -1;
    return await result.json();
}

export async function getAllSpecies(species, token) {
    const result = await fetch(`${backend_base}/species?species=${species}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer: ${token}`,
        },
    });
    if (!result.ok) return result.response;
    return await result.json();
}

export async function postSpecies(speciesJSON, token) {
    const result = await fetch(`${backend_base}/species/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(speciesJSON),
    });
    if (!result.ok) return -1;
    return await result.json();
}

export async function patchSpecies(speciesId, speciesJSON, token) {
    const result = await fetch(`${backend_base}/species/${speciesId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(speciesJSON),
    });
    if (!result.ok) return -1;
    return await result.json();
}

export async function getPlantsForUser(token) {
    const result = await fetch(`${backend_base}/plants`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer: ${token}`,
        },
    });
    if (!result.ok) return -1;
    return await result.json();
}

export async function getPlantById(plantId, token) {
    const result = await fetch(`${backend_base}/plants/${plantId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer: ${token}`,
        },
    });
    if (!result.ok) return -1;
    return await result.json();
}

export async function postPlant(plantJSON, token) {
    const result = await fetch(`${backend_base}/plants/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantJSON),
    });
    if (!result.ok) return -1;
    return await result.json();
}

export async function patchPlant(plantId, plantJSON, token) {
    const result = await fetch(`${backend_base}/plants/${plantId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantJSON),
    });
    if (!result.ok) return -1;
    return await result.json();
}
