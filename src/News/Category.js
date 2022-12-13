import React, { Component, useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";
// import GetNews from "../getMethods/Getnews";

const CategoryCover = (props) => {
  const [type, setType] = useState(window.location.pathname.split("/").pop());
  useEffect(() => {
    setType(window.location.pathname.split("/").pop());
  }, [window.location.pathname]);

  return <Category type={type} key={type} updateParent={props.updateParent} />;
};
export class Category extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalPages: null,
      loading: false,
      activePages: [1, 2, 3],
    };
  }
  updateCategoryParent = (obj) => {
    this.setState(obj);
  };

  getNews = async (add, pageSize) => {
    this.props.updateParent({ progress: 30 });
    await this.setState({ loading: !this.state.loading });

    let url = `https://newsapi.org/v2/top-headlines?category=${
      this.props.type
    }&country=in${pageSize ? "&pageSize=4" : ""}&page=${
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
        this.setState(
          {
            articles: add
              ? this.state.articles.concat(Response.articles)
              : Response.articles,
            totalPages: Math.ceil(Response.totalResults / 4),
            loading: !this.state.loading,
          },
          () => {
            console.log(Response);
          }
        )
      );
    await this.props.updateParent({ progress: 100 });
  };

  componentDidMount() {
    // GetNews(this.props.type, null, this.state.page,this.updateCategoryParent);
    // console.log( GetNews())
    this.getNews();
  }

  render() {
    return (
      <div>
        {/* <GetNews updateCategoryParent={this.updateCategoryParent} type={this.props.type} pageSize ={null} page={this.state.page} articles={this.state.articles} />; */}
        {/* {this.state.loading ? (
          <div
            style={{ display: "grid", height: "60vh", placeItems: "center" }}
          >
            <img
              src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
              alt=""
            />
          </div>
        ) : ( */}
        <InfiniteScroll
          style={{ overflow: "visible" }}
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={() => {
            this.setState({ page: this.state.page + 1 }, () => {
              this.getNews(true, false);
              // GetNews(this.props.type, null, this.state.page);
              
            });
          }}
          hasMore={this.state.articles.length !== this.state.totalPages}
          loader={
            <div
              style={{ display: "grid", height: "10vh", placeItems: "center" }}
            >
              <img
                src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
                alt=""
              />
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
          }
        >
          <div
            style={{
              display: "grid",

              gridTemplateColumns: "repeat(4,1fr)",
              rowGap: "20px",
              padding: "20px",

              // height: "60vh",
              placeItems: "center",
            }}
          >
            {this.state.articles.map((news, index) => {
              return <Newsitem info={news} key={index} />;
            })}
          </div>
          {/* )} */}
        </InfiniteScroll>
        {/* <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li
              className={
                this.state.page == 1 ? "disabled page-item" : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => {
                  // this.setState({ page: this.state.page }, () => {
                  //   this.getNews();
                  // });

                  if (this.state.page == 1 || this.state.page == 2) {
                    this.setState({ page: 1 }, () => {
                      this.getNews();
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
                      this.getNews();
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
                        this.getNews();
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
                  // this.setState({ page: this.state.page }, () => {
                  //   this.getNews();
                  // });

                  if (this.state.page == 1 || this.state.page == 2) {
                    this.setState({ page: 1 }, () => {
                      this.getNews();
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
                      this.getNews();
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
                        this.getNews();
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
                      this.getNews();
                    });
                  } else if (this.state.page == this.state.totalPages) {
                    this.setState({ page: this.state.page - 1 }, () => {
                      this.getNews();
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
                      this.getNews();
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
                        this.getNews();
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
                        this.getNews();
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
                      this.getNews();
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
                        this.getNews();
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
                        this.getNews();
                      }
                    );
                  }
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav> */}
        {/* <span className="badge bg-secondary container">
          {this.state.page}/{this.state.totalPages}
        </span> */}
      </div>
    );
  }
}

export default CategoryCover;
