import { Component } from "react";
import { Typography } from "@material-tailwind/react";
import Newscard from "./Newscard";
import Pagination from "./Pagination";
import alternativeImg from "../assets/alternative.jpeg";
import PropType from "prop-types";
import LoadingSkeleton from "./Skeleton";

export default class News extends Component {
  static propTypes = {
    APIKEY: PropType.string,
    country: PropType.string,
    pageSize: PropType.number,
    endpoints: PropType.string,
    category: PropType.string,
    query: PropType.string,
  };
  static defaultProps = {
    country: "in",
    category: "general",
    endpoints: "top-headlines",
    pageSize: 8,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      totalResults: 0,
      totalPagingRequirement: 0,
      currentPageNumber: 1,
      loading: false,
    };
  }

  async fetchFunction(endpoints, pageno) {
    let URL;
    "everything" === endpoints
      ? (URL = `https://newsapi.org/v2/${this.props.endpoints}?q=${this.props.query}&apikey=${this.props.APIKEY}&page=${pageno}&pageSize=${this.props.pageSize}`)
      : (URL = `https://newsapi.org/v2/${this.props.endpoints}?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.APIKEY}&page=${pageno}&pageSize=${this.props.pageSize}`);
    let data = await fetch(URL);
    let parsedData = await data.json();
    return parsedData;
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let parsedData;
    // if something goes wrong in search, index endpoint will be hit
    parsedData = await this.fetchFunction(this.props.endpoints, 1);
    if (!parsedData) {
      parsedData = await this.fetchFunction("top-headlines", 1);
    }

    if (parsedData) {
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        totalPagingRequirement: Math.ceil(
          parsedData.totalResults / this.props.pageSize,
        ),
        loading: false,
      });
    }
  }

  // setPage func ->sent to be prop
  setPage = async (pageno) => {
    this.setState({
      loading: true,
      currentPageNumber: pageno,
    });
    let parsedData;
    // if something goes wrong in search, index endpoint will be hit
    parsedData = await this.fetchFunction(this.props.endpoints, pageno);
    if (!parsedData) {
      parsedData = await this.fetchFunction("top-headlines", pageno);
    }
    console.log("hhyhyy");

    this.setState({
      articles: parsedData.articles,
      loading: false,
    });
  };

  getTitle(sentence) {
    const hyphenSeparatedArray = sentence.split("-");

    if (hyphenSeparatedArray.length > 1) {
      return hyphenSeparatedArray.slice(0, -1).join("-");
    } else {
      return sentence;
    }
  }
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    let newsImgURl;
    return (
      <>
        <div className="mx-16 my-6 flex ">
          <Typography variant="h4" color="blue-gray" className="underline">
            {this.props.category == "general"
              ? "Top"
              : this.capitalizeFirstLetter(this.props.category)}
            -Headlines
          </Typography>
        </div>

        <div className={` ${this.state.loading ? "block" : "hidden"}`}>
          <div className="flex flex-shrink flex-wrap justify-center gap-4 p-8">
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
          </div>
        </div>

        <div className="flex flex-shrink flex-wrap justify-center gap-4 p-8">
          {this.state.articles.map((article) => {
            article.urlToImage
              ? (newsImgURl = article.urlToImage)
              : (newsImgURl = alternativeImg);

            const articleDate = new Date(article.publishedAt);

            // prettier-ignore
            const month = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December" ]
            const publishDate = `${
              month[articleDate.getMonth()]
            } ${articleDate.getDate()}`;

            let articleContent;
            if (article && article.content) {
              articleContent = article.content.substring(0, 190);
            } else {
              articleContent = "";
            }

            return (
              <div key={article.url}>
                <Newscard
                  imgUrl={newsImgURl}
                  title={this.getTitle(article.title)}
                  sourceName={article.source.name}
                  content={articleContent}
                  readMoreUrl={article.url}
                  publishDate={publishDate}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pb-8 md:p-8 lg:p-12">
          <Pagination
            totalPagingRequirement={this.state.totalPagingRequirement}
            setPage={this.setPage}
          />
        </div>
      </>
    );
  }
}
