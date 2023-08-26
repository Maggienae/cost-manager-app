/* Eden Bar 209037571
   Maggie Nae 208612234
*/

const DB_NAME = "costsdb";
const STORE_NAME = "costItems";
window.idb = {
  openCostsDB: openCostsDB,
  addCost: addCost,
  getAllCostItems: getAllCostItems,
  updateCostItem: updateCostItem,
  deleteCostItem: deleteCostItem,
};
console.log("window.idb:", window.idb);
function openCostsDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(new Error("Error opening database"));
    };
  });
}

function addCost(costItems) {
  return new Promise(async (resolve, reject) => {
    const db = await openCostsDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.add(costItems);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(new Error("Error adding cost item to database"));
    };
  });
}

function getAllCostItems() {
  return new Promise(async (resolve, reject) => {
    const db = await openCostsDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(new Error("Error fetching cost items from database"));
    };
  });
}

function updateCostItem(costItem) {
  return new Promise(async (resolve, reject) => {
    const db = await openCostsDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.put(costItem);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(new Error("Error updating cost item in database"));
    };
  });
}

function deleteCostItem(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openCostsDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(new Error("Error deleting cost item from database"));
    };
  });
}

export {
  openCostsDB,
  addCost,
  getAllCostItems,
  updateCostItem,
  deleteCostItem,
};
