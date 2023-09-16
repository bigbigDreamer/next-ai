/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'to-out-use.oss-cn-hangzhou.aliyuncs.com',
                port: '',
                pathname: '/common/**',
            },
        ],
    },
}

module.exports = nextConfig
