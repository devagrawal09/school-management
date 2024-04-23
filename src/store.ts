import { createRelationships, createStore } from "tinybase/with-schemas";
import { createLocalPersister } from "tinybase/persisters/persister-browser";

export const store = createStore().setTablesSchema({
  employees: {
    name: { type: "string" },
    gender: { type: "string" },
    fatherName: { type: "string" },
    startDate: { type: "string" },
    mobile: { type: "string" },
    address: { type: "string" },
    qualification: { type: "string" },
    post: { type: "string" },
  },
  payments: {
    month: { type: "string" },
    amount: { type: "number" },
    employeeId: { type: "string" },
  },
});

export const relationships = createRelationships(
  store
).setRelationshipDefinition(
  "employeePayments",
  "payments",
  "employees",
  "employeeId"
);

export const persister = createLocalPersister(store as any, `management`);
persister
  .startAutoLoad()
  .then(() => console.log(`Loaded data from localStorage`));
persister
  .startAutoSave()
  .then(() => console.log(`Saving data to localStorage`));