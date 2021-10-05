// refresh response type
export type OAuth2AccessTokenDto = {
  accessToken: string
  refreshToken: string
  scope: Array<string>
  resources: Array<string>
  authorities: Array<string>
  accessTokenValiditySeconds: number
  refreshTokenValiditySeconds: number
  [key: string]: number | string | Array<string>
}

export type Message = {
  [key: string]: string;
  404: string;
  FORBIDDEN: string;
  CODE_NULL: string;
  NOT_FOUND: string;
  ACCESS_DENIED: string;
  UNKNOWN_ERROR: string;
  NAME_NOT_UNIQUE: string;
  BAD_CREDENTIALS: string;
  NOT_IMPLEMENTED: string;
  EMAIL_NOT_UNIQUE: string;
  USER_IS_DISABLED: string;
  NESTED_EXCEPTION: string;
  UNMODIFIABLE_ROLE: string;
  CROSS_DOMAIN_REQUEST: string;
  CELL_PHONE_NOT_UNIQUE: string;
  HOME_PHONE_NOT_UNIQUE: string;
  WORK_PHONE_NOT_UNIQUE: string;
  CANT_DELETE_ENTITY_IS_USED: string;
}

export type ApiNames = {
  AUTH_STORE: string
  AUTH_BEARER: string
  AUTH_HEADER: string
  ACCESS_TOKEN: string
  REFRESH_TOKEN: string
  [key: string]: string
}
