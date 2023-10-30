-- CreateTable
CREATE TABLE "contatos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contato_nome" TEXT NOT NULL,
    "contato_email" TEXT NOT NULL,
    "contato_numero" TEXT NOT NULL,
    "contato_unidade" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "template_nome" TEXT NOT NULL,
    "template_namespace" TEXT NOT NULL,
    "template_parametro" BOOLEAN NOT NULL,
    "template_ativo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "log_horario" DATETIME NOT NULL,
    "log_info" TEXT NOT NULL,
    "log_tipo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "contatos_contato_email_key" ON "contatos"("contato_email");

-- CreateIndex
CREATE UNIQUE INDEX "contatos_contato_numero_key" ON "contatos"("contato_numero");
