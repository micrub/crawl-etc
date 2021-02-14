let range = n => Array.from(Array(n).keys());

const REDISURL = 'redis://127.0.0.1:6379';

const Queue = require('bull');
const jobsQueue = new Queue('jobs', REDISURL);

var crypto = require('crypto');

const redis = require("redis");
let client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

function getRedisClient() {
  return client;
}

function getUrlKey(ns, url) {
  return ns + '_' + md5(url);
}
function storeUrlContent(parsed, next) {
  getRedisClient().set(getUrlKey('content',parsed.url), parsed.content,next);
}
function getUrlContent(parsed, next) {
  getRedisClient().get(getUrlKey('content',parsed.url), next);
}
function storeUrlLinks(parsed, next) {
  let err = null;
  parsed.links.forEach(element => {
    getRedisClient().sadd(getUrlKey('links', parsed.url), element, (err, r) => {});  
  });
  next(err);
}
function md5(input) {
  return crypto.createHash('md5').update(input).digest("hex");  
}

function getJobsQueue(){
  return jobsQueue
}

function addJob(url) {
  return jobsQueue.add(url);
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

module.exports = {
  genUrls,
  getJobsQueue,
  addJob,
  parseUrl,
  storeUrlContent,
  getUrlContent,
  storeUrlLinks,
};
