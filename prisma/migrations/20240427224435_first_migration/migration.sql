-- CreateEnum
CREATE TYPE "RESERVATION_STATUS" AS ENUM ('APPROVED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id_usr" SERIAL NOT NULL,
    "name_usr" TEXT NOT NULL,
    "role_usr" TEXT NOT NULL,
    "email_usr" TEXT NOT NULL,
    "password_usr" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_usr")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id_rsv" SERIAL NOT NULL,
    "init_time_rsv" TIMESTAMP(3) NOT NULL,
    "end_time_rsv" TIMESTAMP(3) NOT NULL,
    "status_rsv" "RESERVATION_STATUS" NOT NULL,
    "id_usr" INTEGER NOT NULL,
    "id_rms" INTEGER NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id_rsv")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id_rms" SERIAL NOT NULL,
    "name_rms" TEXT NOT NULL,
    "capacity_rms" INTEGER NOT NULL,
    "description_rms" TEXT NOT NULL,
    "time_slot_rms" INTEGER NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id_rms")
);

-- CreateTable
CREATE TABLE "user_room_config" (
    "allow_create_reserve" BOOLEAN NOT NULL,
    "allow_cancel_reserve" BOOLEAN NOT NULL,
    "id_usr" INTEGER NOT NULL,
    "id_rms" INTEGER NOT NULL,

    CONSTRAINT "user_room_config_pkey" PRIMARY KEY ("id_usr","id_rms")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_usr_key" ON "users"("email_usr");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_id_usr_fkey" FOREIGN KEY ("id_usr") REFERENCES "users"("id_usr") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_id_rms_fkey" FOREIGN KEY ("id_rms") REFERENCES "rooms"("id_rms") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_room_config" ADD CONSTRAINT "user_room_config_id_usr_fkey" FOREIGN KEY ("id_usr") REFERENCES "users"("id_usr") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_room_config" ADD CONSTRAINT "user_room_config_id_rms_fkey" FOREIGN KEY ("id_rms") REFERENCES "rooms"("id_rms") ON DELETE RESTRICT ON UPDATE CASCADE;
