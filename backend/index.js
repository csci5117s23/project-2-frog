
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string } from 'yup';

// Use Crudlify to create a REST API for any collection
const speciesYup = object({
    species: string().required(),
    commonName: string().required(),
    lightLevel: string().required(),
    waterLevel: string().required(),
    tempLevel: string().required()
})

const plantsYup = object({
    userId: string().required(),
    name: string().required(),
    species: string().required(),
    lastWatered: date().default(() => new Date()),
    createdOn: date().default(() => new Date()),
})

crudlify(app)

// bind to serverless runtime
export default app.init();
