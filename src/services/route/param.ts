// services
import _ from 'services/lodash.service';

export interface ParamOptions<Type, Default> {
  name: string
  short?: string
  defaults?: Type | Default | null
  isValid?: (value: Type | Default | string) => boolean
  archive?: (param: Type | Default) => string
  extract?: (param: string) => Type | string
}

export default class Param<T, D> {
  static create = <Type, Default>(options: ParamOptions<Type, Default>) => new Param(options);

  name = '';

  short = '';

  defaults: T | D | null = null;

  isValid: (value: T | D | string) => boolean = value => Boolean(value);

  archive: (value: T | D) => string = value => String(value);

  extract: (value: string) => T | string = value => value;

  constructor (options: ParamOptions<T, D>) {
    this.applyValidOptions(options);
  }

  applyValidOptions (options: ParamOptions<T, D>) {
    this.name = options.name;
    this.short = options.short ?? this.name;
    if (!_.isUndefined(options.defaults)) {
      this.defaults = options.defaults;
    }
    if (_.isFunction(options.isValid)) {
      this.isValid = options.isValid;
    }
    if (_.isFunction(options.archive)) {
      this.archive = options.archive;
    }
    if (_.isFunction(options.extract)) {
      this.extract = options.extract;
    }
  }

  to = (value: T) => {
    const def = this.defaults;
    const archived = this.archive(value);
    if (this.isValid(value) && !_.isEqual(archived, def)) {
      return archived;
    }
  };

  from = (value: string) : T | D | string | null => {
    const def = this.defaults;
    const extracted = this.extract(value);
    return this.isValid(extracted) ? extracted : def;
  };
}
