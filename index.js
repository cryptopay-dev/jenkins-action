const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');

try {
  const jenkinsUrl = core.getInput('jenkinsUrl');
  const env = core.getInput('env');
  const token = core.getInput('token');
  const jobName = core.getInput('job');
  const params = JSON.parse( core.getInput('params'));

  
  request.post({baseUrl: jenkinsUrl
    , uri: 'job/' + env + '/' + jobName + '/buildWithParameters' 
    , qs: params})
    
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}

