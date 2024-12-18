const express = require("express");
const { submitJob, getJobById } = require("../services/job.service");
const router = express.Router();

router.post("/", submitJob);
router.get("/:jobId", getJobById);

module.exports = router;
