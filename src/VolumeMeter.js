class VolumeMeter {
  constructor(stream) {
    this.createAnalyzer(stream);
  }

  createAudioContext() {
    let AudioContext = window.AudioContext;
    if (typeof AudioContext === 'undefined') {
      if (typeof webkitAudioContext !== 'undefined') {
        /* global AudioContext:true */
        // eslint-disable-next-line no-undef
        AudioContext = webkitAudioContext;
      }
      if (typeof mozAudioContext !== 'undefined') {
        /* global AudioContext:true */
        // eslint-disable-next-line no-undef
        AudioContext = mozAudioContext;
      }
    }
    return AudioContext ? new AudioContext() : false;
  }

  createAnalyzer(stream) {
    let audioContext = this.createAudioContext();
    this.analyser = audioContext.createAnalyser();
    let audioSorceNode = audioContext.createMediaStreamSource(stream);
    audioSorceNode.connect(this.analyser);
    this.array = new Uint8Array(this.analyser.frequencyBinCount);
  }

  getVolume() {
    this.analyser.getByteFrequencyData(this.array);
    const length = this.array.length;
    let total = 0;
    for (let i = 0; i < length; i++) {
      total += this.array[i];
    }
    return total / length;
  }
}

module.exports = VolumeMeter;
