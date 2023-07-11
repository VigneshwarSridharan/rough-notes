import { Client, Databases } from "appwrite";

const client = new Client();

const projectID = "64a969566479f32132d4";
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectID);

const databases = new Databases(client);

const DATABASE_ID = "64a96a9308240ef44820";

const COLLECTION_ID = "64a96a9f237a4313308b";

export const NotesDocument = {
  list: () => databases.listDocuments(DATABASE_ID, COLLECTION_ID),
  update: (documentID, data) =>
    databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentID, data),
};
