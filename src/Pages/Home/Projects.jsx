import React from "react";
import project1 from "../../assets/img/icons/project1.svg";
import project2 from "../../assets/img/icons/project2.svg";
import project3 from "../../assets/img/icons/project3.svg";
import project4 from "../../assets/img/icons/project4.svg";

function Projects() {
  return (
    <div className="row">
      <div className="col">
        <div className="card" style={{ width: "18rem" }}>
          <img src={project1} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Website Creator</h5>
            <p className="card-text">
              Quickly generate AI-powered websites in just minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
