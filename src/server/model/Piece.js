import mongoose from 'mongoose'
import config  from './../../../etc/config-be';
import uuid from 'uuid/v4'

const { figurs } = config;

const gameSchema = new mongoose.Schema({
  pieceId: { type: String, default: () => uuid() },
  figure: { type: Array, default: []/*figurs[getRandomInt(figurs.length)]*/ },
  color: { type: Number, default: 1}
});

// gameSchema.virtual('color').get(() => Math.floor(Math.random() * Math.floor(6)));

const all = [];

gameSchema.statics.getAll = async function () {
  if (!all.length) {
    const array = figurs.map(figure => ({figure,
      color: Math.floor(Math.random() * Math.floor(4)) + 1,
    }));
    const a = await this.insertMany(array);
    all.push(...a);
  }
console.log(all);
  return all;
};

gameSchema.methods.getPiece = function () {
  const tbl = [...this.figure];
  const fig = tbl.map(t => t.map( b => b ? this.color : b));
  return {
    figure : fig
  };
}

const Piece = mongoose.model('Piece', gameSchema);

export default Piece;
