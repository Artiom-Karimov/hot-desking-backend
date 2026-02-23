/*
  Warnings:

  - Added the required column `created_by` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'banned');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" UUID NOT NULL,
ADD COLUMN     "email" VARCHAR NOT NULL,
ADD COLUMN     "first_name" VARCHAR NOT NULL,
ADD COLUMN     "hash" VARCHAR,
ADD COLUMN     "last_name" VARCHAR NOT NULL,
ADD COLUMN     "role" "user_role" NOT NULL,
ADD COLUMN     "status" "user_status" NOT NULL;
