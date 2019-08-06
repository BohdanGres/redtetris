import Base from  './../../Base'

export default class Delete extends Base {
  validateRules = [];

  async execute() {
      return { type: 'NO_USER' };
  }
}
