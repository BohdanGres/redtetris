import mongoose from 'mongoose';
import Piece from './Piece';

const gameSchema = new mongoose.Schema({
  roomId: { type: String },
  roomName: { type: String, default: '' },
  createdBy: { type: String },
  playerIds: [{ type: String }],
  playerNames: [{ type: String }],
  status: { type: String, default: 'PENDING' },
  tables: { type: Object, default: {} },
  pieces: { type: Array, default: [] },
});

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

gameSchema.methods.getValue = function() {
  return {
    roomId: this.roomId,
    roomName: this.roomName,
    createdBy: this.createdBy,
    playerIds: this.playerIds,
    playerNames: this.playerNames,
    status: this.status,
    tables: this.tables,
    pieces: this.pieces,
  };
}

gameSchema.methods.InitGame = async function(playerIds) {
  function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const generateTable = () => {
    let b = Array.from(Array(20), () => []);
    b = b.map(e =>  Array.from(Array(10), (x, i) => 0));

    return b;
  };

  const getCurent = async (i) => {
    if (i >= this.pieces.length) {
      const j = getRandomInt(this.pieces.length - 1);
      this.pieces.push({...this.pieces[j]});
    }

    return this.pieces[i];
  };

  this.pieces = shuffleArray(await Piece.getAll());

  const current = await getCurent(0, getRandomInt(4) + 1);

  const newTable = {};
  const board = generateTable();
  for ( let id of playerIds) {
    console.log(id);
    console.log(this.tables);
    newTable[id] = {
      current: {
        figure: current.getPiece(),
        cord: {
          x: 0,
          y: 0,
        },
      },
      step: 0,
      table: board,
    };
  }

  this.tables = newTable;
  this.status = 'IN GAME';
  await this.save();

  return this;
};

gameSchema.methods.runGame = async function() {

};

gameSchema.methods.getCurent = function(i, color) {
  if (i >= this.pieces.length) {
    const j = getRandomInt(this.pieces.length - 1);
    this.pieces.push({...this.pieces[j]});
  }
  this.pieces[i].figure = this.pieces[i].figure.map(t => t.map(c => c ? this.pieces[i].color : c));
  return this.pieces[i];
};

const Game = mongoose.model('Game', gameSchema);

export default Game;
