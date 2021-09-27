/* eslint no-useless-escape: "off" */
import _ from 'lodash';

interface Storage {
  get: (key: string) => string | null;
  remove: (key: string) => void;
  set: (key: string, data: string) => void;
}

class LocalStorage implements Storage {
  private store = window.localStorage;

  get = (key: string): string | null => {
    const data = this.store.getItem(key);
    if (_.isNull(data)) {
      return data;
    }
    return JSON.parse(data);
  }

  remove = (key: string): void => {
    this.store.removeItem(key);
  }

  set = (key: string, data: string): void => {
    this.remove(key);
    this.store.setItem(key, JSON.stringify(data));
  }
}

class CookieStorage implements Storage {
  private store = document.cookie;

  get = (key: string): string | null => (!this.hasProperty(key) ? null
    : unescape(this.store.replace(
      new RegExp(`(?:^|.*;\\s*)${ escape(key).replace(/[\-.+*]/g, '\\$&') }\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`),
      '$1'
    )));

  remove = (key: string): string | null => (!this.hasProperty(key) ? null
    : (this.store = `${escape(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)) && null;

  set = (key: string, sValue: string): string | null => (!key ? null
    : (this.store = `${escape(key) }=${ escape(sValue) }; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`)) && null;

  hasProperty = (key: string): boolean => (!key ? false
    : (new RegExp(`(?:^|;\\s*)${ escape(key).replace(/[\-.+*]/g, '\\$&') }\\s*\\=`)).test(this.store));
}

class StorageClient {
  private store: Storage;

  constructor () {
    this.store = new LocalStorage();
    try {
      // NOTE check availability of localStorage
      this.store.set('test', 'test');
      this.store.remove('test');
    } catch (e) {
      this.store = new CookieStorage();
    }
  }

  remove = (name: string): void => this.store.remove(name);

  set = (name: string, data: any): void => {
    this.store.remove(name);
    this.store.set(name, JSON.stringify(data));
  };

  get = (name: string): string | null => {
    const data = this.store.get(name);
    if (_.isNull(data)) {
      return data;
    }
    return JSON.parse(data);
  };
}

export default new StorageClient();
