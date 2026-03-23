import { createApp } from './app.js';
import { config } from './utils/config.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`sample-app listening on http://localhost:${config.port}`);
});

