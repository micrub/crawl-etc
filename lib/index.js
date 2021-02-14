let range = n => Array.from(Array(n).keys());

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
};
