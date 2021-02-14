var
  cluster = require('cluster');
const lib = require('../lib');
const debug = require('debug')('job-processor:');
var numWorkers = 8;
var queue = lib.getJobsQueue();

if(cluster.isMaster){
  for (var i = 0; i < numWorkers; i++) {
    debug('fork #' + i);
    cluster.fork();
  }
  
  cluster.on('exit', function(worker, code, signal) {
    debug('worker ' + worker.process.pid + ' died');
  });
}else{
  queue.process(function(job, jobDone){

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

  });
}