import concurrently from 'concurrently';

concurrently([
  {
    cwd: './packages/back-end',
    name: 'API',
    command: 'npm:start:dev',
    prefixColor: 'green',
  },
  {
    cwd: './packages/front-end',
    name: 'WEB',
    command: 'npm:start:dev',
    prefixColor: 'yellow',
  },
])
