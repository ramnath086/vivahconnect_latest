// frontend/next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/signup',
        permanent: true,
      },
    ];
  },
};
