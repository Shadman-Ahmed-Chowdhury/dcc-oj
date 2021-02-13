import React from "react";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "react-bootstrap";
import { Card, CardGroup } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  hero: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
    height: "100vh",
  },
  heroText: {
    textAlign: "center",
    textShadow: "1px 1px 2px #481a72",
  },

  about: {
    marginTop: "720px",
    backgroundImage: "linear-gradient(white, #b4b2f3)",
    height: "100vh",
    zIndex: "-1",
  },
}));
const Home = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.hero}>
        <div className={classes.heroText}>
          <h1 style={{ fontSize: "4rem" }}>DCC Online Judge</h1>
          <h2 style={{ fontSize: "2rem" }}>
            Welcome to an Open Source Online Judge
          </h2>

          <Image
            src="../assets/hero.png"
            style={{ width: "35vw", height: "auto", margin: "2rem 0px" }}
            className="shadowed"
          />
        </div>
        <h2
          style={{
            fontSize: "1.8rem",
            textAlign: "center",
            textShadow: "1px 1px 1.5px #481a72",
          }}
        >
          Practice Programming Problems, Develop Your Skills
        </h2>
      </div>
      <div
        className="features"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200vh",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            textAlign: "center",
            textShadow: "1px 1px 1.5px #481a72",
          }}
        >
          Key Features
        </h1>
        <CardGroup
          style={{
            margin: "5rem 150px",
          }}
        >
          <Card
            style={{
              margin: "0px 20px",
            }}
          >
            <Card.Img
              variant="top"
              src="../assets/undraw6.png"
              className="card-img"
            />
            <Card.Footer>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Coding Platform for Self Development
                </Card.Title>
                <Card.Text>
                  Helps user to master coding skill by allowing to practice
                  coding problems of various categories.
                </Card.Text>
              </Card.Body>
            </Card.Footer>
          </Card>
          <Card
            style={{
              margin: "0px 20px",
            }}
          >
            <Card.Img
              variant="top"
              src="../assets/undraw2.png"
              className="card-img"
            />
            <Card.Footer>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Custom Coding Problems
                </Card.Title>
                <Card.Text>
                  User has control over the collection of the problem sets.
                  Means, any user can add custom problem of different categories
                  and difficulty level.
                </Card.Text>
              </Card.Body>
            </Card.Footer>
          </Card>
          <Card
            style={{
              margin: "0px 20px",
            }}
          >
            <Card.Img
              variant="top"
              src="../assets/undraw1.png"
              className="card-img"
            />
            <Card.Footer>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Categorized Problems
                </Card.Title>
                <Card.Text>
                  Users can browse the problems by categories and choose to
                  solve whichever according to their likings.
                </Card.Text>
              </Card.Body>
            </Card.Footer>
          </Card>
        </CardGroup>
        <CardGroup
          style={{
            margin: "0 350px",
          }}
        >
          <Card
            style={{
              margin: "0px 20px",
            }}
          >
            <Card.Img
              variant="top"
              src="../assets/undraw9.png"
              className="card-img"
            />
            <Card.Footer>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Tutorials of The Problems
                </Card.Title>
                <Card.Text>
                  If users can't understand or solve the problems, they can look
                  at the tutorials provided by the contributors to understand
                  how to solve that problem.
                </Card.Text>
              </Card.Body>
            </Card.Footer>
          </Card>
          <Card
            style={{
              margin: "0px 20px",
            }}
          >
            <Card.Img
              variant="top"
              src="../assets/undraw7.png"
              className="card-img"
            />
            <Card.Footer>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Code Viewer
                </Card.Title>
                <Card.Text>
                  Users can view the source code submitted by other users as
                  solution to have understanding of how to solve the problem in
                  different approach or language.
                </Card.Text>
              </Card.Body>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
      <footer
        style={{
          backgroundColor: "#543f6f",
          height: "55px",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "1rem" }}>&#169; DCC Online Judge</p>
      </footer>
    </>
  );
};

export default Home;
