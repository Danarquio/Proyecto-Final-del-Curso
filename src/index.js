import 'dotenv/config'
import app from './app.js';

// Inicia la aplicación
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
