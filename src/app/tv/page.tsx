"use client";

import { useState, useRef, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import { 
  FaUserCircle, 
  FaPaperPlane, 
  FaPlay, 
  FaPause,
  FaVolumeMute, 
  FaVolumeUp,
  FaExpand,
  FaCompress,
  FaTimes,
  FaBullhorn,
  FaGlobe
} from "react-icons/fa";
import Hls from "hls.js";
import { motion } from "framer-motion";

export default function LiveStreamPage() {
  // Chat State
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  
  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("hotlines");
  const [showAlert, setShowAlert] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialLoadRef = useRef(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const [streamUrl, setStreamUrl] = useState("https://pvqybrzodz24-hls-live.5centscdn.com/HSOP/955ad3298db330b5ee880c2c9e6f23a0.sdp/playlist.m3u8");

  // Fetch Stream and Messages
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Live Event
      try {
        const eventRes = await fetch('/api/admin/event');
        const events = await eventRes.json();
        if (Array.isArray(events)) {
          const liveEvent = events.find((e: any) => e.isLive && e.isActive);
          if (liveEvent?.streamUrl) {
            setStreamUrl(liveEvent.streamUrl);
          }
        }
      } catch (e) {}

      // Fetch Chat
      try {
        const chatRes = await fetch('/api/chat');
        const chatData = await chatRes.json();
        if (Array.isArray(chatData)) {
          setMessages(chatData);
        }
      } catch (e) {}
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle HLS Playback
  useEffect(() => {
    let hls: Hls | null = null;
    const video = videoRef.current;
    if (!video) return;

    const initPlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 90 });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => setIsPlaying(false));
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR: hls?.startLoad(); break;
              case Hls.ErrorTypes.MEDIA_ERROR: hls?.recoverMediaError(); break;
              default:
                setStreamError("Unable to connect to the live stream.");
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = streamUrl;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(() => setIsPlaying(false));
        });
      }
    };

    initPlayer();
    return () => { if (hls) hls.destroy(); };
  }, [streamUrl]);

  // Video Event Listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted || video.volume === 0);
    };
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  // Fullscreen Listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Controls Visibility Logic
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const handleMouseLeave = () => { if (isPlaying) setShowControls(false); };

  const togglePlay = () => {
    if (videoRef.current) {
      // Don't toggle play/pause when in full screen to prevent accidental clicks
      if (isFullScreen) return;
      
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const toggleMute = () => { if (videoRef.current) videoRef.current.muted = !isMuted; };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleFullScreen = async () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      await playerContainerRef.current.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current?.parentElement) {
      messagesEndRef.current.parentElement.scrollTop = messagesEndRef.current.parentElement.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = { user: "User", text: newMessage, time: timeString };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      if (res.ok) {
        const savedMsg = await res.json();
        setMessages(prev => [...prev, savedMsg]);
        setNewMessage("");
      }
    } catch (e) {}
  };

  return (
    <div className="w-full bg-bg-base min-h-screen font-roboto transition-colors duration-300">
      <PageBanner title="VMC Live Stream" />

      <section className="py-8 md:py-16 bg-bg-base">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-10 md:gap-12">

            {/* Left Column: Video & Main Details */}
            <div className="lg:w-2/3 flex flex-col">
              
              {/* HLS Player Container */}
              <div 
                ref={playerContainerRef}
                className={`relative bg-black group overflow-hidden border border-border-main transition-all ${isFullScreen ? 'h-screen w-screen' : 'pt-[56.25%] shadow-2xl'}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {streamError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center bg-bg-surface/10 backdrop-blur-md">
                    <p className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Stream Error</p>
                    <p className="text-sm opacity-70 mb-8 max-w-xs">{streamError}</p>
                    <button onClick={() => window.location.reload()} className="px-8 py-3 bg-brand-secondary text-brand-primary font-bold uppercase tracking-widest text-xs shadow-xl transition-all hover:bg-white">Retry Connection</button>
                  </div>
                ) : (
                  <>
                    <video ref={videoRef} className="absolute inset-0 w-full h-full object-contain cursor-pointer" muted={true} playsInline={true} onClick={togglePlay} />
                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-6 py-8 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <div className="flex justify-between items-end mb-6">
                        <div className="bg-red-600 text-white text-[9px] font-bold px-3 py-1 uppercase flex items-center shadow-2xl tracking-widest"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></span> LIVE</div>
                        {isPlaying && isMuted && (
                          <button onClick={toggleMute} className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-2 text-[10px] font-bold flex items-center gap-3 hover:bg-white hover:text-brand-primary transition-all uppercase tracking-widest">
                            <FaVolumeMute /> UNMUTE STREAM
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-white">
                        <button onClick={togglePlay} className="hover:text-brand-secondary transition-all p-2 text-2xl drop-shadow-lg">{isPlaying ? <FaPause /> : <FaPlay />}</button>
                        <div className="flex items-center gap-3 group/vol relative">
                          <button onClick={toggleMute} className="hover:text-brand-secondary transition-all p-2 text-xl drop-shadow-lg">{isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}</button>
                          <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-0 opacity-0 group-hover/vol:w-24 group-hover/vol:opacity-100 transition-all duration-300 h-1 bg-white/20 appearance-none cursor-pointer accent-brand-secondary" />
                        </div>
                        <div className="flex-1"></div>
                        <button onClick={toggleFullScreen} className="hover:text-brand-secondary transition-all p-2 text-xl drop-shadow-lg">{isFullScreen ? <FaCompress /> : <FaExpand />}</button>
                      </div>
                    </div>
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-24 bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-4xl shadow-2xl border border-white/10 group-hover:scale-110 transition-transform"><FaPlay className="ml-1.5" /></div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* 3. Action Buttons Section */}
              <div className="flex flex-wrap gap-4 py-8 border-b border-border-main bg-bg-surface p-6 shadow-sm border-x">
                <a href="https://loveworldmedicalmissions.org/sponsor" target="_blank" className="group relative overflow-hidden bg-green-600 text-white px-6 py-3 font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-md transition-all flex-1 text-center min-w-[180px]">
                   <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-green-700 transition-colors">Loveworld Medicaid</span>
                </a>
                <a href="https://kingspayweb.com/quickpay/blvmc" target="_blank" className="group relative overflow-hidden bg-red-600 text-white px-6 py-3 font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-md transition-all flex-1 text-center min-w-[180px]">
                   <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-red-700 transition-colors">Healing Streams</span>
                </a>
                <Link href="/register" className="group relative overflow-hidden bg-cyan-600 text-white px-6 py-3 font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-md transition-all flex-1 text-center min-w-[180px]">
                   <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-cyan-700 transition-colors">Volunteer Network</span>
                </Link>
                <a href="https://volunteermedicalcorps.org/give/" target="_blank" className="group relative overflow-hidden bg-brand-secondary text-brand-primary px-6 py-3 font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-md transition-all flex-1 text-center min-w-[180px]">
                   <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-white transition-colors">Partner With VMC</span>
                </a>
              </div>

              {/* 4. Bottom Info Tabs */}
              <div className="mt-10 bg-bg-surface border border-border-main shadow-sm overflow-hidden">
                <div className="flex flex-wrap border-b border-border-main">
                  {[{ id: "hotlines", label: "HOT LINES" }, { id: "offerings", label: "GIVE OFFERINGS" }, { id: "join", label: "JOIN VMC" }].map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-8 py-5 font-bold text-[10px] md:text-xs tracking-[0.2em] flex items-center transition-all border-b-2 uppercase ${activeTab === tab.id ? "text-brand-primary dark:text-brand-secondary border-brand-secondary bg-bg-base" : "text-text-muted border-transparent hover:text-text-main hover:bg-bg-base/50"}`}>
                      <FaBullhorn className={`mr-3 ${activeTab === tab.id ? 'text-brand-secondary' : 'opacity-30'}`} /> {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-8 text-text-main min-h-[180px] transition-colors">
                  {activeTab === "hotlines" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Contact Hotlines</h3>
                      <p className="leading-relaxed font-medium">Phone lines: <strong className="text-brand-primary dark:text-white">+44 203 176 9724, +27 79 967 5852, +234 708 9267 186</strong></p>
                      <div className="pt-4 border-t border-border-main">
                        <p className="text-sm font-medium text-text-muted">Send prayer request: <a href="mailto:contact@volunteermedicalcorps.org" className="text-brand-secondary hover:underline font-bold transition-all ml-1">contact@volunteermedicalcorps.org</a></p>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "offerings" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-tight">KINGSPAY & ESPEES</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-bg-base border border-border-main">
                          <p className="text-[10px] font-bold text-text-muted uppercase mb-1 tracking-widest">ESPEES CODE</p>
                          <span className="text-xl font-bold text-brand-secondary tracking-tighter">VMC</span>
                        </div>
                        <div className="p-4 bg-bg-base border border-border-main">
                          <p className="text-[10px] font-bold text-text-muted uppercase mb-1 tracking-widest">KINGSPAY CODE</p>
                          <span className="text-xl font-bold text-brand-secondary tracking-tighter">BLVMC</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "join" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Join Our Network</h3>
                      <p className="text-text-muted font-medium leading-relaxed">Interested in joining our global network of Christian health care professionals and volunteers?</p>
                      <Link href="/register" className="group relative overflow-hidden inline-block bg-brand-secondary text-brand-primary px-8 py-3 font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg mt-4">
                         <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                         <span className="relative z-10 group-hover:text-white transition-colors">Click Here to Join</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Chat & Pledge Form */}
            <div className="lg:w-1/3 flex flex-col gap-10">
              
              {/* Live Chat */}
              <div className="flex flex-col h-[500px] bg-bg-surface border border-border-main shadow-xl overflow-hidden transition-colors">
                <div className="bg-bg-base p-5 border-b border-border-main text-brand-primary dark:text-brand-secondary font-bold flex justify-between items-center uppercase tracking-widest text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Chat
                  </div>
                  <span className="bg-brand-primary/5 dark:bg-white/5 border border-border-main px-3 py-1 font-bold text-[10px]">{messages.length} Active</span>
                </div>
                <div className="flex-grow overflow-y-auto p-6 space-y-5 custom-scrollbar relative bg-bg-surface/50">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-4 text-sm group">
                      <div className="flex-shrink-0">
                        <FaUserCircle className={`text-3xl mt-1 transition-colors ${msg.user === 'VMC Admin' ? 'text-brand-secondary' : 'text-text-muted opacity-40'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between mb-1">
                          <span className={`font-bold uppercase text-[10px] tracking-tight ${msg.user === 'VMC Admin' ? 'text-brand-primary dark:text-brand-secondary' : 'text-text-main'}`}>{msg.user}</span>
                          <span className="text-[9px] font-medium text-text-muted opacity-50 uppercase">{msg.time}</span>
                        </div>
                        <p className="text-text-muted font-medium text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-5 bg-bg-base border-t border-border-main transition-colors">
                  <form onSubmit={handleSendMessage} className="relative">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Say something..." className="w-full bg-bg-surface border border-border-main py-4 pl-5 pr-14 focus:outline-none focus:border-brand-secondary transition-all text-sm font-medium text-text-main" />
                    <button type="submit" disabled={!newMessage.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary dark:text-brand-secondary hover:scale-125 disabled:opacity-30 disabled:hover:scale-100 transition-all p-3"><FaPaperPlane /></button>
                  </form>
                </div>
              </div>

              {/* 5. Pledge Form */}
              <div className="bg-bg-surface border border-border-main shadow-xl overflow-hidden transition-colors">
                <div className="bg-brand-primary text-white p-5 border-b border-white/5">
                  <h4 className="font-bold uppercase tracking-[0.2em] text-[10px]">Partner with VMC</h4>
                </div>
                <div className="p-8">
                  <h5 className="font-bold text-text-main mb-8 text-[10px] uppercase tracking-[0.2em] border-b border-border-main pb-4 opacity-70">Fill the pledge form below</h5>
                  <form className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest ml-1">Full Name</label>
                       <input type="text" className="w-full bg-bg-base border border-border-main p-4 text-sm outline-none focus:border-brand-secondary text-text-main font-medium transition-all" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest ml-1">Email Address</label>
                       <input type="email" className="w-full bg-bg-base border border-border-main p-4 text-sm outline-none focus:border-brand-secondary text-text-main font-medium transition-all" placeholder="Enter email" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest ml-1">Pledge Amount</label>
                       <input type="text" className="w-full bg-bg-base border border-border-main p-4 text-sm outline-none focus:border-brand-secondary text-text-main font-medium transition-all" placeholder="e.g. 500 Espees" />
                    </div>
                    <div className="space-y-2 pb-4">
                       <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest ml-1">Country</label>
                       <select className="w-full bg-bg-base border border-border-main p-4 text-sm outline-none focus:border-brand-secondary text-text-muted font-medium cursor-pointer transition-all">
                        <option value="">Select country</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">USA</option>
                      </select>
                    </div>
                    <button type="button" className="group relative overflow-hidden w-full bg-brand-primary text-white py-5 font-bold uppercase tracking-[0.2em] text-[10px] transition-all shadow-2xl">
                       <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                       <span className="relative z-10 group-hover:text-brand-primary transition-colors">Submit My Pledge</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
