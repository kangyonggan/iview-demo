import Env from './env';

let config = {
    env: Env,
    baseUrl: Env === 'development' ? 'http://localhost:8080' : 'https://kangyonggan.com'
};

export default config;
