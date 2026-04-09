const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/courses — list with advanced filtering
router.get('/', async (req, res) => {
  try {
    const { category, level, mode, search, minFees, maxFees, university, sort = 'rating', page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (mode) filter.mode = mode;
    if (university) filter.university = university;
    if (minFees || maxFees) {
      filter['fees.total'] = {};
      if (minFees) filter['fees.total'].$gte = Number(minFees);
      if (maxFees) filter['fees.total'].$lte = Number(maxFees);
    }
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { shortName: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { universityName: { $regex: search, $options: 'i' } },
    ];

    const sortMap = { rating: '-rating', fees_asc: 'fees.total', fees_desc: '-fees.total', name: 'name' };
    const sortField = sortMap[sort] || '-rating';

    const total = await Course.countDocuments(filter);
    const courses = await Course.find(filter)
      .sort(sortField)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('university', 'name shortName location accreditation imageUrl rating');

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: courses
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/courses/categories — distinct categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Course.distinct('category');
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/courses/:id
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('university');
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
