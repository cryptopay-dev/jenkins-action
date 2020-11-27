const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');

try {
  if (core.getInput('tag') !== '')
    tag = core.getInput('tag');
  else
    tag = github.context.ref.replace('refs/tags/', '');
  const jenkinsUrl = core.getInput('jenkinsUrl');
  const env = core.getInput('env');
  const token = core.getInput('token');
  const username = core.getInput('username');
  const jobName = core.getInput('job');
  
  request.post({baseUrl: jenkinsUrl, uri: 'job/' + env + '/job/' + jobName + '/buildWithParameters?token=' + jobName + '&DOCKER_IMAGE_TAG=' + tag}).auth(username,token)
    
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}
