var callNextTick = require('call-next-tick');

function PlayBuffer() {
  var sourceNode;

  return playBuffer;

  function playBuffer({ audioContext, buffer }, done) {
    if (sourceNode) {
//      sourceNode.stop();
    }
    sourceNode = audioContext.createBufferSource();
    sourceNode.connect(audioContext.destination);

    sourceNode.buffer = buffer;
    sourceNode.loop = true;

    sourceNode.start();
    callNextTick(done);
  }
}

module.exports = PlayBuffer;
