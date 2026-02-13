
import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  request_type: {
    type: String,
    required: true,
    enum: ['OD approval', 'document review', 'legal verification']
  },
  date_submitted: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  remarks: { type: String }
});

const Request = mongoose.models.Request || mongoose.model('Request', RequestSchema);
export default Request;
