interface ConfigType {
  tokenName: string
  tokenStorage: string
  baseURL: string
  requestTimeOut: number
}

const config: ConfigType = {
  // token名称
  tokenName: 'accessToken',
  // token存储位置localStorage sessionStorage cookie
  tokenStorage: 'localStorage',
  baseURL: import.meta.env.VITE_BASE_API as string,
  requestTimeOut: 1000 * 60 * 5
}

export default config
