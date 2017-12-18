module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'A Thousand Words',
      script    : 'server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'ubuntu',
      host : 'ec2-34-251-83-119.eu-west-1.compute.amazonaws.com',
      key  : '~/.ssh/atw-ec2.pem',
      ref  : 'origin/master',
      repo : 'git@github.com:joshvince/atw_backend.git',
      path : '/home/ubuntu/atw_backend',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
