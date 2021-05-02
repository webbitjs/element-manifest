
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