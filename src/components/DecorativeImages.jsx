import React, { useState } from 'react';

// Open source image URLs - can be replaced with any open source images
const IMAGE_SOURCES = {
  // Using Unsplash (free, open source images)
  student1: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
  student2: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=400&fit=crop',
  student3: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop',
  learning: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=300&fit=crop',
  // Pexels alternative URLs (also free)
  books: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  school: 'https://images.pexels.com/photos/207756/pexels-photo-207756.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
};

const FloatingImage = ({ src, alt, className, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`absolute ${className} transition-all duration-500 hover:scale-110 hover:z-10 cursor-pointer ${
        isHovered ? 'animate-bounce' : ''
      }`}
      style={{
        animation: `float ${3 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        className="rounded-full border-4 border-white shadow-lg w-20 h-20 object-cover hover:border-yellow-300 transition-all"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

const DecorativeImages = ({ type = 'header' }) => {
  if (type === 'header') {
    return (
      <div className="relative h-32 mb-6 overflow-hidden rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
        {/* Background decorative images */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={IMAGE_SOURCES.education}
            alt="Education"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Floating interactive images */}
        <FloatingImage
          src={IMAGE_SOURCES.student1}
          alt="Student"
          className="top-4 left-10"
          delay={0}
        />
        <FloatingImage
          src={IMAGE_SOURCES.student2}
          alt="Student"
          className="top-8 right-20"
          delay={0.5}
        />
        <FloatingImage
          src={IMAGE_SOURCES.student3}
          alt="Student"
          className="bottom-4 left-1/3"
          delay={1}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50"></div>
      </div>
    );
  }

  if (type === 'empty') {
    return (
      <div className="relative py-12">
        {/* Decorative background images */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img
            src={IMAGE_SOURCES.books}
            alt="Books"
            className="w-64 h-64 object-contain rounded-full"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Interactive floating elements */}
        <div className="relative z-10">
          <div className="flex justify-center gap-4 mb-6">
            <div className="group cursor-pointer transform hover:scale-125 transition-transform duration-300">
              <img
                src={IMAGE_SOURCES.student1}
                alt="Student"
                className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-lg object-cover group-hover:border-yellow-400 transition-all"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="group cursor-pointer transform hover:scale-125 transition-transform duration-300">
              <img
                src={IMAGE_SOURCES.student2}
                alt="Student"
                className="w-24 h-24 rounded-full border-4 border-purple-300 shadow-lg object-cover group-hover:border-pink-400 transition-all"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="group cursor-pointer transform hover:scale-125 transition-transform duration-300">
              <img
                src={IMAGE_SOURCES.student3}
                alt="Student"
                className="w-24 h-24 rounded-full border-4 border-pink-300 shadow-lg object-cover group-hover:border-blue-400 transition-all"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DecorativeImages;

