import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  roomId: { type: String },
  roomName: { type: String, default: '' },
  createdBy: { type: String },
  playerIds: [{ type: String }],
  playerNames: [{ type: String }],
  status: { type: String, default: 'PENDING' }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
