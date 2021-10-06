// refresh response type
export type OAuth2AccessTokenDto = {
  [key: string]: number | string | Array<string>
  accessToken: string
  scope: Array<string>
  refreshToken: string
  resources: Array<string>
  authorities: Array<string>
  accessTokenValiditySeconds: number
  refreshTokenValiditySeconds: number
}

export type Message = {
  [key: string]: string;
}

export type ApiNames = {
  [key: string]: string
}
