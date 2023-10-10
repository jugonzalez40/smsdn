/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jreah2oijl595r3",
    "created": "2023-10-10 03:03:03.234Z",
    "updated": "2023-10-10 03:03:03.234Z",
    "name": "message_sent",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bxa70xp1",
        "name": "field",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "11v8mrhgotj3q8b",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_NiNCJ8B` ON `message_sent` (`id`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jreah2oijl595r3");

  return dao.deleteCollection(collection);
})
