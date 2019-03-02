var waterfall = require('async-waterfall');
var CollectCtor = require('collect-in-channel');
var curry = require('lodash.curry');
var request = require('basic-browser-request');

var playBuffer = require('./play-buffer')();
var acSingleton = require('audio-context-singleton')();

function playAudioURL({ url }, done) {
  var htmlPlayer = new Audio(url);
  htmlPlayer.play().then(passPlayer, playMediaFileWithBuffer);

  function passPlayer() {
    done(null, { htmlPlayer });
  }

  function playMediaFileWithBuffer(url) {
    var channel = {};
    var Collect = CollectCtor({ channel });
    waterfall(
      [
        acSingleton.getCurrentContext,
        Collect({ props: [[x => x, 'audioContext']] }),
        curry(request)({ method: 'GET', url, binary: true }),
        Collect({ props: [[(res, body) => body, 'buffer']] }),
        playBuffer
      ],
      passContext
    );
  }

  function passContext(error, { audioContext }) {
    if (error) {
      done(error);
    } else {
      done(null, { audioContext });
    }
  }
}

module.exports = playAudioURL;
