import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropType from "prop-types";
import { Component } from "react";

export default class Newscard extends Component {
  static propTypes = {
    imgUrl: PropType.string,
    title: PropType.string,
    sourceName: PropType.string,
    content: PropType.string,
    readMoreUrl: PropType.string,
  };

  constructor(props) {
    super(props);
  }
  render() {
    let { imgUrl, title, content, sourceName, readMoreUrl } = this.props;

    return (
      <Card className=" w-80 bg-blue-gray-100">
        <CardHeader
          color="blue-gray"
          className="relative mt-4 h-36 overflow-hidden "
        >
          <img
            src={imgUrl}
            alt="news-image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </CardHeader>

        <CardBody className="h-[17rem] overflow-hidden">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {title}
          </Typography>

          <Typography variant="small">{content}..</Typography>
        </CardBody>

        <div className="my-4 flex items-center justify-between px-9">
          <Typography className="text-xs" variant="lead">
            by {sourceName}
          </Typography>
          <Typography className="text-xs" variant="lead">
            January 10
          </Typography>
        </div>

        <CardFooter className="flex items-center justify-between pt-0">
          <a href={readMoreUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="text" className="flex items-center gap-2 pl-3">
              Read More{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardFooter>
      </Card>
    );
  }
}

// Newscard.propTypes = {
//   imgUrl: PropTypes.string,
//   title: PropTypes.string,
//   sourceName: PropTypes.string,
//   content: PropTypes.string,
//   readMoreUrl: PropTypes.string,
// };
