-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "email" VARCHAR(50),
    "phone_no" VARCHAR(50),
    "status" VARCHAR(50) DEFAULT 'Pending',
    "password" TEXT,
    "profile_pic" TEXT,
    "token" TEXT,
    "address" TEXT,
    "created_on" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_key" ON "users"("token");
