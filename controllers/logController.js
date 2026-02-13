
import Log from '../models/Log.js';

export const getLogs = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user_id: req.user.id };
    const logs = await Log.find(query).sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
