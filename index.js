var waterfall = require('async-waterfall');
var CollectCtor = require('collect-in-channel');
var request = require('basic-browser-request');
var bodyMover = require('request-body-mover');
var AudioBufferPlayer = require('./audio-buffer-player');
var curry = require('lodash.curry');

var acSingleton = require('audio-context-singleton')();
var bufferPlayer;

function playAudioURL({ url }, playCb) {
  var htmlPlayer = new Audio(url);
  htmlPlayer.play().then(passPlayer, playMediaFileWithBuffer);
  //playMediaFileWithBuffer();

  function passPlayer() {
    playCb(null, { htmlPlayer });
  }

  function playMediaFileWithBuffer() {
    var channel = { url, bufferPlayer };
    var Collect = CollectCtor({ channel });
    var tasks = [];
    if (!channel.bufferPlayer) {
      tasks = [
        acSingleton.getCurrentContext,
        Collect({ props: [[createBufferPlayer, 'bufferPlayer']] }),
        downloadFile,
      ];
    } else {
      tasks = [ curry(downloadFile)(channel) ];
    }
    tasks = tasks.concat([
        Collect({ props: [[x => x, 'buffer']] }),
        playBuffer,
        //Collect({ props: []}) // Pass the channel to the next callback, even if we're not adding to it.
      ]);

    waterfall(tasks, passBufferPlayer);
  }

  function downloadFile({ url }, done) {
    request({ method: 'GET', url, binary: true }, bodyMover(done));
  }

  function passBufferPlayer(error) {
    if (error) {
      playCb(error);
    } else {
      playCb(null, { bufferPlayer });
    }
  }

  function playBuffer({ bufferPlayer, buffer }, done) {
    bufferPlayer.play({ buffer }, done);
  }
}

function createBufferPlayer(audioCtx) {
  return bufferPlayer = AudioBufferPlayer({ audioCtx });
}

module.exports = playAudioURL;
