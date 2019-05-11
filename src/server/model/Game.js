import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  roomName: { type: String, default: '' },
  playerIds: [{ type: String }]
});



const Game = mongoose.model('Game', gameSchema);

export default Game;
