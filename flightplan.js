var plan = require('flightplan')
// var appName = 'artstock'
// var username = 'root'
// var startFile = 'bin/www'

plan.target('prod', {
  host: '159.203.106.53',
  username: 'dylan',
  agent: process.env.SSH_AUTH_SOCK,
  webRoot: '/var/www/artistblock',
  ownerUser: 'dylan',
  repository: 'https://github.com/dylanlott/artistblock.git',
  branchName: 'master'
})

plan.local('deploy', function (local) {
  local.hostname()
  local.failsafe()
  local.exec('git add . && git commit -am "flightplan push"')
  local.unsafe()
  local.log('Committed to GitHub')
  local.exec('git push origin master')
  local.log('Pushed to GitHub')
})

plan.remote('deploy', function (remote) {
  remote.hostname()
  remote.with('cd ' + remote.runtime.webRoot, function () {
    remote.log('Pulling latest version of app')
    remote.sudo('git pull origin master')
    remote.log('Installing dependencies')
    remote.sudo('npm install')
    remote.log('Building new version of app')
    remote.sudo('npm run build')
    remote.log('Deploy successful')
  })
})

plan.local('rebuild', function (local) {
  local.exec('git add .')
  local.exec('git commit -am "Flightplan push"')
  local.log('Committed successfully.')
  local.exec('git push origin master')
  local.log('Pushed to GitHub.')
})

plan.remote('rebuild', function (remote) {
  remote.hostname()
  remote.with('cd ' + remote.runtime.webRoot, function () {
    remote.sudo('git pull origin master')
    remote.log('Removing node_modules')
    remote.sudo('rm -rf node_modules')
    remote.log('Installing package dependencies')
    remote.sudo('npm install')
    remote.sudo('npm run build')
    remote.log('Rebuild successful')
  })
})

plan.remote('check', function (remote) {
  remote.exec('pm2 list')
  remote.exec('pm2 show builtright')
  remote.exec('pm2 logs builtright')
})
