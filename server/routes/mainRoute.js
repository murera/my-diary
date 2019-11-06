import express from 'express';
import bodyParse from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import { NOT_FOUND } from '../helpers/statusCode';
import swaggerDoc from '../../swagger.json';
import userRoute from './userRoute';
import entryRoute from './entryRoute';
import properJson from '../middleware/properJson';

const router = express.Router();

router.use(bodyParse.json());
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
router.use('/api/v2', properJson, entryRoute);
router.use('/api/v2/auth', properJson, userRoute);

router.use('/', (req, res) => {
  res.status(NOT_FOUND).send({
    status: NOT_FOUND,
    error: 'Incorrect route!',
  });
});
export default router;
