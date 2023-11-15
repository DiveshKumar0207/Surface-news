import { Component } from "react";
import Newscard from "./Newscard";
import jsonfile from "../../sample.json";
import alternativeImg from "../assets/alternative.jpeg";

export default class News extends Component {
  constructor() {
    super();
  }
  getTitle(sentence) {
    const hyphenSeparatedArray = sentence.split("-");

    if (hyphenSeparatedArray.length > 1) {
      return hyphenSeparatedArray.slice(0, -1).join("-");
    } else {
      return "No hyphen found in the sentence.";
    }
  }

  render() {
    let newsImgURl;
    return (
      <div className="flex flex-shrink flex-wrap justify-center gap-4 p-16">
        {jsonfile.articles.map((article) => {
          article.urlToImage
            ? (newsImgURl = article.urlToImage)
            : (newsImgURl = alternativeImg);

          return (
            <div key={article.url}>
              <Newscard
                imgUrl={newsImgURl}
                title={this.getTitle(article.title)}
                sourceName={article.source.name}
                content={article.description}
                readMoreUrl={article.url}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
