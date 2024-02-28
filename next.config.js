/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    compiler: { styledComponents: true },
    reactStrictMode: true,
    experimental: {
      nextScriptWorkers: true,
    },
   
  };
  
module.exports=nextConfig;
  