module.exports = {
  apps : [{
    name   : "chatweb",
    script : "dist/main.js",
    exec_mode: 'cluster',
    instances: 2
  }]
}
