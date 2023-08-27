import React from "react";
const bgimage = "/images/bg2.jpg";

function AboutUs() {
  const containerStyle = {
    width: "100%",
    height: "100vh",
    position: "relative",
    backgroundColor: "Green",
  };

  const backgroundStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${bgimage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    filter: "blur(10px)",
    zIndex: -1,
  };

  // const nutriTiffLogoStyle = {
  //   position: "relative",
  //   top: "10px",
  //   left: "20px",
  //   width: "50px",
  // };

  const picStyle = {
    position: "relative",
    width: "150px",
    height: "150px",
  };

  const textStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "whitesmoke",
    textAlign: "center",
  };

  return (
    <div style={containerStyle} className="background-div">
      {/* <img src="/nutriTiffLogo.png" alt="Logo" style={nutriTiffLogoStyle} /> */}
      <div style={backgroundStyle}></div>
      <div style={textStyle}>
        <br />
        <h1> About Us</h1>

        <p style={{ fontSize: "17px", fontFamily: "-moz-initial" }}>
          "Welcome to NutriTiff, Where Taste Meets Convenience!
          <br />
          Experience delicious and wholesome tiffin delivery, tailored to
          nourish your busy lifestyle."
        </p>
        <br />
        <h2>Who Are We?</h2>
        <p style={{ fontSize: "17px", fontFamily: "-moz-initial" }}>
          We are a team of foodie friends, who have built a platform where we
          coordinate with individual/restaurant vendors to prepare daily
          healthy, hygienic and homely tiffin meals, delivered at your doorstep.
        </p>
        <br />
        <h2>Why Choose Us?</h2>
        <ul>
          <li style={{ fontSize: "17px", fontFamily: "-moz-initial" }}>
            <strong>Quality Matters:</strong> We believe that quality is
            non-negotiable. Our vendors use fresh, locally sourced ingredients
            to prepare each meal, ensuring you get the best every time.
          </li>
          <br />
          <li style={{ fontSize: "17px", fontFamily: "-moz-initial" }}>
            <strong>Variety & Choice:</strong> Our menu offers an extensive
            range of dishes from different cuisines across India, ensuring your
            meals align perfectly with your preferences.
          </li>
          <br />
          <li style={{ fontSize: "17px", fontFamily: "-moz-initial" }}>
            <strong>Flexibility:</strong> Whether you're looking for the
            convenience of a personalized meal schedule or prefer to choose your
            dishes on the go, NutriTiff caters to your individual dining
            preferences.
          </li>
          <br />
          <li style={{ fontSize: "17px", fontFamily: "-moz-initial" }}>
            <strong>Contactless Delivery:</strong> In these times, your safety
            is our priority. Our contactless delivery process ensures your food
            reaches you safely.
          </li>
          <br />
          <br />
          <p style={{ fontSize: "17px", fontFamily: "-moz-initial" }}>
            Thank you for considering TiffinEase. We are excited to serve you
            and make your mealtime a delightful experience.
          </p>
          <br />
        </ul>
        <br />
      </div>
    </div>
  );
}

export default AboutUs;
