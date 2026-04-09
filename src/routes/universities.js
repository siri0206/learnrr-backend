const express = require('express');
const router = express.Router();
const University = require('../models/University');

// GET /api/universities — list with filtering
router.get('/', async (req, res) => {
  try {
    const { type, search, sort = 'ranking', page = 1, limit = 12 } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { shortName: { $regex: search, $options: 'i' } },
    ];

    const sortMap = { ranking: 'ranking', rating: '-rating', established: 'established', name: 'name' };
    const sortField = sortMap[sort] || 'ranking';

    const total = await University.countDocuments(filter);
    const universities = await University.find(filter)
      .sort(sortField)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('courses', 'name category fees level');

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: universities
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/universities/:id
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id).populate('courses');
    if (!university) return res.status(404).json({ success: false, message: 'University not found' });
    res.json({ success: true, data: university });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
