/**
 * Procedural Web Audio generator for Nepali festival flute, temple bell chimes, and Malshree Dhun.
 * Zero external audio file dependencies to prevent CORS or broken link issues.
 */

class FestiveAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private loopTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private currentVolume = 0.45;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft Indian/Nepali bamboo flute (Bansuri) tone synthesis
  private playFluteNote(freq: number, startTime: number, duration: number, velocity: number = 0.6) {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    // Harmonics for wooden flute timbre
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime); // 1st octave harmonic

    // Subtle breath vibrato
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5, startTime);
    vibratoGain.gain.setValueAtTime(freq * 0.015, startTime);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc1.frequency);
    vibrato.start(startTime);
    vibrato.stop(startTime + duration);

    // Warm lowpass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, startTime);
    filter.Q.setValueAtTime(2.0, startTime);

    // Gentle flute attack, sustain and release envelope
    const attack = 0.12;
    const release = 0.35;
    const peakGain = velocity * 0.3;

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(peakGain, startTime + attack);
    noteGain.gain.exponentialRampToValueAtTime(peakGain * 0.7, startTime + duration - release);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Traditional Tanpura drone backing
  private playDrone(startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    // Sa (C#3 / D3) and Pa drone
    const root = 138.59; // C#3
    const fifth = 207.65; // G#3

    [root, fifth, root * 2].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.04 / (idx + 1), startTime + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // Dashain Malshree inspired scale notes: Sa, Re, Ga, Ma, Pa, Dha, Ni (Bhairav / Bilawal mode)
  private playMalshreePhrase() {
    if (!this.ctx || !this.isPlaying) return;

    const baseTime = this.ctx.currentTime + 0.1;
    // C#4 based scale (approx 277.18 Hz)
    const Sa = 277.18;
    const Re = 311.13;
    const Ga = 349.23;
    const Ma = 369.99;
    const Pa = 415.30;
    const Dha = 466.16;
    const Ni = 523.25;
    const highSa = 554.37;

    // Melodic sequence evocative of Dashain Malshree Dhun
    const melody = [
      { f: Sa, d: 1.2, vel: 0.7 },
      { f: Ga, d: 0.8, vel: 0.6 },
      { f: Pa, d: 1.5, vel: 0.8 },
      { f: Dha, d: 0.6, vel: 0.6 },
      { f: Pa, d: 1.0, vel: 0.7 },
      { f: Ga, d: 0.9, vel: 0.6 },
      { f: Ma, d: 0.8, vel: 0.5 },
      { f: Ga, d: 1.4, vel: 0.7 },
      { f: Re, d: 0.9, vel: 0.5 },
      { f: Sa, d: 2.2, vel: 0.8 },
      // Second phrase
      { f: Pa, d: 1.2, vel: 0.7 },
      { f: Dha, d: 0.8, vel: 0.6 },
      { f: highSa, d: 1.6, vel: 0.85 },
      { f: Ni, d: 0.7, vel: 0.6 },
      { f: Dha, d: 0.9, vel: 0.7 },
      { f: Pa, d: 1.4, vel: 0.75 },
      { f: Ga, d: 1.0, vel: 0.6 },
      { f: Re, d: 1.0, vel: 0.55 },
      { f: Sa, d: 2.8, vel: 0.85 }
    ];

    let t = baseTime;
    this.playDrone(t, 22);

    for (const note of melody) {
      this.playFluteNote(note.f, t, note.d, note.vel);
      t += note.d * 0.95; // graceful legato overlap
    }

    const phraseDuration = (t - baseTime) * 1000;
    this.loopTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playMalshreePhrase();
      }
    }, phraseDuration);
  }

  // Authentic temple brass bell (Ghanti) chime for Tika blessings
  public playTempleBell() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const baseFreq = 987.77; // B5 bell tone
    const partials = [
      { f: baseFreq, g: 0.45, decay: 2.8 },
      { f: baseFreq * 1.52, g: 0.25, decay: 2.2 },
      { f: baseFreq * 2.05, g: 0.15, decay: 1.6 },
      { f: baseFreq * 2.76, g: 0.08, decay: 1.1 },
      { f: baseFreq * 3.45, g: 0.04, decay: 0.8 }
    ];

    partials.forEach(({ f, g, decay }) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(g, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  // Soft sparkle chime when blessing falls
  public playSparkleChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98]; // D major pentatonic

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const startTime = now + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });
  }

  public toggle(): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playMalshreePhrase();
  }

  public stop() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  public setVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const festiveAudio = new FestiveAudioEngine();
