import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

const ImageGallery = ({ images, alt }) => {
  if (images.length === 1) {
    return <Image className="img-fluid" src={images[0]} alt={alt} />;
  } else {
    return (
      <Carousel variant="dark">
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <Image className="img-fluid" src={image} alt={alt} />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
};

export default ImageGallery;
