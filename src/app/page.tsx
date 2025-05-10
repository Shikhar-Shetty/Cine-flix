"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Film, Star, Ticket, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const featuredMovies = [
    {
      title: "The Dark Knight",
      tagline: "Why So Serious?",
      description: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
      image: "/images/darkKnight.webp",
      rating: 9.0
    },
    {
      title: "Inception",
      tagline: "Your mind is the scene of the crime",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
      image: "/images/inception.jpg",
      rating: 8.8
    },
    {
      title: "Dune",
      tagline: "Beyond fear, destiny awaits",
      description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.",
      image: "/images/dune.jpeg",
      rating: 8.5
    }
  ];

  // Automatic slide transition
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const features = [
    {
      icon: <Ticket className="h-10 w-10 text-red-500" />,
      title: "Easy Booking",
      description: "Book movie tickets in seconds with our quick, seamless process."
    },
    {
      icon: <Film className="h-10 w-10 text-red-500" />,
      title: "Huge Selection",
      description: "Access to thousands of movies across all genres and languages."
    },
    {
      icon: <Star className="h-10 w-10 text-red-500" />,
      title: "Premium Experience",
      description: "Choose from standard, IMAX, VIP and luxury theater options."
    }
  ];

  return (
    <div className="font-sans bg-black text-white min-h-screen">
      <section className="relative h-screen">
        {featuredMovies.map((movie, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>
            
            <div className="relative h-full flex flex-col justify-center max-w-screen-xl mx-auto px-6">
              <div className="max-w-lg opacity-0 transform translate-y-8 transition-all duration-1000 delay-300"
                style={{
                  opacity: currentSlide === index && isLoaded ? 1 : 0,
                  transform: currentSlide === index && isLoaded ? "translateY(0)" : "translateY(2rem)"
                }}
              >
                <h2 className="text-sm sm:text-base uppercase tracking-widest text-red-500 mb-2 font-medium">Now Showing</h2>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
                  {movie.title}
                </h1>
                <p className="text-xl italic text-gray-300 mb-6">{movie.tagline}</p>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 text-red-500 fill-current" />
                  <span className="text-lg font-medium">{movie.rating}/10</span>
                </div>
                <p className="text-gray-300 text-lg mb-8">
                  {movie.description}
                </p>
                <Link href="/home" className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded font-medium text-lg transition-colors">
                  <Play className="h-5 w-5" fill="currentColor" />
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-red-500 w-8" : "bg-gray-500 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Main Content */}
      <main>
        {/* Welcome Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Welcome to CineTix</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Your premier destination for booking movie tickets online. Experience the latest blockbusters, indie films, and classics on the big screen.
            </p>
            
            <Link href="/home" className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-lg transition-colors">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
            
            <div className="mt-12 text-sm text-gray-400">
              Join thousands of movie lovers who book with us every day
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose CineTix</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-colors">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/api/placeholder/1920/600"
              alt="Background"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black/80" />
          </div>
          
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold mb-6">Ready for the Ultimate Movie Experience?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mb-10">
              Create your account now and get access to exclusive deals, early bookings, and special discounts on your favorite movies.
            </p>
            
            <Link href="/home" className="inline-flex items-center gap-2 px-10 py-5 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-xl transition-colors">
              Get Started Now <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold flex items-center">
                <Film className="h-6 w-6 text-red-500 mr-2" /> CineTix
              </h2>
              <p className="text-gray-400 mt-2">Your premiere movie booking service</p>
            </div>
            
            <div className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Movies</a>
              <a href="#" className="hover:text-white transition-colors">Theaters</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} CineTix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;