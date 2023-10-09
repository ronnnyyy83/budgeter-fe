import App from './App';
import * as serviceWorker from './serviceWorker';

async function startApp() {
  App();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

startApp().then(() => {
  console.info(`LSU Env.: ${process.env.NODE_ENV}`);
});