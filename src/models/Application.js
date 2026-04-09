const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected', 'Waitlisted'],
    default: 'Draft'
  },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    category: { type: String, enum: ['General', 'OBC', 'SC', 'ST', 'EWS'] }
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  academics: [{
    level: String,
    institution: String,
    board: String,
    year: Number,
    percentage: Number,
    subjects: [String]
  }],
  entranceExam: {
    examName: String,
    rollNumber: String,
    score: Number,
    rank: Number,
    year: Number
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],
  statement: { type: String },
  submittedAt: { type: Date },
  applicationId: { type: String, unique: true },
}, { timestamps: true });

applicationSchema.pre('save', function (next) {
  if (!this.applicationId) {
    this.applicationId = 'LRNR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Application', applicationSchema);
