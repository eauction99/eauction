import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    auctionDateTime: { type: Date, required: true },
    numberOfTeams: { type: Number, required: true },
    tournamentDate: { type: Date, required: true },
    sportType: { type: String, required: true },
    venue: { type: String, required: true },
    tournamentType: { type: String, required: true },
    logoUrl: { type: String },
    status: {
      type: String,
      enum: ['upcoming', 'live', 'completed'],
      default: 'upcoming',
    },
    playerRegistrationCode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;


