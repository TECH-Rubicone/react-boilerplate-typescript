// local dependencies
import Param, { ParamOptions } from './param';
import Route, { RouteOptions } from './route';

// exports
export { history } from './history';
export { NEW_ID } from './constants';
export { ANNOTATION } from './annotations';

export const defineRoute = (url: string, options: RouteOptions) => Route.create(url, options);
export const defineParam = <T, D>(options: ParamOptions<T, D>) => Param.create<T, D>(options);
