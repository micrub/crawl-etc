let range = n => Array.from(Array(n).keys());

const Queue = require('bull');
const jobsQueue = new Queue('jobs', 'redis://127.0.0.1:6379');

function getJobsQueue(){
  return jobsQueue
}

function addJob() {
  return jobsQueue.add({url});
}

function genUrls(){
  // generate ten "fake" urls
  return range(10).map(v => {
    return `/${process.hrtime()}/`;
  })
  
}
function parseUrl(url, callback){
}

function triggerJob(url, callback) {
  let jobid;
  callback(null, jobid);
}
module.exports = {
  triggerJob,
  genUrls,
  getJobsQueue,
  addJob,
};
