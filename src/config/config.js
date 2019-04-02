import Env from '@/config/env';

const baseUrl = Env === 'development' ? 'http://localhost:8080' : Env === 'mock' ? '' : 'https://kangyonggan.com';

let config = {
    env: Env,
    baseUrl: baseUrl,
    uploadUrl: '/file/upload'
};

export default config;
