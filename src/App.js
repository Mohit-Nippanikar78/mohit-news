import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Category from "./News/Category";
import Home from "./News/Home";
import Results from "./News/Results";
import Header from "./News/Header";
import LoadingBar from "react-top-loading-bar";
import News from './News/News'
// import GetNews from "./getMethods/Getnews";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      type: null,
      categories: [
        { id: 1, con: "business" },
        { id: 2, con: "entertainment" },
        { id: 3, con: "general" },
        { id: 4, con: "health" },
        { id: 5, con: "science" },
        { id: 6, con: "sports" },
        { id: 7, con: "technology" },
      ],
      activeList: null,
      progress: 0,
      currentNews:null
    };
  }
  updateParent = (obj) => {
    this.setState(obj);
  };

  render() {
    return (
      <>
        {/* <GetNews updateParent={this.updateParent} /> */}
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          transitionTime={500}
          waitingTime={800}
        />
        <Header
          categories={this.state.categories}
          activeList={this.state.activeList}
          updateParent={this.updateParent}
          />
        <div style={{ top: "60px" }}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="category/:type"
              element={<Category updateParent={this.updateParent} />}
              key={this.state.activeList}
            />
            <Route path="/news/:newsTitle" element={<News 
            
                currentNews={this.state.currentNewsw}            
            
            />}/>

            <Route
              path="/results"
              element={<Results updateParent={this.updateParent} />}
            />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
