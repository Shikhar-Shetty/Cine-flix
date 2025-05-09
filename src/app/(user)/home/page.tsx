"use client";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Check, ChevronRight, Clock, Heart, Info, Play, Star } from "lucide-react";
import { addBooking } from "../../../../actions/bookings";

const sampleMovies = [
  {
    id: 1,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
    image: "/images/inception.jpg",
    rating: 8.8,
    duration: "2h 28m",
    genre: "Sci-Fi",
    releaseDate: "2010"
  },
  {
    id: 2,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: "/images/interstellar.jpg",
    rating: 8.7,
    duration: "2h 49m",
    genre: "Adventure",
    releaseDate: "2014"
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
    image: "/images/darkKNIGHT.jpg",
    rating: 9.0,
    duration: "2h 32m",
    genre: "Action",
    releaseDate: "2008"
  },
  {
    id: 4,
    title: "Dune",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.",
    image: "/images/DuneIm.jpg",
    rating: 8.5,
    duration: "2h 35m",
    genre: "Sci-Fi",
    releaseDate: "2021"
  },
  {
    id: 5,
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    image: "/images/parasite.jpg",
    rating: 8.6,
    duration: "2h 12m",
    genre: "Thriller",
    releaseDate: "2019"
  },
  {
    id: 6,
    title: "Everything Everywhere All at Once",
    description: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.",
    image: "/images/Everything_Everywhere_All_at_Once.jpg",
    rating: 8.7,
    duration: "2h 19m",
    genre: "Action",
    releaseDate: "2022"
  }
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const featuredMovie = sampleMovies[0]; 
  const [bookingStatus, setBookingStatus] = useState<{[key: number]: 'idle' | 'loading' | 'booked' | 'error'}>({});

  const handleBookNow = async (movieId: number) => {
    try {
      setBookingStatus(prev => ({ ...prev, [movieId]: 'loading' }));
      
      const userId = 1; 
      const bookingDate = new Date();
      
      await addBooking(userId, bookingDate);
      
      setBookingStatus(prev => ({ ...prev, [movieId]: 'booked' }));
      
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [movieId]: 'idle' }));
      }, 3000);
    } catch (error) {
      console.error("Error booking movie:", error);
      setBookingStatus(prev => ({ ...prev, [movieId]: 'error' }));
      
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [movieId]: 'idle' }));
      }, 3000);
    }
  };

  const getBookButtonText = (movieId: number) => {
    const status = bookingStatus[movieId];
    switch (status) {
      case 'loading':
        return 'Booking...';
      case 'booked':
        return 'Booked!';
      case 'error':
        return 'Try Again';
      default:
        return 'Watch Now';
    }
  };

  return (
    <div className="font-sans bg-black text-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-screen max-h-[800px]">
          {/* Hero Background */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={featuredMovie.image} 
              alt={featuredMovie.title} 
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>
          
          {/* Hero Content */}
          <div className="relative h-full max-w-screen-2xl mx-auto px-6 flex flex-col justify-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center bg-red-600 bg-opacity-80 rounded-full px-3 py-1 text-sm font-medium mb-6">
                <Star className="h-3 w-3 mr-1" /> Featured Film
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                {featuredMovie.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-red-500" /> {featuredMovie.rating}/10
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {featuredMovie.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {featuredMovie.releaseDate}
                </span>
                <span className="px-2 py-1 bg-gray-800 bg-opacity-70 rounded text-xs">
                  {featuredMovie.genre}
                </span>
              </div>
              <p className="text-gray-300 text-lg mb-8 line-clamp-3">
                {featuredMovie.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  className={`px-6 py-3 ${bookingStatus[featuredMovie.id] === 'booked' ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'} rounded flex items-center gap-2 font-medium transition-colors`}
                  onClick={() => handleBookNow(featuredMovie.id)}
                  disabled={bookingStatus[featuredMovie.id] === 'loading'}
                >
                  {bookingStatus[featuredMovie.id] !== 'booked' && <Play className="h-5 w-5" fill="currentColor" />} 
                  {getBookButtonText(featuredMovie.id)}
                </button>
                {bookingStatus[featuredMovie.id] === 'booked' && (
                  <Link href="/bookings" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded flex items-center gap-2 font-medium border border-gray-700 transition-colors">
                    View Bookings
                  </Link>
                )}
                {bookingStatus[featuredMovie.id] !== 'booked' && (
                  <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded flex items-center gap-2 font-medium border border-gray-700 transition-colors">
                    <Info className="h-5 w-5" /> More Info
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </section>

        {/* Categories Tabs */}
        <section className="max-w-screen-2xl mx-auto px-6 py-8">
          <div className="border-b border-gray-800">
            <nav className="flex space-x-8">
              <button 
                onClick={() => setActiveTab("trending")}
                className={`pb-4 px-1 font-medium text-lg ${activeTab === "trending" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}
              >
                Trending
              </button>
              <button
                onClick={() => setActiveTab("popular")}
                className={`pb-4 px-1 font-medium text-lg ${activeTab === "popular" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}
              >
                Popular
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`pb-4 px-1 font-medium text-lg ${activeTab === "new" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}
              >
                New Releases
              </button>
              <button
                onClick={() => setActiveTab("top")}
                className={`pb-4 px-1 font-medium text-lg ${activeTab === "top" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}
              >
                Top Rated
              </button>
            </nav>
          </div>
        </section>

        {/* Movies Showcase */}
        <section className="max-w-screen-2xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              {activeTab === "trending" && "Trending Now"}
              {activeTab === "popular" && "Popular Movies"}
              {activeTab === "new" && "New Releases"}
              {activeTab === "top" && "Top Rated Films"}
            </h2>
            <div className="flex items-center">
              <Link href="/bookings" className="text-red-500 hover:text-red-400 flex items-center gap-1 font-medium mr-4">
                My Bookings <ChevronRight className="h-4 w-4" />
              </Link>
              <a href="#" className="text-red-500 hover:text-red-400 flex items-center gap-1 font-medium">
                View All <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {sampleMovies.map((movie) => (
              <div 
                key={movie.id}
                className="group cursor-pointer"
              >
                <div className="aspect-[2/3] relative rounded-lg overflow-hidden mb-3">
                  <Image 
                    src={movie.image} 
                    alt={movie.title} 
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <button 
                        className={`w-10 h-10 ${bookingStatus[movie.id] === 'booked' ? 'bg-green-600' : 'bg-red-600'} rounded-full flex items-center justify-center`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(movie.id);
                        }}
                        disabled={bookingStatus[movie.id] === 'loading'}
                      >
                        {bookingStatus[movie.id] === 'loading' ? (
                          <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        ) : bookingStatus[movie.id] === 'booked' ? (
                          <Check className="h-5 w-5 text-white" />
                        ) : (
                          <Play className="h-5 w-5 text-white" fill="currentColor" />
                        )}
                      </button>
                      <button className="w-8 h-8 bg-gray-800 bg-opacity-70 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 py-0.5 px-2 rounded text-xs font-medium">
                    {movie.rating}
                  </div>
                </div>
                <h3 className="font-medium line-clamp-1">{movie.title}</h3>
                <div className="flex items-center text-xs text-gray-400">
                  <span>{movie.releaseDate}</span>
                  <span className="mx-1.5">•</span>
                  <span>{movie.genre}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Collections */}
        <section className="max-w-screen-2xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-8">Featured Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Collection 1 */}
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <Image
                src="/api/placeholder/800/500" 
                alt="Oscar Winners" 
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold mb-2">Oscar Winners</h3>
                <p className="text-gray-300 text-sm mb-4">Explore films that won the prestigious Academy Award</p>
                <div className="flex items-center gap-2 text-red-500 group-hover:gap-3 transition-all">
                  <span className="font-medium text-sm">Explore Collection</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            {/* Collection 2 */}
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <Image 
                src="/api/placeholder/800/500" 
                alt="Sci-Fi Adventures" 
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold mb-2">Sci-Fi Adventures</h3>
                <p className="text-gray-300 text-sm mb-4">Journey through space, time, and beyond</p>
                <div className="flex items-center gap-2 text-red-500 group-hover:gap-3 transition-all">
                  <span className="font-medium text-sm">Explore Collection</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            {/* Collection 3 */}
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <Image 
                src="/api/placeholder/800/500" 
                alt="Director Spotlight" 
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold mb-2">Director Spotlight</h3>
                <p className="text-gray-300 text-sm mb-4">Christopher Nolan&apos;s mind-bending filmography</p>
                <div className="flex items-center gap-2 text-red-500 group-hover:gap-3 transition-all">
                  <span className="font-medium text-sm">Explore Collection</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  ); 
}

export default HomePage;