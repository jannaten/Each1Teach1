import { Container, Image } from "react-bootstrap";
import WokrPicture from "@/assets/images/3.jpg";
import WorkIcon from "@/assets/icons/huobitoken.svg";

const SectionProcess = () => {
  return (
    <div style={{ position: "relative", minHeight: "1850px" }}>
      <Image
        loading="lazy"
        src={WokrPicture.src}
        fluid
        alt="a description of the image"
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
      <div
        style={{
          position: "relative",
          backgroundColor: "#4E008ECC",
          minHeight: "1850px",
          width: "100%",
        }}
        className="pb-5"
      >
        <div
          style={{
            display: "flex",
            paddingTop: "4rem",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Image
            loading="lazy"
            className="mx-3"
            src={WorkIcon.src}
            alt="Arrow Right"
          />
          <h1
            style={{ color: "white", fontWeight: "700" }}
            className="text-center"
          >
            How does Each 1 <br />
            Teach 1 work?
          </h1>
        </div>
        <Container
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className="mt-5"
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <h1 style={{ fontWeight: "700", color: "#4E008E" }}>1.</h1>
            </div>
            <div
              style={{
                width: "80%",
                minHeight: "10rem",
                backgroundColor: "#A562E3",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem 2rem",
              }}
            >
              <p style={{ fontWeight: "500", color: "white" }}>
                Take a look at the UniTandem data sheet to see if there are
                people who could teach you the language you’re interested in
                learning. If there is not, sign up anyway - there might be
                suitable partners for you later on!
              </p>
            </div>
          </div>
          <div
            className="mt-5"
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "80%",
                minHeight: "10rem",
                backgroundColor: "#A562E3",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem 2rem",
              }}
            >
              <p style={{ fontWeight: "500", color: "white" }}>
                Sign up to UniTandem using your university or university of
                applied sciences email address
              </p>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <h1 style={{ fontWeight: "700", color: "#4E008E" }}>2.</h1>
            </div>
          </div>
          <div
            className="mt-5"
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <h1 style={{ fontWeight: "700", color: "#4E008E" }}>3.</h1>
            </div>
            <div
              style={{
                width: "80%",
                minHeight: "10rem",
                backgroundColor: "#A562E3",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem 2rem",
              }}
            >
              <p style={{ fontWeight: "500", color: "white" }}>
                Find a language partner. When somebody has accepted your partner
                request, fill in the registration form to get the password for
                DigiCampus, where the instructions and materials are available.
                Every student must fill in the registration form individually.
              </p>
            </div>
          </div>
          <div
            className="mt-5"
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "80%",
                minHeight: "10rem",
                backgroundColor: "#A562E3",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem 2rem",
              }}
            >
              <p style={{ fontWeight: "500", color: "white" }}>
                Sign up to DigiCampus using your university or university of
                applied sciences email address (HAKA), and when prompted, enter
                the enrolment key you have received after filling in the
                registration form.
              </p>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <h1 style={{ fontWeight: "700", color: "#4E008E" }}>4.</h1>
            </div>
          </div>
          <div
            className="mt-5"
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <h1 style={{ fontWeight: "700", color: "#4E008E" }}>5.</h1>
            </div>
            <div
              style={{
                width: "80%",
                minHeight: "10rem",
                backgroundColor: "#A562E3",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem 2rem",
              }}
            >
              <p style={{ fontWeight: "500", color: "white" }}>
                Read the instructions and choose the topics or triggers that you
                find interesting (3 triggers as a learner = 1 credit).
              </p>
            </div>
          </div>
          <div
            className="mt-5"
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "80%",
                minHeight: "10rem",
                backgroundColor: "#A562E3",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem 2rem",
                flexWrap: "wrap",
              }}
            >
              <p style={{ fontWeight: "500", color: "white" }}>
                Give your partner and yourself feedback at the end.
              </p>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <h1 style={{ fontWeight: "700", color: "#4E008E" }}>6.</h1>
            </div>
          </div>
          <div
            className="mt-5"
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <h1 style={{ fontWeight: "700", color: "#4E008E" }}>7.</h1>
            </div>
            <div
              style={{
                width: "80%",
                minHeight: "10rem",
                backgroundColor: "#A562E3",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem 2rem",
                flexWrap: "wrap",
              }}
            >
              <p style={{ fontWeight: "500", color: "white" }}>
                Read the instructions and choose the topics or triggers that you
                find interesting (3 triggers as a learner = 1 credit).
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SectionProcess;
