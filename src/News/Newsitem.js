import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Badge} from 'react-bootstrap'

export class Newsitem extends Component {
  render() {
    return (
      <div
        className="card"
        style={{ width: "18rem", margin: "auto", height: "100%" }}
      >
        {/* <span
          classname="badge bg-danger"
          style={{
            color: "white",
            position: "absolute",
            right: "10px",
            top: "-0.5rem",
          }}
        >
          {this.props.info.source.name}
        </span> */}
        <Badge bg="primary"
         style={{
          color: "white",
          position: "absolute",
          right: "10px",
          top: "-0.5rem",
        }}>
        {this.props.info.source.name}

        </Badge>
        <img
          src={
            this.props.info.urlToImage
              ? this.props.info.urlToImage
              : "https://cdn.sanity.io/images/0vv8moc6/dermatologytimes/d198c3b708a35d9adcfa0435ee12fe454db49662-640x400.png"
          }
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "190px" }}
        />
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h5 className="card-title">
            {this.props.info.title ? this.props.info.title.slice(0, 35) : ""}...
          </h5>
          <p className="card-text">
            {this.props.info.description
              ? this.props.info.description.slice(0, 50)
              : ""}
            ...
          </p>
          <p classname="card-text">
            <small classname="text-muted">
              By{" "}
              {this.props.info.author == "unknown"
                ? "Anonymous"
                : this.props.info.author}{" "}
              on {new Date(this.props.info.publishedAt).toDateString()}
            </small>
          </p>
          <div>
            <Link
              to={`/news/${this.props.info.title}`}
              className="btn btn-primary mr-1"
            >
              Read More
            </Link>
            <a
              href={this.props.info.url}
              className="btn btn-primary"
              target="_blank"
            >
              Open
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
