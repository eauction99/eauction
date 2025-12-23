import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    role: {
      type: String,
      enum: ['batsman', 'bowler', 'wicket_keeper'],
      required: true,
    },
    subRole: { type: String }, // e.g. left-hand, right-hand, fast, spinner, etc.
    imageUrl: { type: String }, // optional player image/avatar
    registeredByAuction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
    },
  },
  { timestamps: true }
);

const Player = mongoose.model('Player', playerSchema);

export default Player;


