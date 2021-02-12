import React from "react";
import "./About.css";
import { CardGroup, Card } from "react-bootstrap";
const About = () => {
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="text-style">
        <h1
          style={{
            fontSize: "2rem",
            textAlign: "center",
            textShadow: "1px 1px 1.5px #481a72",
          }}
        >
          About DCC Online Judge
        </h1>
        <p
          className="text-center"
          style={{
            fontSize: "1.2rem",
            textAlign: "center",
            margin: "1.5rem 4rem",
          }}
        >
          This project entitled “DCC Online Judge” is submitted to the
          Department of Computer Science & Engineering, National University,
          Bangladesh, has been accepted as satisfactory for the partial
          fulfillment of the requirement for the degree of Bachelor of Science
          in Computer Science & Engineering approved as to its style and
          contents. This project is developed by,
        </p>
      </div>
      <CardGroup
        style={{
          margin: "0 350px",
          height: "100px",
        }}
      >
        <Card
          style={{
            margin: "0px 20px",
            height: "100px",
          }}
        >
          <Card.Img
            variant="top"
            src="../assets/avatar.png"
            className="card-img-dev"
          />
          <Card.Footer>
            <Card.Body>
              <Card.Title
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                className="text-center"
              >
                Syed Shadman Ahmed Chowdhury
              </Card.Title>
            </Card.Body>
          </Card.Footer>
        </Card>
        <Card
          style={{
            margin: "0px 20px",
            height: "100px",
          }}
        >
          <Card.Img
            variant="top"
            src="../assets/avatar.png"
            className="card-img-dev"
          />
          <Card.Footer>
            <Card.Body>
              <Card.Title
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                className="text-center"
              >
                Hasna Hena Mow
              </Card.Title>
            </Card.Body>
          </Card.Footer>
        </Card>{" "}
      </CardGroup>
    </div>
  );
};

export default About;
