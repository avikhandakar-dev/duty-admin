import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const IdentityFiles = ({ images }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-primary rounded">
      <div className="px-4 py-3 bg-primary text-primary-content card-title">
        Identity Files
      </div>
      <div className="card-body">
        <Carousel showThumbs={false}>
          {images.map((image, i) => (
            <img src={image} className="w-full h-auto" />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default IdentityFiles;
