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
  
  core.info(`Triggering the job`);
  request.post({baseUrl: jenkinsUrl, uri: '/generic-webhook-trigger/invoke?token=' + token, body: {DOCKER_IMAGE_TAG: tag}, json: true});
  core.info(`baseUrl: ${jenkinsUrl}`);
  core.info(`token: ${token}`);
  core.info(`Done!`);
  
} catch (error) {
  core.setFailed(error.message);
}
