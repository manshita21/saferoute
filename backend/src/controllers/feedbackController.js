const CommunityFeedback = require("../models/CommunityFeedback");

const addFeedback = async (req, res) => {
  try {
    const { source, destination, rating, comment, travelTime } = req.body;

    const feedback = await CommunityFeedback.create({
      source,
      destination,
      rating,
      comment,
      travelTime,
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error("ADD FEEDBACK ERROR:", error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

const getFeedbackForRoute = async (req, res) => {
  try {
    const { source, destination } = req.query;

    const feedbacks = await CommunityFeedback.find({
      source: new RegExp(`^${source}$`, "i"),
      destination: new RegExp(`^${destination}$`, "i"),
    });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
};

module.exports = {
  addFeedback,
  getFeedbackForRoute,
};
