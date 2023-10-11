/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9vi0381jjlkm5ox",
    "created": "2023-10-11 22:51:52.542Z",
    "updated": "2023-10-11 22:51:52.542Z",
    "name": "twilio_auth",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "u7kg2rru",
        "name": "auth_code",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("9vi0381jjlkm5ox");

  return dao.deleteCollection(collection);
})
