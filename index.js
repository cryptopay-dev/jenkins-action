const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');

try {
 // if (core.getInput('tag') == 'latest')
 //tag = core.getInput('tag');
  const tag = 'master';
 // else
  //tag = github.context.ref.replace('refs/tags/', '');
  const jenkinsUrl = core.getInput('jenkinsUrl');
  const token = core.getInput('token');
  core.debug(`tag: ${tag}`);
  request.post({baseUrl: jenkinsUrl, uri: '/generic-webhook-trigger/invoke?token=' + token, qs: JSON.parse('{"DOCKER_IMAGE_TAG": "master"}') });
    
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}
