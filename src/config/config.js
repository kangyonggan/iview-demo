import Env from '@/config/env';

let config = {
    env: Env,
    baseUrl: Env === 'development' ? 'http://localhost:8080' : Env === 'mock' ? '' : 'https://kangyonggan.com'
};

export default config;
