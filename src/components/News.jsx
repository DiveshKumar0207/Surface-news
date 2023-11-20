import { Component } from "react";
import { Typography } from "@material-tailwind/react";
import Newscard from "./Newscard";
import Pagination from "./Pagination";
import alternativeImg from "../assets/alternative.jpeg";
import PropType from "prop-types";
import LoadingSkeleton from "./Skeleton";

export default class News extends Component {
  static propTypes = {
    URL: PropType.string,
    country: PropType.string,
    pageSize: PropType.number,
    endpoints: PropType.string,
    category: PropType.string,
  };
  static defaultProps = {
    country: "in",
    category: "general",
    endpoints: "top-headlines",
    pageSize: 12,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      totalPagingRequirement: 0,
      currentPageNumber: 1,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let URL = `https://newsapi.org/v2/${this.props.endpoints}?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.URL}&page=${this.state.currentPageNumber}&pageSize=${this.props.pageSize}`;
    let data = await fetch(URL);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalPagingRequirement: Math.ceil(
        parsedData.totalResults / this.props.pageSize,
      ),
      loading: false,
    });
  }

  // setPage func ->sent to be prop
  setPage = async (pageno) => {
    this.setState({
      loading: true,
      currentPageNumber: pageno,
    });
    let URL = `https://newsapi.org/v2/${this.props.endpoints}?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.URL}&page=${pageno}&pageSize=${this.props.pageSize}`;
    let data = await fetch(URL);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalPagingRequirement: Math.ceil(parsedData.totalResults / 20),
      loading: false,
    });
  };

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
      <>
        {/* //TODO below div responsiveness */}
        <div className="mx-24 mt-6 flex justify-between">
          <Typography variant="h3" color="blue-gray" className="underline">
            Top Headlines
          </Typography>

          <Pagination
            totalPagingRequirement={this.state.totalPagingRequirement}
            setPage={this.setPage}
          />
        </div>

        <div className={` ${this.state.loading ? "block" : "hidden"}`}>
          <div className="flex flex-shrink flex-wrap justify-center gap-4 p-16">
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
          </div>
        </div>

        <div className="flex flex-shrink flex-wrap justify-center gap-4 p-16">
          {this.state.articles.map((article) => {
            article.urlToImage
              ? (newsImgURl = article.urlToImage)
              : (newsImgURl = alternativeImg);

            return (
              <div key={article.url}>
                <Newscard
                  imgUrl={newsImgURl}
                  title={this.getTitle(article.title)}
                  sourceName={article.source.name}
                  content={article.content}
                  readMoreUrl={article.url}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

// News.propTypes = {
//   URL: PropType.string,
// };
