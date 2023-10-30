-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contatos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contato_nome" TEXT NOT NULL,
    "contato_email" TEXT NOT NULL,
    "contato_numero" TEXT NOT NULL,
    "contato_unidade" TEXT NOT NULL,
    "contato_ativo" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_contatos" ("contato_email", "contato_nome", "contato_numero", "contato_unidade", "id") SELECT "contato_email", "contato_nome", "contato_numero", "contato_unidade", "id" FROM "contatos";
DROP TABLE "contatos";
ALTER TABLE "new_contatos" RENAME TO "contatos";
CREATE UNIQUE INDEX "contatos_contato_email_key" ON "contatos"("contato_email");
CREATE UNIQUE INDEX "contatos_contato_numero_key" ON "contatos"("contato_numero");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
