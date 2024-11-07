import React from 'react';

const HeroSection = () => {
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium'>
          The No. 1 Job Hunting Site
        </span>
        <h2 className='text-5xl font-bold'>
          Search, Apply, & <br />
          Get your <span className='text-[#6A38C2]'>Dream Job</span>
        </h2>
      </div>
      <p className='mb-8'>Your ultimate destination for finding the perfect job! Explore opportunities tailored to your skills and aspirations.</p>
      <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 mx-auto'>
        <input 
          type="text" 
          placeholder='Find your dream job' 
          className='outline-none border-none w-full py-2' 
        />
        <button className='flex items-center justify-center'>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-600 -ml-10" // Adjusted margin here
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 21l-4.35-4.35m0 0A8.5 8.5 0 1010.5 3a8.5 8.5 0 006.15 14.85z" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
