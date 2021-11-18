import {openDB} from 'idb'
import {Property} from './models';

const DATABASE_NAME = 'RentalZ';

initDB().then(() => {
    console.log('database initialize!')
})


async function initDB() {
    const db = await openDB(DATABASE_NAME, 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore('property', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        },
    });
}

export async function insertProperty(property: Property) {
    const db = await openDB(DATABASE_NAME, 1)
    const tx = db.transaction('property', 'readwrite');
    const store = tx.objectStore('property');
    await store.put(property)
}

export async function getAllProperty() {
    const db = await openDB(DATABASE_NAME, 1);
    let cursor = await db.transaction('property').objectStore('property').openCursor();
    let properties = [];
    while (cursor) {
        properties.push(cursor.value);
        cursor = await cursor.continue();
    }
    return properties
}

export async function getPropertyById(id: number) {
    const db = await openDB(DATABASE_NAME, 1);
    const ent = db.transaction('property').objectStore('property').get(id);
    return ent;
}

export async function deleteProperty(id: number) {
    const db = await openDB(DATABASE_NAME, 1);
    await db.delete('property', id)
}

export async function updateProperty(newProperty: Property) {
    const db = await openDB(DATABASE_NAME, 1);
    const ent = await db.transaction('property').objectStore('property').get(newProperty.id!) as Property
    ent.property = newProperty.property
    ent.bedroom = newProperty.bedroom
    ent.price = newProperty.price
    ent.furniture = newProperty.furniture
    ent.note = newProperty.note
    ent.reporter = newProperty.reporter
    await db.put('property', ent);
}
