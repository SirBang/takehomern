const config = {
  http: {
    host: process.env.EXPRESS_HOST || '127.0.0.1',
    port: parseInt(process.env.EXPRESS_PORT, 10) || 50000,
  }
}

export default config
