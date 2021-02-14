const { doesNotMatch } = require('assert');
var
  cluster = require('cluster');
const { storeUrlContent, storeUrlLinks, parseUrl } = require('../lib');
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
    if(!lib.getUrlContent(job.data)){
        let {content, links} = parseUrl();
        storeUrlContent(content);
        storeUrlLinks(links);
        job.data.links.forEach(link => {
            // TODO Dont add if path depth is larger than five
            // TODO Dont add if have sublink in sublinks set
            queue.add({url: link});
        });
        debug(job);
        jobDone(null, 'Done storing and putting sub links to job queue');
    }else {
        jobDone(new Error('url is already stored'));
    }
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