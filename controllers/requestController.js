
import Request from '../models/Request.js';
import Document from '../models/Document.js';
import Log from '../models/Log.js';

export const createRequest = async (req, res) => {
  try {
    const request = new Request({
      ...req.body,
      user_id: req.user.id
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user_id: req.user.id };
    const requests = await Request.find(query).populate('doc_id').sort({ date_submitted: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = req.body.status;
    request.remarks = req.body.remarks;
    await request.save();

    // Update document status if approved/rejected
    if (request.status === 'approved' || request.status === 'rejected') {
      await Document.findByIdAndUpdate(request.doc_id, { status: request.status });
      
      await new Log({
        user_id: req.user.id,
        action: request.status === 'approved' ? 'approve' : 'reject',
        doc_id: request.doc_id,
        details: `Request ${request._id} ${request.status}`
      }).save();
    }

    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
