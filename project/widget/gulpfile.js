const gulp = require('gulp'),
  minimist = require('minimist'),
  gulpSSH = require('gulp-ssh'),
  shell = require('shelljs');

// SVN项目目录


const projectSVN = 'https://192.168.100.188/svn/jso/finchinaAPP/trunk/WebContent/hf/companyF9/financialData',
  bugFixSVN = 'https://192.168.100.188/svn/jso/finchinaAPP/tags/bugfix/WebContent/hf/companyF9/financialData',
  releaseSVN = 'https://192.168.100.188/svn/jso/finchinaAPP/release/WebContent/hf/companyF9/financialData',

  // 内网服务器目录
  serverPath = '/opt/tomcat-search/webapps/finchinaAPP/hf/companyF9/financialData',
  // 打包目录，请勿与SVN项目目录重名
  bundlePath = './dist',
  // 提交日志
  commitMsg = '预警通APP公用组件';

gulp.task('build', cb => {
  shell.exec('yarn build');
  cb();
});

gulp.task('checkout', cb => {
  shell.exec(`svn checkout ${projectSVN}`);
  cb();
});

gulp.task('checkoutReleaseSVN', cb => {
  shell.exec(`svn checkout ${releaseSVN}`);
  cb();
});

gulp.task('checkoutBugFixSVN', cb => {
  shell.exec(`svn checkout ${bugFixSVN}`);
  cb();
});


gulp.task('checkIn', cb => {
  const msgOptions = {
    string: 'm',
    default: {
      m: commitMsg
    },
  };
  const options = minimist(process.argv.slice(2), msgOptions);
  const svnProjectPath = projectSVN.split('/').pop();

  shell.cd(svnProjectPath);
  shell.rm('-r', '*');
  shell.cd('..');
  shell.cp('-R', bundlePath + '/*', svnProjectPath);
  shell.cp('-R', './*.png', svnProjectPath);
  shell.cp('-R', './*.png', bundlePath);
  shell.cp('-R', './*.svg', svnProjectPath);
  shell.cp('-R', './*.svg', bundlePath);
  shell.cd(svnProjectPath);
  shell.exec('svn add * --force');
  shell.exec(`svn commit -m "${options.m}"`);
  shell.cd('..');
  cb();
});

gulp.task('removeMap', cb => {
  shell.rm(`${bundlePath}/**/assets/**/*.map`);
  cb();
});

gulp.task('upload', cb => {
  const ssh = new gulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: '10.15.97.30',
      username: 'root',
      password: 'tcdept',
    },
  });
  setTimeout(() => {
    gulp.src(`${bundlePath}/**`).pipe(ssh.dest(serverPath));
    cb();
  }, 1000);
});

gulp.task('upload68', cb => {
  const ssh = new gulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: '10.15.97.68',
      username: 'root',
      password: 'tcdept',
    },
  });
  setTimeout(() => {
    gulp.src(`${bundlePath}/**`).pipe(ssh.dest(serverPath));
    cb();
  }, 1000);
});


gulp.task('upload42', cb => {
  const ssh = new gulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: '10.15.97.42',
      username: 'root',
      password: 'jsoproject',
    },
  });
  setTimeout(() => {
    gulp.src(`${bundlePath}/**`).pipe(ssh.dest(serverPath));
    cb();
  }, 1000);
});

// gulp.task('trunk', gulp.series('build', 'removeMap', 'checkout', 'checkIn', 'upload', 'upload68'));
gulp.task('trunk', gulp.series('build', 'removeMap'));
gulp.task('bugfix', gulp.series('build', 'removeMap', 'checkoutBugFixSVN', 'checkIn', 'upload42'));
gulp.task('release', gulp.series('build', 'removeMap', 'checkoutReleaseSVN', 'checkIn'));
gulp.task('default', gulp.series('trunk'));



gulp.task('checkInUpload', gulp.series('build', 'checkout', 'checkIn', 'upload'));
