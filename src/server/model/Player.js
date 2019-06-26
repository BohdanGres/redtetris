import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  playerId: { type: String, default: '' },
  socketId: { type: String },
  name: { type: String },
  status: { type: String },
  password: { type: String }
});



const Player = mongoose.model('Player', gameSchema);

export default Player;
