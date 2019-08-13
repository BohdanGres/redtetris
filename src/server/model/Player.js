import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  playerId: { type: String, default: '' },
  socketId: { type: String },
  name: { type: String },
  status: { type: String },
  score: { type: Number, default: 0 },
  password: { type: String },
});



const Player = mongoose.model('Player', gameSchema);

export default Player;
