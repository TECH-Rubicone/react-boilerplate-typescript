// refresh response type
export type OAuth2AccessTokenDto = {
  accessToken: string
  scope: Array<string>
  refreshToken: string
  resources: Array<string>
  authorities: Array<string>
  accessTokenValiditySeconds: number
  refreshTokenValiditySeconds: number
}

export interface PageFullRoleDto <Dto> {
  size: number
  offset: number
  pageNumber: number
  totalPages: number
  totalElements: number
  content: Array<Dto>
}

export type FullRoleDto = EntityContentDto & {
  permissions: Array<EntityContentDto>
}

export type EntityContentDto = {
  id: number
  name: string
}
