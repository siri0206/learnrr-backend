const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String },
  category: { type: String, enum: ['Engineering', 'Management', 'Medical', 'Science', 'Arts', 'Law', 'Commerce', 'Design'], required: true },
  duration: { type: String, required: true },
  mode: { type: String, enum: ['Full-time', 'Part-time', 'Online', 'Distance'], default: 'Full-time' },
  level: { type: String, enum: ['Undergraduate', 'Postgraduate', 'Diploma', 'PhD', 'Certificate'], required: true },
  eligibility: { type: String },
  fees: {
    total: { type: Number },
    perSemester: { type: Number },
    currency: { type: String, default: 'INR' }
  },
  seats: { type: Number },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  description: { type: String },
  highlights: [{ type: String }],
  careers: [{ type: String }],
  syllabus: [{
    semester: { type: Number },
    subjects: [{ type: String }]
  }],
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  universityName: { type: String },
  avgPlacementPackage: { type: Number },
  topRecruiters: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
