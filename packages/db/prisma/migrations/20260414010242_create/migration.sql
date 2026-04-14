-- CreateTable
CREATE TABLE "ZapRunOutbox" (
    "id" TEXT NOT NULL,
    "syncRunId" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_syncRunId_key" ON "ZapRunOutbox"("syncRunId");

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_syncRunId_fkey" FOREIGN KEY ("syncRunId") REFERENCES "syncRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
