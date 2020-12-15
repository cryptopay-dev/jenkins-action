const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');

try {
  if (core.getInput('tag') !== '')
    tag = core.getInput('tag');
  else
    tag = github.context.ref.replace('refs/tags/', '');
  const jenkinsUrl = core.getInput('jenkinsUrl');
  const token = core.getInput('token');
  
  request.post({baseUrl: jenkinsUrl, uri: '/generic-webhook-trigger/invoke', qs: '{"token": "' + token + '", "DOCKER_IMAGE_TAG": "' + tag + '"}' })
    
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}
