const core = require("@actions/core");
const exec = require("@actions/exec");

function run() {
  // 1) Get input values
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const distFolder = core.getInput("dist-folder", { required: true });

  // 2) Upload files
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // 3) Output s3 url
  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput("website-url", websiteUrl);
}

run();
