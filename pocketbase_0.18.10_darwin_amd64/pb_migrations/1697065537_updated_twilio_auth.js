/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vi0381jjlkm5ox")

  collection.name = "auth_twilio"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vi0381jjlkm5ox")

  collection.name = "twilio_auth"

  return dao.saveCollection(collection)
})
