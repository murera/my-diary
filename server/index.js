import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import entryRoute from './routes/entryRoutes';
import userRoute from './routes/userRoutes';
import properJson from './middleware/properJson';

const swaggerDocument = require('../swagger.json');

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
// middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api/v1/entries', properJson, entryRoute);
app.use('/api/v1/auth', properJson, userRoute);
app.use('/', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Incorrect route',
	  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
export default app;
