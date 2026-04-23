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

export default function LiveStreamPage() {
  // Chat State
  const [messages, setMessages] = useState([
    { id: 1, user: "Dr. Adebayo", text: "Excited for the broadcast!", time: "10:00 AM" },
    { id: 2, user: "Sarah J.", text: "Watching live from London. Greetings everyone.", time: "10:02 AM" },
    { id: 3, user: "VMC Admin", text: "Welcome to the stream! We will begin shortly.", time: "10:05 AM" },
  ]);
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
  let controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const [streamUrl, setStreamUrl] = useState(
    process.env.NEXT_PUBLIC_LIVE_STREAM_URL || "https://pvqybrzodz24-hls-live.5centscdn.com/HSOP/955ad3298db330b5ee880c2c9e6f23a0.sdp/playlist.m3u8"
  );

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
    if (initialLoadRef.current) {
      scrollToBottom();
      initialLoadRef.current = false;
    } else {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { id: messages.length + 1, user: "You", text: newMessage, time: timeString }]);
    setNewMessage("");
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen font-roboto">
      <PageBanner title="VMC Live Stream" />

      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. Alert Banner */}
          {/* {showAlert && (
            <div className="bg-slate-800 text-white px-4 py-3 rounded-sm mb-6 flex justify-between items-center shadow-sm">
              <strong className="text-red-500 font-bold uppercase tracking-widest text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                LIVE BROADCAST
              </strong>
              <button onClick={() => setShowAlert(false)} className="text-slate-400 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </div>
          )} */}


          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Column: Video & Main Details */}
            <div className="lg:w-2/3 flex flex-col">
              
              {/* HLS Player Container */}
              <div 
                ref={playerContainerRef}
                className={`relative bg-black group overflow-hidden ${isFullScreen ? 'h-screen w-screen' : 'pt-[56.25%] rounded-sm shadow-2xl'}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {streamError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <p className="text-red-500 font-bold mb-2">Error</p>
                    <p className="text-sm opacity-70">{streamError}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-[#ff9f22] text-[#002866] font-bold rounded-sm text-sm">Retry Connection</button>
                  </div>
                ) : (
                  <>
                    <video ref={videoRef} className="absolute inset-0 w-full h-full object-contain cursor-pointer" muted={true} playsInline={true} onClick={togglePlay} />
                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-6 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <div className="flex justify-between items-end mb-4">
                        <div className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase flex items-center shadow-lg"><span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span> LIVE</div>
                        {isPlaying && isMuted && (
                          <button onClick={toggleMute} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                            <FaVolumeMute /> TAP TO UNMUTE
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-white">
                        <button onClick={togglePlay} className="hover:text-[#ff9f22] transition-colors p-2 text-xl">{isPlaying ? <FaPause /> : <FaPlay />}</button>
                        <div className="flex items-center gap-2 group/vol relative">
                          <button onClick={toggleMute} className="hover:text-[#ff9f22] transition-colors p-2 text-lg">{isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}</button>
                          <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-0 opacity-0 group-hover/vol:w-20 group-hover/vol:opacity-100 transition-all duration-300 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#ff9f22]" />
                        </div>
                        <div className="flex-1"></div>
                        <button onClick={toggleFullScreen} className="hover:text-[#ff9f22] transition-colors p-2 text-lg">{isFullScreen ? <FaCompress /> : <FaExpand />}</button>
                      </div>
                    </div>
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl shadow-2xl"><FaPlay className="ml-1" /></div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* 3. Action Buttons Section */}
              <div className="flex flex-wrap gap-3 py-6 border-b border-gray-200">
                <a href="https://loveworldmedicalmissions.org/sponsor" target="_blank" className="bg-green-600 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-md hover:scale-105 transition-transform">Loveworld Medicaid</a>
                <a href="https://kingspayweb.com/quickpay/blvmc" target="_blank" className="bg-red-600 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-md hover:scale-105 transition-transform">Give For Healing Streams</a>
                <Link href="/register" className="bg-cyan-600 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-md hover:scale-105 transition-transform">Join Our Volunteer Network</Link>
                <a href="https://volunteermedicalcorps.org/give/" target="_blank" className="bg-amber-500 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-md hover:scale-105 transition-transform">Partner With VMC</a>
                <a href="https://volunteermedicalcorps.org/tv/testimonies.php" target="_blank" className="bg-slate-600 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-md hover:scale-105 transition-transform">Share Your Testimonies</a>
              </div>

              {/* 4. Bottom Info Tabs */}
              <div className="mt-8 bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="flex flex-wrap border-b border-gray-100">
                  {[{ id: "hotlines", label: "HOT LINES" }, { id: "offerings", label: "GIVE OFFERINGS" }, { id: "join", label: "JOIN VMC" }].map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 font-bold text-xs tracking-widest flex items-center transition-colors border-b-2 ${activeTab === tab.id ? "text-[#002866] border-[#002866] bg-gray-50/50" : "text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50"}`}>
                      <FaBullhorn className={`mr-2 ${activeTab === tab.id ? 'text-[#ff9f22]' : 'text-gray-400'}`} /> {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-6 text-gray-700 min-h-[160px]">
                  {activeTab === "hotlines" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h3 className="text-lg font-bold text-[#002866] mb-3 uppercase">Contact Hotlines</h3>
                      <p className="leading-relaxed">Phone lines: <strong className="text-gray-900">+44 203 176 9724, +27 79 967 5852, +234 708 9267 186</strong></p>
                      <p className="mt-2 text-sm">Send prayer request: <a href="mailto:contact@volunteermedicalcorps.org" className="text-[#002866] hover:underline font-bold">contact@volunteermedicalcorps.org</a></p>
                    </div>
                  )}
                  {activeTab === "offerings" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h3 className="text-lg font-bold text-[#002866] mb-3 uppercase">KINGSPAY</h3>
                      <p className="font-medium">ESPEES CODE: <span className="bg-[#002866] text-white px-2 py-0.5 rounded ml-2">VMC</span></p>
                      <p className="font-medium mt-2">KINGSPAY CODE: <span className="bg-[#002866] text-white px-2 py-0.5 rounded ml-2">BLVMC</span></p>
                    </div>
                  )}
                  {activeTab === "join" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h3 className="text-lg font-bold text-[#002866] mb-3 uppercase">Join Our Network</h3>
                      <p>Interested in joining our global network of volunteers? <Link href="/register" className="text-[#ff9f22] font-black hover:underline ml-1">Click HERE</Link></p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Chat & Pledge Form */}
            <div className="lg:w-1/3 flex flex-col gap-8">
              
              {/* Live Chat */}
              <div className="flex flex-col h-[450px] bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
                <div className="bg-gray-100 p-4 border-b border-gray-200 text-[#002866] font-bold flex justify-between items-center">
                  <span>Live Chat</span>
                  <span className="text-xs bg-[#ff9f22] text-[#002866] px-2 py-1 rounded-full">{messages.length}</span>
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar relative bg-white">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3 text-sm">
                      <FaUserCircle className={`text-2xl mt-0.5 ${msg.user === 'VMC Admin' ? 'text-[#ff9f22]' : 'text-gray-400'}`} />
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className={`font-bold ${msg.user === 'VMC Admin' ? 'text-[#002866]' : 'text-gray-800'}`}>{msg.user}</span>
                          <span className="text-[10px] text-gray-400">{msg.time}</span>
                        </div>
                        <p className="text-gray-600 mt-0.5 leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="relative">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Say something..." className="w-full bg-white border border-gray-300 rounded-sm py-3 pl-4 pr-12 focus:outline-none focus:border-[#002866] transition-colors" />
                    <button type="submit" disabled={!newMessage.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#002866] hover:text-[#ff9f22] p-2"><FaPaperPlane /></button>
                  </form>
                </div>
              </div>

              {/* 5. Pledge Form */}
              <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="bg-[#002866] text-white p-4">
                  <h4 className="font-bold uppercase tracking-wider text-sm">Partner with us</h4>
                </div>
                <div className="p-6">
                  <h5 className="font-bold text-gray-800 mb-6 text-xs uppercase tracking-widest border-b border-gray-100 pb-2">Fill the pledge form below</h5>
                  <form className="space-y-4">
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm text-sm outline-none focus:border-[#ff9f22]" placeholder="Full name" />
                    <input type="email" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm text-sm outline-none focus:border-[#ff9f22]" placeholder="Email address" />
                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm text-sm outline-none focus:border-[#ff9f22]" placeholder="Phone number" />
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm text-sm outline-none focus:border-[#ff9f22]" placeholder="Pledge (eg. Espees 100)" />
                    <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm text-sm outline-none focus:border-[#ff9f22] text-gray-500">
                      <option value="">Select your country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">USA</option>
                    </select>
                    <button type="button" className="w-full bg-[#002866] text-white py-3.5 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#ff9f22] hover:text-[#002866] transition-all">Submit Pledge</button>
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
