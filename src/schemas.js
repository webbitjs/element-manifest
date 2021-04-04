import Joi from 'joi';

export const typeSchema = Joi.string()
  .valid('String', 'Boolean', 'Number', 'Array', 'Object');

export const kebabCaseSchema = Joi.string()
  .pattern(new RegExp('^([a-z][a-z0-9]*)(-[a-z0-9]+)*$'));

export const camelCaseSchema = Joi.string()
  .pattern(new RegExp('^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$'));

export const cssPropertyNameSchema = Joi.string()
  .pattern(new RegExp('^\-\-[a-z]+(\-[a-z]+)*$'));

export const optionalStringSchema = Joi.string().empty('').default('');

export const defaultValueSchema = Joi.any()
  .when('type', { is: Joi.any().allow('String'), then: Joi.string().empty('').default('') })
  .when('type', { is: Joi.any().allow('Boolean'), then: Joi.boolean().default(false) })
  .when('type', { is: Joi.any().allow('Number'), then: Joi.number().default(0) })
  .when('type', { is: Joi.any().allow('Array'), then: Joi.array().default([]) })
  .when('type', { is: Joi.any().allow('Object'), then: Joi.object().default({}) });


export const nameWithDescriptionSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    description: optionalStringSchema,
  })
);

export const attributesSchema = Joi.array().items(
  Joi.object({
    name: kebabCaseSchema.required(),
    type: typeSchema.required(),
    description: optionalStringSchema,
    defaultValue: defaultValueSchema
  })
);

export const propertiesSchema = Joi.array().items(
  Joi.object({
    name: camelCaseSchema.required(),
    description: optionalStringSchema,
    type: typeSchema.required(),
    defaultValue: defaultValueSchema,
    attribute: Joi.alternatives()
      .try(kebabCaseSchema, Joi.any().allow(false))
      .default(false),
    reflect: Joi.boolean().default(false),
    primary: Joi.boolean().default(false),
    changeEvent: Joi.alternatives()
      .try(Joi.string(), Joi.any().allow(false))
      .default(false)
  })
);

export const cssPropertiesSchema = Joi.array().items(
  Joi.object({
    name: cssPropertyNameSchema.required(),
    description: optionalStringSchema,
    defaultValue: optionalStringSchema
  })
);

export const elementSchema = Joi.object({
  name: kebabCaseSchema,
  description: optionalStringSchema,
  atttributes: attributesSchema,
  properties: propertiesSchema,
  events: nameWithDescriptionSchema,
  slots: nameWithDescriptionSchema,
  cssProperties: cssPropertiesSchema,
  cssParts: nameWithDescriptionSchema,
});