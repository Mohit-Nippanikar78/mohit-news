import { Carousel, Card } from "react-bootstrap";
import React, { Component } from "react";
import "./styles/Home.css";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      city: null,
      weatherLoaded: false,
      carouselData: null,
    };
  }
  getWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=${process.env.REACT_APP_OPENWEATHERAPI_API_KEY}`
        )
          .then((Response) => Response.json())
          .then((data) => this.setState({ city: data[0].name }));
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERAPI_API_KEY}`
        )
          .then((Response) => Response.json())
          .then((data) => {
            this.setState({ weatherData: data, weatherLoaded: true });
            console.log(data);
          });
      });
    }
  };
  getCarouselNews = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=8568f22b7331499bb489ab95e6dd2470`
    )
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ carouselData: data.articles });
      });
  };
  componentDidMount() {
    this.getWeather();
    this.getCarouselNews();
  }
  render() {
    return (
      <>
        {" "}
        <div className="container ">
          <div className="row">
            <div className="py-2 col" style={{ width: "50%", flexGrow: "2" }}>
              <Carousel fade variant="dark">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://e3.365dm.com/21/12/768x432/skynews-2021-year-in-pictures_5614266.jpg?20211213164515"
                    alt="First slide"
                  />
                  <Carousel.Caption
                    style={{
                      background:
                        "linear-gradient(to top, black , transparent )",
                      width: "100%",
                      left: "0",
                      color: "white",
                    }}
                  >
                    <h3>Top Headlines</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                {this.state.carouselData
                  ? this.state.carouselData.map((news) => {
                      if (news.urlToImage) {
                        return (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={news.urlToImage}
                              alt="First slide"
                            />
                            <Carousel.Caption
                              style={{
                                background:
                                  "linear-gradient(to top, black , transparent )",
                                width: "100%",
                                left: "0",
                                color: "white",
                              }}
                            >
                              <h4>{news.title}</h4>
                            </Carousel.Caption>
                          </Carousel.Item>
                        );
                      }
                    })
                  : ""}
              </Carousel>
            </div>
            {/* <div className="container-fuild col">
          <div className="row">
            <div className="col">Mumbai</div>
            <div className="col">
              <MyLocationIcon />
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col"> </div>
          </div>
         </div> */}
            <div className="col">
              {this.state.weatherLoaded ? (
                <Card className="my-2" style={{ overflow: "hidden" }}>
                  <span
                    className="badge bg-info text-dark"
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                    }}
                  >
                    {new Date().toDateString()}
                  </span>
                  <Card.Header className="row">
                    <div className="col">
                      {this.state.weatherData
                        ? this.state.weatherData.name
                        : ""}
                      ,{this.state.city ? this.state.city : ""}
                    </div>
                    <div className="col" style={{ textAlign: "right" }}>
                      <i className="fa-solid fa-location-crosshairs"></i>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col">
                        <Card.Title>
                          {this.state.weatherData
                            ? this.state.weatherData.main.temp.toFixed(1)
                            : ""}
                           &#8451;
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {this.state.weatherData
                            ? this.state.weatherData.weather[0].main
                            : ""}
                        </Card.Subtitle>
                      </div>
                      <div className="col">
                        <img
                          src={
                            this.state.weatherData
                              ? `http://openweathermap.org/img/wn/${this.state.weatherData.weather[0].icon}@2x.png`
                              : ""
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <Card.Text>
                      <div>
                        Low :
                        {this.state.weatherData
                          ? this.state.weatherData.main.temp_min.toFixed(1)
                          : ""} &#8451;
                      </div>
                      <div>
                        High :
                        {this.state.weatherData
                          ? this.state.weatherData.main.temp_max.toFixed(1)
                          : ""} &#8451;
                        
                      </div>
                    </Card.Text>
                    <Card.Link href="#">See Forecasts</Card.Link>
                    <div>
                      <cite title="Source Title">--Weather </cite>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card
                  className="my-2"
                  style={{ width: "360px", height: "303px" }}
                >
                  <Card.Header style={{ overflow: "hidden" }}>
                    Getting Your Weather...
                  </Card.Header>
                </Card>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
