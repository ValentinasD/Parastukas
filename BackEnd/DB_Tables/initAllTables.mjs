import { createUserTable } from "./UserTable.mjs";
import { createPhotoTable } from "./PhotoTable.mjs";
import { createGroupTable } from "./GroupToursTable.mjs";
import { createTourTable } from "./ToursTable.mjs";



export const initAllTables = async (query) => {
    try {
        await createUserTable();
        await createPhotoTable(); // pirma, nes kitos lentelės priklauso nuo jos
        await createGroupTable(); // sekanti, nes ji taip pat naudoja photos
        await createTourTable();  // taip pat priklauso nuo photos ir groups
        console.log("✅ Visi duomenų bazės lentelės sėkmingai pajungtos .");
    } catch (error) {
        console.error("❌ Klaida kuriant lenteles:", error);
    }
};

