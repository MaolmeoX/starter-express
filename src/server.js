// eslint-disable-next-line import/no-extraneous-dependencies
import displayRoutes from 'express-routemap';
import app from './app';

app.listen(app.get('port'), () => {
  console.log(
    `App is running at http://localhost:${app.get('port')} in ${app.get('env')}`
  );
  console.log('Press CTRL-C to stop');
  displayRoutes(app);
});
