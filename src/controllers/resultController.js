const ResultService = require('../services/resultService');

class ResultController {
  static async createResult(req, res) {
    try {
      const result = await ResultService.createResult(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getResultById(req, res) {
    try {
      const result = await ResultService.getResultById(req.params.id);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Result not found' });
      }
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllResults(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
     
      const results = await ResultService.getAllResults({ page, limit });
      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateResult(req, res) {
    try {
      const result = await ResultService.updateResult(req.params.id, req.body);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Result not found' });
      }
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteResult(req, res) {
    try {
      const result = await ResultService.deleteResult(req.params.id);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Result not found' });
      }
      res.status(200).json({ success: true, message: 'Result deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = ResultController;
