-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "libelle" TEXT NOT NULL,
    "montant" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "recurrence" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "libelle" TEXT NOT NULL,
    "montant" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "recurrence" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SavingGoals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "libelle" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "montant" REAL NOT NULL,
    "date_cible" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "SavingGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "libelle" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ShoppingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ShoppingListsItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "libelle" TEXT NOT NULL,
    "montant" REAL NOT NULL,
    "quantite" INTEGER NOT NULL,
    "cocher" INTEGER NOT NULL DEFAULT 0,
    "shoppingListsID" INTEGER NOT NULL,
    CONSTRAINT "ShoppingListsItems_shoppingListsID_fkey" FOREIGN KEY ("shoppingListsID") REFERENCES "ShoppingList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
