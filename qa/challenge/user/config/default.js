module.exports = {
  api: {
    port: '8080',
  },
  services: {
    vehicle: {
      protocol: 'http',
      host: 'vehicle',
      port: '8085',
    },
    database: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      database: 'onsite',
      password: 'postgres',
    },
  },
};
