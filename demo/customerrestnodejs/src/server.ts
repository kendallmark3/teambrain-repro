import app from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  console.log(`  GET /api/employees`);
  console.log(`  GET /api/employees/:id`);
});
