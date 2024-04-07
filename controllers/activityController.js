const Activity = require('../models/activityModel');

exports.createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).send('Activity not found');
    res.status(200).json(activity);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).send('Activity not found');
    res.status(200).json(activity);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).send('Activity not found');
    res.status(200).json(activity);
  } catch (err) {
    res.status(400).send(err);
  }
};
