/**
 * Setup Instructions: https://orm.drizzle.team/docs/get-started/neon-new
 */

import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.DATABASE_URL!);
