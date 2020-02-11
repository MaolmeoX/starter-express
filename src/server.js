// eslint-disable-next-line import/no-extraneous-dependencies
import displayRoutes from 'express-routemap';
import app from './app';

app.listen(process.env.PORT, () => {
  console.log(
    `App is running at http://localhost:${process.env.PORT} in ${app.get(
      'env'
    )}`
  );
  console.log('Press CTRL-C to stop');
  displayRoutes(app);
});
