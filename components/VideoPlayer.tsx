import React from 'react';
import { X } from './Icons';
import { Movie } from '../types';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose }) => {
  // Fallback to a generic nature video if no ID provided
  const videoId = movie.videoId || 'LXb3EKWsInQ'; 

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md border border-white/10 group"
      >
        <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
      </button>

      <div className="w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col">
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="mt-6 px-4">
            <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
            <p className="text-gray-400 text-sm">Reproduzindo agora • {movie.duration || 'Trailer'}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;