import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import connectDB from './src/config/db';
import authRoutes from './src/routes/authRoutes';
import 'dotenv/config';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize DB connection
  await connectDB();

  // Middleware to parse JSON
  app.use(express.json());

  // API Routes
  app.use('/api/auth', authRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist directory
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
