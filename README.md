play-audio-url
==================

Plays audio when it's possible to play it via an HTMLAudioElement (as of 3/1/2019, this will work in Firefox and Chrome) and falls back to downloading the audio file and playing via an AudioContext if it can't (as of 3/1/2019, Safari doesn't allow HTMLAudioElement to play programmatically, even if the user has already clicked on the web page).

Installation
------------

    npm install play-audio-url

Usage
-----

    var playAudioURL = require('play-audio-url');

    playAudioURL({ url: 'https://whatever.com/some-sound.ogg' }, onPlay);

    // playAudioURL passes back an htmlPlayer if it was able to play
    // via an HTMLAudioElement, otherwise passes an AudioContext.
    function onPlay(error, { htmlPlayer, audioContext }) {
      if (error) {
        console.log(error);
      } else if (htmlPlayer) {
        setTimeout(player.pause, 10000);
      } else if (audioContext) {
        setTimeout(audioContext.stop, 10000);
      }
    }

License
-------

The MIT License (MIT)

Copyright (c) 2019 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.