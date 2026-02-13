
import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  document_type: { 
    type: String, 
    required: true,
    enum: ['Rental Agreement', 'NDA', 'Employment Contract', 'Affidavit', 'Legal Notice', 'OD Request', 'Report']
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft'
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
  relevantActs: [String],
  metadata: {
    fullName: String,
    address: String,
    cityState: String,
    duration: String,
    amount: String,
    additionalClauses: String,
  },
  date_created: { type: Date, default: Date.now },
  last_modified: { type: Date, default: Date.now }
});

DocumentSchema.pre('save', function(next) {
  this.last_modified = Date.now();
  next();
});

const Document = mongoose.models.Document || mongoose.model('Document', DocumentSchema);
export default Document;
