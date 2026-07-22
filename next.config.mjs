const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@astryxdesign/core', '@astryxdesign/theme-neutral'],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
