module.exports = {
  apps : [{
    name   : "imoveisbackend",
    script : "app/server.js",
    exec_mode: 'cluster',
    instances: 1
  }]
}
