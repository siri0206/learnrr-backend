const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Central University', 'State University', 'Technical University', 'Deemed University', 'Institute of National Importance', 'Private University'], required: true },
  established: { type: Number },
  logo: { type: String, default: '' },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  ranking: { type: Number },
  description: { type: String },
  facilities: [{ type: String }],
  accreditation: { type: String },
  website: { type: String },
  phone: { type: String },
  email: { type: String },
  imageUrl: { type: String },
  totalStudents: { type: Number },
  placementRate: { type: Number },
  avgPackage: { type: Number },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
}, { timestamps: true });

module.exports = mongoose.model('University', universitySchema);
