export default class RunError extends Error {
  constructor(args) {
    super(args.message);
    const { message, fild } = args;
    console.log('set??');
    this.fild = fild;
    this.name = 'runError';
    this.constructor.name = 'runError';
  }
}
