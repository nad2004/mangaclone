// src/components/Banner.tsx
import {  EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-lg shadow-lg m-8">
      <div className="flex items-center justify-between h-full flex-wrap lg:flex-nowrap">
        {/* Left Text Section */}
        <div className="w-full lg:w-1/2 mx-10 mb-8 lg:mb-0 py-20">
          <div className="flex space-x-10 my-4 gap-6 ">
            <span className="uppercase">Comics</span>
            <span className="uppercase">Novels</span>
            <span className="uppercase">Manga</span>
          </div>
          <h1 className="text-7xl font-bold mt-6">Welcome to VoyceMe, Home of Creativity!</h1>
          <p className="my-6">
            Voyce lets you connect with your favorite authors and interact with fellow fans. For authors,
            build universes from your original series, monetize your stories, engage your fan base, and share your Voyce.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700">
            Browse Stories
          </button>
        </div>

            {/* Right Swiper Section */}
        <div className="flex items-center justify-center w-full max-w-[400px] h-full">
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            slidesPerView={1}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            
            autoplay={{
                delay: 5000, // 3 giây chuyển slide
                disableOnInteraction: false, // không dừng autoplay khi user tương tác
              }}
              loop={true} // cần loop để autoplay liên tục
          >
            <SwiperSlide>
              <img
                src="https://res.cloudinary.com/dzvfzt31i/image/upload/v1747334099/thien-chau-bien-845_poxfih.webp"
                alt="thien-chau-bien"
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://res.cloudinary.com/dzvfzt31i/image/upload/v1747334153/wind-breaker-nii-satoru-_zvkuus.jpg"
                alt="Wind Breaker"
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banner;
