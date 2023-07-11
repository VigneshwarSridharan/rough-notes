import { atom } from "jotai";
import { v4 as uuid } from "uuid";

const activeUUID = uuid();

export const tabAtom = atom([
  {
    name: "New Tab",
    id: activeUUID,
    note: null,
  },
]);

export const activeTabAtom = atom(activeUUID);
