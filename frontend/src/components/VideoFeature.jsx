import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_building-tech-neu/artifacts/q1nbilbz_74089e90-a0ba-4dd9-816e-392ee56c9f9b-h264-hd.mp4";
const POSTER = "https://customer-assets.emergentagent.com/job_building-tech-neu/artifacts/7wlncn5g_Hbd595fc58d8f46c2a8b6062bdceb17bd8.jpg";
const MUSIC_SRC = "https://cdn.pixabay.com/audio/2022/08/02/audio_2dde668ca0.mp3"; // ambient corporate

/**
 * Featured video block — embedded silently by default (browser auto-play rule).
 * On play, a low-volume background music track plays alongside the video.
 * The user can mute / unmute and pause from the custom controls.
 */
export default function VideoFeature() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.18;
      audio.loop = true;
    }
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      if (a && !muted) a.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      if (a) a.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    const a = audioRef.current;
    const next = !muted;
    setMuted(next);
    if (v) v.muted = next;
    if (a) {
      if (next) a.pause();
      else if (playing) a.play().catch(() => {});
    }
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-28" data-testid="video-feature">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <div className="eyebrow mb-5">Film · Im Einsatz</div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            Technik <span className="italic-accent">in Bewegung.</span>
          </h2>
        </div>
        <div className="text-sm text-white/55 max-w-md">
          Sehen Sie, wie nachhaltige Gebäudetechnik in modernen Häusern installiert
          und live betrieben wird. Sound für ein immersives Erlebnis aktivieren.
        </div>
      </div>

      <div className="relative aspect-video border border-white/10 bg-[#0E1A3E] overflow-hidden group">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER}
          muted={muted}
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="video-el"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <audio ref={audioRef} src={MUSIC_SRC} preload="auto" data-testid="bg-music"/>

        {/* Center play button when not playing */}
        {!playing && (
          <button
            onClick={togglePlay}
            data-testid="video-play-center"
            className="absolute inset-0 flex items-center justify-center bg-[#0B1736]/40 hover:bg-[#0B1736]/30 transition-colors"
            aria-label="Video abspielen"
          >
            <span className="w-20 h-20 md:w-24 md:h-24 border-2 border-white bg-[#0B1736]/40 backdrop-blur-sm flex items-center justify-center">
              <Play size={32} fill="#fff" strokeWidth={1}/>
            </span>
          </button>
        )}

        {/* Bottom controls bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-3 bg-gradient-to-t from-[#0B1736] via-[#0B1736]/60 to-transparent">
          <button
            onClick={togglePlay}
            data-testid="video-toggle-play"
            className="w-11 h-11 border border-white/30 hover:border-white flex items-center justify-center transition-colors"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={14}/> : <Play size={14} fill="#fff"/>}
          </button>
          <button
            onClick={toggleMute}
            data-testid="video-toggle-mute"
            className="w-11 h-11 border border-white/30 hover:border-white flex items-center justify-center transition-colors"
            aria-label={muted ? "Ton aktivieren" : "Ton aus"}
          >
            {muted ? <VolumeX size={14}/> : <Volume2 size={14}/>}
          </button>
          <div className="text-[11px] tracking-[0.15em] uppercase text-white/55 ml-2">
            {playing ? "Live · Hintergrundmusik leise" : "Klicken zum Abspielen"}
          </div>
        </div>
      </div>
    </section>
  );
}
