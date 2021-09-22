/* eslint no-useless-escape: "off" */
import _ from 'lodash';

// polyfill from MDN https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage
const cookieStorage = {
  getItem: (sKey: string): void | string | undefined => (!cookieStorage.hasProperty(sKey) ? void(0)
    : unescape(document.cookie.replace(
      new RegExp(`(?:^|.*;\\s*)${ escape(sKey).replace(/[\-.+*]/g, '\\$&') }\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`),
      '$1'
    ))),

  setItem: (sKey: string, sValue: string): string | null | undefined => (!sKey ? null
    : (document.cookie = `${escape(sKey) }=${ escape(sValue) }; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`)) && void(0),

  removeItem: (sKey: string): void | string | undefined => (!cookieStorage.hasProperty(sKey) ? void(0)
    : (document.cookie = `${escape(sKey) }=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)) && void(0),

  hasProperty: (sKey: string): boolean => (!sKey ? false
    : (new RegExp(`(?:^|;\\s*)${ escape(sKey).replace(/[\-.+*]/g, '\\$&') }\\s*\\=`)).test(document.cookie)),
};

interface IStorage {
  getItem: (key: string) => string;
  removeItem: (key: string) => string;
  setItem: (key: string, value: string) => string;
}

// app integration
class Storage {
  static store = window.localStorage;

  static initialize = () => {
    Storage.store = window.localStorage;
    try { // NOTE check availability of localStorage
      Storage.store.setItem('test', 'test');
      Storage.store.removeItem('test');
    } catch (e) {
      // Storage.store = cookieStorage;
    }
    // TODO may be we should sync some data between "local" & "cookie"
    return Storage.store;
  };

  static remove = (name: string): void => Storage.store.removeItem(name);

  static set = (name: string, data: any): void => {
    Storage.remove(name);
    Storage.store.setItem(name, JSON.stringify(data));
  };

  static get = (name: string): string | null => {
    const data = Storage.store.getItem(name);
    if (_.isNull(data)) {
      return data;
    }
    return JSON.parse(data);
  };
}
// NOTE storage is Singleton
export default Storage.initialize();
