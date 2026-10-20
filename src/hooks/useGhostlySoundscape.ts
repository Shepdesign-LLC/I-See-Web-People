import { useState, useEffect, useRef, useCallback } from 'react';

interface SoundscapeNodes {
  ctx: AudioContext;
  masterGain: GainNode;
  subOsc1: OscillatorNode;
  subOsc2: OscillatorNode;
  subGain: GainNode;
  harmonicOsc: OscillatorNode;
  harmonicGain: GainNode;
  noiseSource: AudioBufferSourceNode | null;
  noiseGain: GainNode;
  filter: BiquadFilterNode;
  lfoOsc: OscillatorNode;
  lfoGain: GainNode;
}

export function useGhostlySoundscape() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.45); // Delicate, subtle hum
  const [audioError, setAudioError] = useState<string | null>(null);
  const nodesRef = useRef<SoundscapeNodes | null>(null);

  // Generate pink/brown noise buffer for natural ambient air/cold room draft
  const createNoiseBuffer = (ctx: AudioContext): AudioBuffer => {
    const bufferSize = ctx.sampleRate * 4; // 4 seconds loopable buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filter approximation (Paul Kellet's method)
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }
    return buffer;
  };

  const startSoundscape = useCallback(async () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) {
        setAudioError('Web Audio API not supported in this environment');
        return;
      }

      let ctx = nodesRef.current?.ctx;
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioCtxClass();
      }

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const now = ctx.currentTime;

      // Master output gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(volume * 0.6, now + 1.8); // Gentle 1.8s fade in
      masterGain.connect(ctx.destination);

      // 1. Deep Submarine / Sixth Sense Sub Drone (55Hz Fundamental - A1)
      const subOsc1 = ctx.createOscillator();
      subOsc1.type = 'sine';
      subOsc1.frequency.setValueAtTime(55, now);

      const subOsc2 = ctx.createOscillator();
      subOsc2.type = 'sine';
      subOsc2.frequency.setValueAtTime(55.6, now); // 0.6Hz subtle binaural pulsing beat

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.35, now);

      subOsc1.connect(subGain);
      subOsc2.connect(subGain);
      subGain.connect(masterGain);

      // 2. Faint Ethereal Harmonic Overtones (110Hz & 165Hz fifth)
      const harmonicOsc = ctx.createOscillator();
      harmonicOsc.type = 'triangle';
      harmonicOsc.frequency.setValueAtTime(110.2, now);

      const harmonicGain = ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.08, now); // Very quiet overtone
      harmonicOsc.connect(harmonicGain);
      harmonicGain.connect(masterGain);

      // 3. Spectral Cold-Draft Atmospheric Wind (Filtered pink noise with slow breathing LFO)
      const noiseBuffer = createNoiseBuffer(ctx);
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Resonant Lowpass Filter simulating a hollow empty room/crypt resonance
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, now);
      filter.Q.setValueAtTime(4.0, now); // Gentle acoustic resonance

      // LFO for breathing filter cutoff sweep (~0.09 Hz, cycle ~11 seconds)
      const lfoOsc = ctx.createOscillator();
      lfoOsc.type = 'sine';
      lfoOsc.frequency.setValueAtTime(0.09, now);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(60, now); // Swings cutoff between 90Hz and 210Hz
      lfoOsc.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);

      noiseSource.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);

      // Start all sound sources
      subOsc1.start(now);
      subOsc2.start(now);
      harmonicOsc.start(now);
      noiseSource.start(now);
      lfoOsc.start(now);

      nodesRef.current = {
        ctx,
        masterGain,
        subOsc1,
        subOsc2,
        subGain,
        harmonicOsc,
        harmonicGain,
        noiseSource,
        noiseGain,
        filter,
        lfoOsc,
        lfoGain
      };

      setIsPlaying(true);
      setAudioError(null);
    } catch (err) {
      console.warn('Failed to start ambient soundscape:', err);
      setAudioError('Audio blocked or unavailable');
      setIsPlaying(false);
    }
  }, [volume]);

  const stopSoundscape = useCallback(() => {
    if (!nodesRef.current) {
      setIsPlaying(false);
      return;
    }

    try {
      const { ctx, masterGain, subOsc1, subOsc2, harmonicOsc, noiseSource, lfoOsc } = nodesRef.current;
      const now = ctx.currentTime;

      // Smooth fade-out over 1.2 seconds to prevent clicks or sudden silence
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        try {
          subOsc1.stop();
          subOsc2.stop();
          harmonicOsc.stop();
          noiseSource?.stop();
          lfoOsc.stop();
          subOsc1.disconnect();
          subOsc2.disconnect();
          harmonicOsc.disconnect();
          noiseSource?.disconnect();
          lfoOsc.disconnect();
          masterGain.disconnect();
        } catch {
          // Ignore if already stopped
        }
        nodesRef.current = null;
        setIsPlaying(false);
      }, 1250);
    } catch {
      nodesRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  const toggleSoundscape = useCallback(() => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  }, [isPlaying, startSoundscape, stopSoundscape]);

  // Adjust volume in real-time if active
  const handleVolumeChange = useCallback((newVol: number) => {
    setVolume(newVol);
    if (nodesRef.current?.ctx && nodesRef.current?.masterGain) {
      const now = nodesRef.current.ctx.currentTime;
      nodesRef.current.masterGain.gain.cancelScheduledValues(now);
      nodesRef.current.masterGain.gain.linearRampToValueAtTime(newVol * 0.6, now + 0.15);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (nodesRef.current) {
        try {
          nodesRef.current.ctx.close();
        } catch {
          // Ignore
        }
        nodesRef.current = null;
      }
    };
  }, []);

  return {
    isPlaying,
    volume,
    audioError,
    toggleSoundscape,
    setVolume: handleVolumeChange,
    startSoundscape,
    stopSoundscape
  };
}
