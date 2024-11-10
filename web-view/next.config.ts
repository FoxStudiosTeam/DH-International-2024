import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/api/:path*',
            },
        ];
    },

};
module.exports = {
    typescript: {
        ignoreBuildErrors:true,
    },
    eslint: {
        ignoreDuringBuilds:true,
    },


}

export default nextConfig;
