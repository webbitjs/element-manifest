import { 
  object,
  string,
  array,
  any,
  boolean,
  number,
} from 'joi';

const schema = object({
  name: string()
    .pattern(new RegExp('^([a-z][a-z0-9]*)(-[a-z0-9]+)*$'))
    .required(),
  description: string()
    .empty('')
    .default(''),
  atttributes: array().items(
    object({
      name: string()
        .pattern(new RegExp('^([a-z][a-z0-9]*)(-[a-z0-9]+)*$'))
        .required(),
      type: any()
        .allow('String', 'Boolean', 'Number', 'Array', 'Object')
        .required(),
      description: string()
        .empty('')
        .default(''),
      default: any()
        .when('type', {
          is: any().allow('String'), 
          then: string.empty('').default('')
        })
        .when('type', {
          is: any().allow('Boolean'), 
          then: boolean().default(false)
        })
        .when('type', {
          is: any().allow('Number'), 
          then: number().default(0),
        })
        .when('type', {
          is: any().allow('Array'), 
          then: array().default([]),
        })
        .when('type', {
          is: any().allow('Object'), 
          then: object().default({}),
        }),
    })
  )
});

class Manifest {
  constructor(config) {

    const {
      name,
      description,
      attributes,
      properties,
      events,
      slots,
      cssProperties,
      cssParts,
    } = config;
    
    this.name = name;
    this.description = description || '';
    this.attributes = (attributes || []).map(attribute => ({
      name: '',
      type: '',
      description: '',
      default: '',
      ...attribute,
    }));
    this.properties = (properties || []).map(property => ({
      name: '',
      description: '',
      type: '',
      attribute: false,

      ...property,
    }));
  }


}