/*
  Warnings:

  - You are about to drop the column `loser` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `games` table. All the data in the column will be lost.
  - Added the required column `outcome` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player1` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "loser",
DROP COLUMN "winner",
ADD COLUMN     "outcome" SMALLINT NOT NULL,
ADD COLUMN     "player1" INTEGER NOT NULL,
ADD COLUMN     "player2" INTEGER NOT NULL;
