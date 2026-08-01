

export const config = {
  port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,
  host: process.env.HOST || 'localhost',
  env: process.env.NODE_ENV || 'development',
  get url() {
    const protocol = this.env === 'production' ? 'https' : 'http';
    return `${protocol}://${this.host}:${this.port}`;
  }
} as const;