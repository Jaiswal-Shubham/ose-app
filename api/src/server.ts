// backend/src/server.ts
import app from './api';
import config from './config';

const port = config.port || 4000;

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});