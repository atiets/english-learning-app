import app from "./app.js";
import { connectDB } from "./utils/db.js";

const PORT = 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();