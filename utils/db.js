import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGO_URL);
  conn.isConnected = db.connections[0].readyState;
  console.log(db.connection.db.databaseName);
};

// connection.on("open", () => {
//   console.log("mongoDb is connected");
// });

// connection.on("error", (error) => {
//   console.log(error);
// });
