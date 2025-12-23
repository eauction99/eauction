import express from 'express';
import Auction from '../models/Auction.js';
import Team from '../models/Team.js';
import Player from '../models/Player.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Utility to generate simple registration code
function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Public: list live / upcoming / previous
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) {
      filter.status = status;
    }
    const auctions = await Auction.find(filter).sort({ auctionDateTime: 1 });
    res.json(auctions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Authenticated: create auction
router.post('/', requireAuth, async (req, res) => {
  try {
    const data = req.body;
    const playerRegistrationCode = generateCode();
    const auction = await Auction.create({
      ...data,
      createdBy: req.user.userId,
      playerRegistrationCode,
    });
    res.status(201).json(auction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Authenticated: list auctions for current user
router.get('/mine', requireAuth, async (req, res) => {
  try {
    const auctions = await Auction.find({ createdBy: req.user.userId });
    res.json(auctions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get auction with teams and players
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: 'Not found' });

    const teams = await Team.find({ auction: auction._id }).populate('players');
    const players = await Player.find({ registeredByAuction: auction._id });

    res.json({ auction, teams, players });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add team to auction
router.post('/:id/teams', requireAuth, async (req, res) => {
  try {
    const { name, logoUrl } = req.body;
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    const team = await Team.create({
      name,
      logoUrl,
      auction: auction._id,
    });
    res.status(201).json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Public: register player for auction by registration code
router.post('/register-player/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const { name, age, role, subRole, imageUrl } = req.body;

    const auction = await Auction.findOne({ playerRegistrationCode: code });
    if (!auction) {
      return res.status(404).json({ message: 'Invalid registration link' });
    }

    const player = await Player.create({
      name,
      age,
      role,
      subRole,
      imageUrl,
      registeredByAuction: auction._id,
    });

    res.status(201).json(player);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add player to a team from registered players list
router.post('/teams/:teamId/add-player', requireAuth, async (req, res) => {
  try {
    const { playerId } = req.body;
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    if (!team.players.includes(player._id)) {
      team.players.push(player._id);
      await team.save();
    }

    res.json(await team.populate('players'));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get individual team with its players and available registered players for that auction
router.get('/teams/:teamId', requireAuth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId).populate('players');
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const auction = await Auction.findById(team.auction);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    // All players registered for this auction
    const allRegisteredPlayers = await Player.find({
      registeredByAuction: auction._id,
    });

    // Collect player IDs already assigned to any team in this auction
    const teamsInAuction = await Team.find({ auction: auction._id }).select(
      'players'
    );
    const assignedSet = new Set();
    teamsInAuction.forEach((t) => {
      (t.players || []).forEach((pId) => {
        assignedSet.add(String(pId));
      });
    });

    // Filter out players that are already assigned to any team
    const availablePlayers = allRegisteredPlayers.filter(
      (p) => !assignedSet.has(String(p._id))
    );

    res.json({ team, auction, availablePlayers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;


