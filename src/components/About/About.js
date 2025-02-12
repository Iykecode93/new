import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-us">
      <div className="about-container">
        <h1>GloryLand Schools</h1>
        <p>
          Welcome to GloryLand Schools, where excellence meets passion. We are a
          premier educational institution committed to nurturing the
          intellectual and emotional growth of our students.
        </p>

        <section>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide quality, affordable, and accessible
            education to students of all backgrounds, fostering academic
            excellence, character development, and leadership skills that will
            prepare them for a successful future.
          </p>
        </section>

        <section>
          <h2>Our Vision</h2>
          <p>
            At GloryLand Schools, our vision is to be a beacon of academic
            excellence, equipping students with the knowledge, skills, and
            values they need to thrive in a rapidly changing world. We strive to
            be a leader in innovative education, offering a diverse range of
            programs that cater to the needs of our students.
          </p>
        </section>

        <section>
          <h2>Meet Our Team</h2>
          <p>
            Our dedicated team of educators, administrators, and staff work
            tirelessly to ensure that each student receives the best possible
            education and support. Together, we cultivate a nurturing and
            inclusive environment that empowers students to reach their full
            potential.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
