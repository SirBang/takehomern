const config = {
  http: {
    host: process.env.EXPRESS_HOST || 'localhost',
    port: parseInt(process.env.EXPRESS_PORT, 10) || 8000,
  }
}

export default config
