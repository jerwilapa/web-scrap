const Job = require("../models/job.model");
const { fetchWebContent, summarizeText } = require("./summarizer.service");

exports.submitJob = async (req, res) => {
  try {
    const { url } = req.body;
    const newJob = await Job.create({ url });

    // Asynchronous processing
    processJob(newJob.id);

    res.status(201).json({ jobId: newJob.id, status: newJob.status });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit job" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve job" });
  }
};

async function processJob(jobId) {
  try {
    const job = await Job.findByPk(jobId);
    const content = await fetchWebContent(job.url);
    const summary = await summarizeText(content);

    job.status = "completed";
    job.summary = summary;
    await job.save();
  } catch (error) {
    const job = await Job.findByPk(jobId);
    job.status = "failed";
    job.error = error.message;
    await job.save();
  }
}
