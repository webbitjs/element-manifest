import {
  attributesSchema,
  camelCaseSchema,
  cssPropertiesSchema,
  cssPropertyNameSchema,
  defaultValueSchema,
  elementSchema,
  kebabCaseSchema,
  nameWithDescriptionSchema,
  optionalStringSchema,
  propertiesSchema,
  typeSchema
} from './schemas';


describe('schemas', () => {
  describe('typeSchema', () => {
    it('accepts valid types', async () => {
      for (let type of ['String', 'Boolean', 'Number', 'Array', 'Object']) {
        expect(await typeSchema.validateAsync(type)).toBe(type);
      }
    });

    it(`doesn't accept invalid types`, async () => {
      await expect(typeSchema.validateAsync('Hotdog')).rejects.toThrow();
    });
  });

  describe(`kebabCaseSchema`, () => {
    it(`accepts strings in the correct format`, async () => {
      expect(await kebabCaseSchema.validateAsync('kebab-case')).toBe('kebab-case');
      expect(await kebabCaseSchema.validateAsync('kebabcase')).toBe('kebabcase');
      expect(await kebabCaseSchema.validateAsync('ke-bab-case')).toBe('ke-bab-case');
    });

    it(`doesn't accept strings that aren't kebab case`, async () => {
      await expect(kebabCaseSchema.validateAsync('camelCase')).rejects.toThrow();
      await expect(kebabCaseSchema.validateAsync('Some-other-case')).rejects.toThrow();
      await expect(kebabCaseSchema.validateAsync('snake_case')).rejects.toThrow();
    });
  });

  describe(`camelCaseSchema`, () => {
    it(`accepts strings in the correct format`, async () => {
      expect(await camelCaseSchema.validateAsync('camelCase')).toBe('camelCase');
      expect(await camelCaseSchema.validateAsync('camelcase')).toBe('camelcase');
      expect(await camelCaseSchema.validateAsync('camElCase')).toBe('camElCase');
    });

    it(`doesn't accept strings that aren't camel case`, async () => {
      await expect(camelCaseSchema.validateAsync('kebab-case')).rejects.toThrow();
      await expect(camelCaseSchema.validateAsync('PascalCase')).rejects.toThrow();
      await expect(camelCaseSchema.validateAsync('snake_case')).rejects.toThrow();
    });
  });

  describe(`cssPropertyNameSchema`, () => {
    it(`accepts strings in the correct format`, async () => {
      expect(await cssPropertyNameSchema.validateAsync('--property')).toBe('--property');
      expect(await cssPropertyNameSchema.validateAsync('--another-property')).toBe('--another-property');
      expect(await cssPropertyNameSchema.validateAsync('--yet-another-property')).toBe('--yet-another-property');
    });

    it(`doesn't accept strings that aren't in the correct format`, async () => {
      await expect(cssPropertyNameSchema.validateAsync('--')).rejects.toThrow();
      await expect(cssPropertyNameSchema.validateAsync('---property')).rejects.toThrow();
      await expect(cssPropertyNameSchema.validateAsync('--Property')).rejects.toThrow();
      await expect(cssPropertyNameSchema.validateAsync('--another property')).rejects.toThrow();
      await expect(cssPropertyNameSchema.validateAsync('--another--property')).rejects.toThrow();
      await expect(cssPropertyNameSchema.validateAsync('--another-property3')).rejects.toThrow();
    });
  });

  describe('optionalStringSchema', () => {
    it(`accepts strings`, async () => {
      expect(await optionalStringSchema.validateAsync("")).toBe("");
      expect(await optionalStringSchema.validateAsync("some string")).toBe("some string");
    });

    it(`sets value to default if undefined`, async() => {
      expect(await optionalStringSchema.validateAsync()).toBe("");
    });

    it(`doesn't accept non-strings`, async () => {
      await expect(optionalStringSchema.validateAsync(0)).rejects.toThrow();
    });
  });
});