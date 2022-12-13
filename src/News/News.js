import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function News({ currentNews }) {
  let { newsTitle } = useParams();
  useEffect(() => {
    newsTitle &&
    // https://newsapi.org/v2/everything?q=LIC%20IPO:%20Gearing%20up%20for%20India%27s%20Aramco%20moment%20and%20its%20stunning%20scale%20-%20Mint&apiKey=8568f22b7331499bb489ab95e6dd2470
      fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(newsTitle)}&apiKey=8568f22b7331499bb489ab95e6dd2470`
      )
        .then((Response) => {
          Response.json();
          console.log(Response);
        })
        .then((data) => console.log(data));
  }, []);

  return <>{newsTitle}</>;
}
