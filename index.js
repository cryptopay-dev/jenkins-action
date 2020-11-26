const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');

try {
  if (core.getInput('tag') != '')
    const tag = core.getInput('tag');
  else
    const tag = github.context.ref.replace('refs/tags/', '');
  const jenkinsUrl = core.getInput('jenkinsUrl');
  const env = core.getInput('env');
  const token = core.getInput('token');
  const jobName = core.getInput('job');
  
  request.get({baseUrl: jenkinsUrl, uri: 'job/' + env + '/' + jobName + '/buildWithParameters?token=' + token + '&DOCKER_IMAGE_TAG=' + tag})
    
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}
