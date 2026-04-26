/*
  Warnings:

  - You are about to alter the column `quantite` on the `ShoppingListsItems` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingListsItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "libelle" TEXT NOT NULL,
    "montant" REAL NOT NULL,
    "quantite" REAL NOT NULL,
    "cocher" INTEGER NOT NULL DEFAULT 0,
    "shoppingListsID" INTEGER NOT NULL,
    CONSTRAINT "ShoppingListsItems_shoppingListsID_fkey" FOREIGN KEY ("shoppingListsID") REFERENCES "ShoppingList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShoppingListsItems" ("cocher", "id", "libelle", "montant", "quantite", "shoppingListsID") SELECT "cocher", "id", "libelle", "montant", "quantite", "shoppingListsID" FROM "ShoppingListsItems";
DROP TABLE "ShoppingListsItems";
ALTER TABLE "new_ShoppingListsItems" RENAME TO "ShoppingListsItems";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
