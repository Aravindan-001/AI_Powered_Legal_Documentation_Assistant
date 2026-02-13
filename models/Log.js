
import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'approve', 'reject', 'login']
  },
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  },
  timestamp: { type: Date, default: Date.now },
  details: { type: String }
});

const Log = mongoose.models.Log || mongoose.model('Log', LogSchema);
export default Log;
