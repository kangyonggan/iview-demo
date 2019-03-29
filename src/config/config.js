import Env from './env';

let config = {
    env: Env,
    baseUrl: Env === 'development' ? 'http://localhost:8888' : 'https://kangyonggan.com'
};

export default config;