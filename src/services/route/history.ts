import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const goBackWithDefaults = (path: string) => (history.length > 1 ? history.goBack : history.push)(path);
