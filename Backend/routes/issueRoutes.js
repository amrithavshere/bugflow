const express = require("express");
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssueStatus,
  deleteIssue,
  getIssueSummary
} = require("../controllers/issueController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createIssue);
router.get("/", protect, getIssues);
router.get("/summary", protect, getIssueSummary);
router.get("/:id", protect, getIssueById);
router.put("/:id/status", protect, updateIssueStatus);
router.delete("/:id", protect, deleteIssue);

module.exports = router;