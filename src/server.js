const app = require('./app');
require('./config/db');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});