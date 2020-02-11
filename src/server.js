import app from './app';
import displayRoutes from 'express-routemap';

app.listen(app.get('port'), () => {
    console.log(
        `App is running at http://localhost:${app.get('port')} in ${app.get('env')}`
    );
    console.log('Press CTRL-C to stop ');
    displayRoutes(app);
});
