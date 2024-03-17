import { Image } from "react-bootstrap";
import HomePagePicture from "@/assets/images/1.jpg";

const HomeContainer = ({ children }) => {
  return (
    <div style={{ position: "relative", height: "998px" }}>
      <Image
        src={HomePagePicture.src}
        fluid
        alt="Description of image"
        loading="lazy"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          transition: "opacity 0.5s ease",
        }}
      />
      {children}
    </div>
  );
};

export default HomeContainer;
