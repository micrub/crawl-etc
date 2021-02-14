const { doesNotMatch } = require('assert');
const urll = require('url');
var
  cluster = require('cluster');
const { storeUrlContent, storeUrlLinks, parseUrl, addJob } = require('../lib');
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
    
      lib.getUrlContent(job.data, (err, result) => {
        
        if(!result){
         
            let parsed = parseUrl(job.data.url);
            debug(job.data, parsed)
            storeUrlContent(parsed, function(err) {
               storeUrlLinks(parsed, (err2) => {
                  parsed.links.forEach(link => {
                    //  Dont add if path depth is larger than 5
                    // TODO Dont add if have sublink in sublinks set
                    let pathn = urll.parse(link).pathname;
                    
                    pathn = pathn.split('/')
                    
                    if(pathn.length < 5){
                      debug(pathn, 'adding link job for', link);
                      addJob({url: link});
                    }
                  });
               });
            });
            
            jobDone(null, 'Done storing and putting sub links to job queue');
        }else {
            jobDone(new Error('url is already stored'));
        }
      });
      
    
    
   
  });
}