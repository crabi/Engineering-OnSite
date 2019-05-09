module.exports = {
  api: {
    port: '8080',
  },
  services: {
    vehicle: {
      protocol: 'http',
      host: '0.0.0.0',
      port: '8085',
    },
    database: {
      host: 'postgres',
      port: 5432,
      user: 'postgres',
      database: 'onsite',
      password: 'postgres',
    },
  },
};
