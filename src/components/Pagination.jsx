import { Component } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import PropType from "prop-types";

export default class Pagination extends Component {
  static propTypes = {
    totalPagingRequirement: PropType.number.isRequired,
    setPage: PropType.func,
    fetchData: PropType.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      pagesToShow: 3, // Number of pages to show at a time
    };
  }
  getItemProps = (i) => ({
    variant: this.state.active === i ? "filled" : "text",
    color: "gray",
    onClick: () => this.setState({ active: i }),
  });

  next = () => {
    if (this.state.active === this.props.totalPagingRequirement) return;

    this.setState({ active: this.state.active + 1 });

    // PROPS FOR SETTING PAGINATIONG PAGE $ fetching data
    this.props.setPage(this.state.active + 1);
  };

  prev = () => {
    if (this.state.active === 1) return;

    this.setState({ active: this.state.active - 1 });

    // PROPS FOR SETTING PAGINATIONG PAGE $ fetching data
    this.props.setPage(this.state.active - 1);
  };

  makePaginationButtons() {
    if (this.props.totalPagingRequirement) {
      const buttons = [];
      const totalPages = this.props.totalPagingRequirement;
      const { active, pagesToShow } = this.state;

      let startPage = Math.max(1, active - Math.floor(pagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

      // Adjust if there are not enough pages to fill pagesToShow
      if (totalPages <= pagesToShow) {
        startPage = 1;
        endPage = totalPages;
      } else {
        // Ensure that the last page is shown when near the end
        if (endPage - startPage < pagesToShow - 1) {
          startPage = endPage - pagesToShow + 1;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <IconButton key={i} {...this.getItemProps(i)}>
            {i}
          </IconButton>,
        );
      }

      return buttons;
    }
  }

  render() {
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={this.prev}
          disabled={this.state.active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>

        <div className="flex items-center gap-2">
          {this.makePaginationButtons()}
        </div>

        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={this.next}
          disabled={this.state.active === this.props.totalPagingRequirement}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    );
  }
}
