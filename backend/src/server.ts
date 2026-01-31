import app from "./app";
import { connectDB } from "./utils/db";

const PORT = 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();