let range = n => Array.from(Array(n).keys());

const Queue = require('bull');
const jobsQueue = new Queue('jobs', 'redis://127.0.0.1:6379');

var crypto = require('crypto');

function md5(input) {
  return crypto.createHash('md5').update(input).digest("hex");  
}

function getJobsQueue(){
  return jobsQueue
}

function addJob(url) {
  return jobsQueue.add({url});
}
function jobProcessor(q) {
  getJobsQueue.process(function(job, done){

    // // job.data contains the custom data passed when the job was created
    // // job.id contains id of this job.
  
    // // transcode video asynchronously and report progress
    // job.progress(42);
  
    // // call done when finished
    // done();
  
    // // or give a error if error
    // done(new Error('error transcoding'));
  
    // // or pass it a result
    // done(null, { framerate: 29.5 /* etc... */ });
  
    // // If the job throws an unhandled exception it is also handled correctly
    // throw new Error('some unexpected error');
  })
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function genUrls(){
  // generate ten "fake" urls
  return range(10).map(v => {
    return `/${process.hrtime()}`;
  })
  
}
function parseUrl(url){
   let fakeDirs = genUrls();
   // take random elements
   let randomMaxDirs = getRandomInt(10);
   let links = fakeDirs.slice(0,randomMaxDirs);
   links = links.map((dir)=>{
     return url + dir;
   })
   return {
     url,
     content : md5(url),
     links
   }
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
  parseUrl,
};
