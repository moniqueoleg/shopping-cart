import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from 'react-icons/io';

import Slide from './Slide';
import Card from 'components/Card';

const Slideshow = ({ slides, className }) => {
  return (
    <Card>
      <div
        id="carouselExampleControls"
        className="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner relative w-full overflow-hidden">
          {slides.map((slide) => (
            <Slide
              key={slide.id}
              image={slide.image}
              isActive={slide.is_active}
              url={slide.url}
              className={className}
            />
          ))}
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <IoIosArrowDropleftCircle size="4rem" color="black" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <IoIosArrowDroprightCircle size="4rem" color="black" />

          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Card>
  );
};

export default Slideshow;
