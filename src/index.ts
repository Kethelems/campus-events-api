import { makeApp } from './app';
import { getConfig } from './config';
import { applyMigrations } from './database/migrate';
import { makeQueries } from './database/queries';
import { makeMiddleware } from './middleware';

async function main() {
  const config = getConfig();

  await applyMigrations(config.databaseUrl, 'up');
  const queries = makeQueries(config.databaseUrl);
  const middleware = makeMiddleware();
  const app = makeApp({ queries, middleware });

  app.listen(config.port, () => {
    console.log(`Server is up on port ${config.port}`);
  });
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
