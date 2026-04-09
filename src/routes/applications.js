const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect } = require('../middleware/auth');

// POST /api/applications — submit application
router.post('/', protect, async (req, res) => {
  try {
    const { course, university, personalInfo, address, academics, entranceExam, statement } = req.body;
    const existing = await Application.findOne({ student: req.user._id, course, status: { $ne: 'Rejected' } });
    if (existing) return res.status(400).json({ success: false, message: 'You have already applied for this course' });

    const application = await Application.create({
      student: req.user._id,
      course, university, personalInfo, address, academics,
      entranceExam, statement, status: 'Submitted', submittedAt: new Date()
    });

    const populated = await application.populate(['course', 'university']);
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/applications/my — student's own applications
router.get('/my', protect, async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate('course', 'name shortName category duration fees')
      .populate('university', 'name shortName location imageUrl')
      .sort('-createdAt');
    res.json({ success: true, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/applications/:id — single application
router.get('/:id', protect, async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, student: req.user._id })
      .populate('course')
      .populate('university');
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/applications/:id — update draft
router.put('/:id', protect, async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, student: req.user._id });
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    if (application.status !== 'Draft') return res.status(400).json({ success: false, message: 'Cannot edit a submitted application' });
    Object.assign(application, req.body);
    await application.save();
    res.json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
