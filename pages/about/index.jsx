import React from 'react'

const About = () => {
  return (
    <>
    <div className = 'h-[100vh] saturate-50  bg-left-top bg-cover px-1 md:px-6' style={{backgroundImage : "url('/assests/about.jpg')"}}>
      <div className='w-full h-full flex justify-center flex-col items-center md:items-end   '  >
            
          <h1 className='text-white text-start  text-4xl sm:text-5xl md:text-7xl lg:text-8xl w-full flex justify-center md:justify-left md:w-3/5 py-5   font-bold' >About Me</h1>
          <p className = 'w-full md:w-3/5  text-xs md:text-lg lg:text-xl text-white text-justify   md:pr-28  '  >
          I am an avid reader myself and have a vast knowledge of different genres and authors, from classic literature to contemporary fiction and non-fiction. I can recommend books based on your preferences and interests, and help you discover new titles that you may not have otherwise considered.

          My goal is to make your experience at this book store as enjoyable and fulfilling as possible. Whether you are looking for a thrilling mystery, a thought-provoking memoir, or a heart-warming romance, I am here to guide you in your search.

          So, take a look around the website, browse our collection of books, and let me know how I can be of assistance. I look forward to helping you find your next favorite read!
          </p>
      </div>
    </div>
    </>
  )
}

export default About