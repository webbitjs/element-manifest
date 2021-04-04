import {
  object,
  string,
  array,
  boolean,
  number,
  alternatives,
  any,
} from 'joi';

export const typeSchema = any()
  .allow('String', 'Boolean', 'Number', 'Array', 'Object');

export const kebabCaseSchema = string()
  .pattern(new RegExp('^([a-z][a-z0-9]*)(-[a-z0-9]+)*$'));

export const camelCaseSchema = string()
  .pattern(new RegExp('^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$'));

export const cssPropertyNameSchema = string()
  .pattern(new RegExp('^\-\-[a-z]+(\-[a-z]+)*$'));

export const optionalStringSchema = string().empty('').default('');

export const defaultValueSchema = any()
  .when('type', { is: any().allow('String'), then: string.empty('').default('') })
  .when('type', { is: any().allow('Boolean'), then: boolean().default(false) })
  .when('type', { is: any().allow('Number'), then: number().default(0) })
  .when('type', { is: any().allow('Array'), then: array().default([]) })
  .when('type', { is: any().allow('Object'), then: object().default({}) });


  export const nameWithDescriptionSchema = array().items(
  object({
    name: string().required(),
    description: optionalStringSchema,
  })
);

export const attributesSchema = array().items(
  object({
    name: kebabCaseSchema.required(),
    type: typeSchema.required(),
    description: optionalStringSchema,
    defaultValue: defaultValueSchema
  })
);

export const propertiesSchema = array().items(
  object({
    name: camelCaseSchema.required(),
    description: optionalStringSchema,
    type: typeSchema.required(),
    defaultValue: defaultValueSchema,
    attribute: alternatives()
      .try(kebabCaseSchema, any().allow(false))
      .default(false),
    reflect: boolean().default(false),
    primary: boolean().default(false),
    changeEvent: alternatives()
      .try(string(), any().allow(false))
      .default(false)
  })
);

export const cssPropertiesSchema = array().items(
  object({
    name: cssPropertyNameSchema.required(),
    description: optionalStringSchema,
    defaultValue: optionalStringSchema
  })
);

export const elementSchema = object({
  name: kebabCaseSchema,
  description: optionalStringSchema,
  atttributes: attributesSchema,
  properties: propertiesSchema,
  events: nameWithDescriptionSchema,
  slots: nameWithDescriptionSchema,
  cssProperties: cssPropertiesSchema,
  cssParts: nameWithDescriptionSchema,
});