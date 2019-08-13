export default class Base {
  constructor(context) {
    this.context = context ? context : {};
  }

  async run(params) {
      const clearParams =  this.validate(params);

      return  this.execute(clearParams);
  }

  validate(params) {
        for (let i = 0; i < this.validateRules.length; i++) {
          if (typeof params[this.validateRules[i]] === 'undefined' && !params[this.validateRules[i]]) {
            const error = new Error('REQUIRED');
            error.field = this.validateRules[i];
            throw error;
           }
         }

        return params;
  }

  throwError({ field, message }) {
    const error = new Error(message);
    error.field = field;
    throw error;
  }
}
