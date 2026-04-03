import crypto from "node:crypto";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);

export async function hashingPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = (await scrypt(password, salt, 64)) as Buffer;

  return `${buf.toString("hex")}:${salt}`;
}

export async function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
) {
  const [hashedPassword, salt] = storedPassword.split(":");

  const hashedBuf = Buffer.from(hashedPassword, "hex");
  const suppliedBuf = (await scrypt(suppliedPassword, salt, 64)) as Buffer;

  return crypto.timingSafeEqual(hashedBuf, suppliedBuf);
}