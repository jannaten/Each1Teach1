import { Image } from "react-bootstrap";
import HomePagePicture from "@/assets/images/1.jpg";

const HomeContainer = ({ children }) => {
  return (
    <div className="position-relative" style={{ height: "998px" }}>
      <Image
        fluid
        loading="lazy"
        src={HomePagePicture.src}
        alt="Description of image"
        className="top-0 left-0 w-100 h-100 object-fit-cover position-absolute"
      />
      {children}
    </div>
  );
};

export default HomeContainer;
