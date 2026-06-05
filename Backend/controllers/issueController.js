const Issue = require("../models/Issue");
const Project = require("../models/Project");

const createIssue = async (req, res) => {
  try {
    const { title, description, project, priority, assignedTo } = req.body;

    if (!title || !description || !project) {
      return res.status(400).json({
        message: "Please provide title, description and project"
      });
    }

    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const issue = await Issue.create({
      title,
      description,
      project,
      priority,
      assignedTo: assignedTo || null,
      createdBy: req.user._id
    });

    const populatedIssue = await Issue.findById(issue._id)
      .select("-__v")
      .populate("project", "name")
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role");

    res.status(201).json(populatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIssues = async (req, res) => {
  try {
    const { status, priority, project } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (project) {
      filter.project = project;
    }

    const issues = await Issue.find(filter)
      .select("-__v")
      .populate("project", "name")
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .select("-__v")
      .populate("project", "name description")
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["open", "in-progress", "resolved", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = status;

    const updatedIssue = await issue.save();

    const populatedIssue = await Issue.findById(updatedIssue._id)
      .select("-__v")
      .populate("project", "name")
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role");

    res.json(populatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    await issue.deleteOne();

    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIssueSummary = async (req, res) => {
  try {
    const totalIssues = await Issue.countDocuments();

    const openIssues = await Issue.countDocuments({ status: "open" });
    const inProgressIssues = await Issue.countDocuments({ status: "in-progress" });
    const resolvedIssues = await Issue.countDocuments({ status: "resolved" });
    const closedIssues = await Issue.countDocuments({ status: "closed" });

    const lowPriorityIssues = await Issue.countDocuments({ priority: "low" });
    const mediumPriorityIssues = await Issue.countDocuments({ priority: "medium" });
    const highPriorityIssues = await Issue.countDocuments({ priority: "high" });
    const criticalPriorityIssues = await Issue.countDocuments({ priority: "critical" });

    res.json({
      totalIssues,
      byStatus: {
        open: openIssues,
        inProgress: inProgressIssues,
        resolved: resolvedIssues,
        closed: closedIssues
      },
      byPriority: {
        low: lowPriorityIssues,
        medium: mediumPriorityIssues,
        high: highPriorityIssues,
        critical: criticalPriorityIssues
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssueStatus,
  deleteIssue,
  getIssueSummary
};