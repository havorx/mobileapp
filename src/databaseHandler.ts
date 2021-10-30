import { openDB } from 'idb'
import { Record } from './models';

const DATABASE_NAME = "PROPERTYRENTAL";

initDB().then(() => {
  console.log('database initialize!')
})


async function initDB() {
  const db = await openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore('record', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
    },
  });
}

export async function insertRecord(record: Record) {
  const db = await openDB(DATABASE_NAME, 1)
  const tx = db.transaction('record', 'readwrite');
  const store = tx.objectStore('record');
  await store.put(record)
}

export async function getAllRecords() {
  const db = await openDB(DATABASE_NAME, 1);
  var cursor = await db.transaction("record").objectStore("record").openCursor();
  var records = [];
  while (cursor) {
    records.push(cursor.value);
    cursor = await cursor.continue();
  }
  return records
}

export async function getRecordById(id: number) {
  const db = await openDB(DATABASE_NAME, 1);
  const ent = db.transaction("record").objectStore("record").get(id);
  return ent;
}

export async function deleteRecord(id: number) {
  const db = await openDB(DATABASE_NAME, 1);
  await db.delete("record", id)
}

export async function updateRecord(recordToUpdate: Record) {
  const db = await openDB(DATABASE_NAME, 1);
  const ent = await db.transaction("record").objectStore("record").get(recordToUpdate.id!) as Record
  ent.property = recordToUpdate.property
  ent.bedroom = recordToUpdate.bedroom
  ent.date = recordToUpdate.date
  ent.price = recordToUpdate.price
  ent.furniture = recordToUpdate.furniture
  ent.note = recordToUpdate.note
  ent.reporter = recordToUpdate.reporter
  await db.put("record", ent);
}