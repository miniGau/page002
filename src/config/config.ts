export function configuration() {
  console.log(`==>load process:${process.env.google_client_id}`);
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
    mongoStr: process.env.MONGO_STR,
  };
}
