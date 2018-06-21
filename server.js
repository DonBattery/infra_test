'use strict';

const app = require('./app').app;

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Infra server listening on PORT ${PORT}`);
});
