import React, { Component } from "react";
import Newsitem from "./Newsitem";
import getAnyNews from "../getMethods/Getnews";

export class Results extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], 
      page: 1,
      totalPages: null,
      loading: false,
      activePages: [1, 2, 3],
      query: null, 
      type :null
    };
  }

  getQueryNews = async () => {
    this.setState({ loading: !this.state.loading });
    let url = `https://newsapi.org/v2/everything?q=${this.state.query}&pageSize=4&page=${
      this.state.page
    }&apiKey=8568f22b7331499bb489ab95e6dd2470`;
    await fetch(url)
      .then(
        (data) => data.json(),
        () => {
          this.props.updateParent({ progress: 50 });
        }
      )
      .then((Response) =>
      this.setState({
        articles:  Response.articles,
        totalPages: Math.ceil(Response.totalResults / 4),
        loading: !this.state.loading,
      },()=>{

        console.log(Response)
      })
      );
  };
  async componentDidMount() {
    await this.getQueryNews();
  }
 
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div
            style={{ display: "grid", height: "60vh", placeItems: "center" }}
          >
            <img
              src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
              alt=""
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              height: "60vh",
              placeItems: "center",
            }}
          >
            {this.state.articles.map((news, index) => {
              return (
               
                  <Newsitem info={news} key={index} />
                
              );
            })}
          </div>
        )}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li
              className={
                this.state.page == 1 ? "disabled page-item" : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => {
                  if (this.state.page == 1 || this.state.page == 2) {
                    this.setState({ page: 1 }, () => {
                      this.getQueryNews();
                      this.setState({
                        activePages: [
                          this.state.page,
                          this.state.page + 1,
                          this.state.page + 2,
                        ],
                      });
                    });
                    console.log(1);
                  } else if (this.state.page == this.state.activePages[1]) {
                    this.setState({ page: this.state.page - 1 }, () => {
                      this.setState({
                        activePages: [
                          this.state.page - 1,
                          this.state.page,
                          this.state.page + 1,
                        ],
                      });
                      this.getQueryNews();
                    });
                    console.log(3);
                  } else if (
                    this.state.totalPages ==
                    this.state.activePages[0] + 2
                  ) {
                    console.log(4);
                    this.setState(
                      {
                        page: this.state.page - 2,
                      },
                      () => {
                        this.setState({
                          activePages: [
                            this.state.page - 1,
                            this.state.page,
                            this.state.page + 1,
                          ],
                        });
                        this.getQueryNews();
                      }
                    );
                  }
                }}
              >
                Previous
              </a>
            </li>

            <li
              className={
                this.state.page == this.state.activePages[0]
                  ? "page-item active"
                  : "page-item"
              }
            >
              <a
                className="page-link "
                onClick={() => {
                  if (this.state.page == 1 || this.state.page == 2) {
                    this.setState({ page: 1 }, () => {
                      this.getQueryNews();
                      this.setState({
                        activePages: [
                          this.state.page,
                          this.state.page + 1,
                          this.state.page + 2,
                        ],
                      });
                    });
                    console.log(1);
                  } else if (this.state.page == this.state.activePages[1]) {
                    this.setState({ page: this.state.page - 1 }, () => {
                      this.setState({
                        activePages: [
                          this.state.page - 1,
                          this.state.page,
                          this.state.page + 1,
                        ],
                      });
                      this.getQueryNews();
                    });
                    console.log(3);
                  } else if (
                    this.state.totalPages ==
                    this.state.activePages[0] + 2
                  ) {
                    console.log(4);
                    this.setState(
                      {
                        page: this.state.page - 2,
                      },
                      () => {
                        this.setState({
                          activePages: [
                            this.state.page - 1,
                            this.state.page,
                            this.state.page + 1,
                          ],
                        });
                        this.getQueryNews();
                      }
                    );
                  }
                }}
              >
                {this.state.activePages[0]}
              </a>
            </li>
            <li
              className={
                this.state.page == this.state.activePages[1]
                  ? "page-item active"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => {
                  if (this.state.page == 1) {
                    this.setState({ page: this.state.page + 1 }, () => {
                      this.getQueryNews();
                    });
                  } else if (this.state.page == this.state.totalPages) {
                    this.setState({ page: this.state.page - 1 }, () => {
                      this.getQueryNews();
                    });
                  }
                }}
              >
                {this.state.activePages[1]}
              </a>
            </li>
            <li
              className={
                this.state.page == this.state.activePages[2]
                  ? "page-item active"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => {
                  if (this.state.page == this.state.totalPages - 1) {
                    this.setState({ page: this.state.page + 1 }, () => {
                      this.setState({
                        activePages: [
                          this.state.page - 2,
                          this.state.page - 1,
                          this.state.page,
                        ],
                      });
                      this.getQueryNews();
                    });
                  } else if (this.state.page == this.state.activePages[2] - 2) {
                    this.setState(
                      {
                        page: this.state.page + 2,
                      },
                      () => {
                        this.setState({
                          activePages: [
                            this.state.page - 1,
                            this.state.page,
                            this.state.page + 1,
                          ],
                        });
                        this.getQueryNews();
                      }
                    );
                  } else {
                    this.setState(
                      {
                        page: this.state.page + 1,
                        activePages: [
                          this.state.page,
                          this.state.page + 1,
                          this.state.page + 2,
                        ],
                      },
                      () => {
                        this.getQueryNews();
                      }
                    );
                  }
                }}
              >
                {this.state.activePages[2]}
              </a>
            </li>
            <li
              className={
                this.state.page == this.state.totalPages
                  ? "disabled page-item"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  if (this.state.page == this.state.totalPages - 1) {
                    this.setState({ page: this.state.page + 1 }, () => {
                      this.setState({
                        activePages: [
                          this.state.page - 2,
                          this.state.page - 1,
                          this.state.page,
                        ],
                      });
                      this.getQueryNews();
                    });
                  } else if (this.state.page == this.state.activePages[2] - 2) {
                    this.setState(
                      {
                        page: this.state.page + 2,
                      },
                      () => {
                        this.setState({
                          activePages: [
                            this.state.page - 1,
                            this.state.page,
                            this.state.page + 1,
                          ],
                        });
                        this.getQueryNews();
                      }
                    );
                  } else {
                    this.setState(
                      {
                        page: this.state.page + 1,
                        activePages: [
                          this.state.page,
                          this.state.page + 1,
                          this.state.page + 2,
                        ],
                      },
                      () => {
                        this.getQueryNews();
                      }
                    );
                  }
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>

        <span className="badge bg-secondary container">
          {this.state.page}/{this.state.totalPages}
        </span>
      </div>
    );
  }
}

export default Results;
