import postgres from "postgres";
import { DB } from "../types";

export const make = () => postgres(process.env.DATABASE_URL!) as DB;
