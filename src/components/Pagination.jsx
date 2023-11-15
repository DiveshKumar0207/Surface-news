import { Component } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default class Pagination extends Component {
  constructor() {
    super();
    this.state = {
      active: 1,
    };
  }
  getItemProps = (index) => ({
    variant: this.state.active === index ? "filled" : "text",
    color: "gray",
    onClick: () => this.setState({ active: index }),
  });
  next = () => {
    if (this.state.active === 5) return;

    this.setState({ active: this.state.active + 1 });
  };

  prev = () => {
    if (this.state.active === 1) return;

    this.setState({ active: this.state.active - 1 });
  };

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
          <IconButton {...this.getItemProps(1)}>1</IconButton>
          <IconButton {...this.getItemProps(2)}>2</IconButton>
          <IconButton {...this.getItemProps(3)}>3</IconButton>
          <IconButton {...this.getItemProps(4)}>4</IconButton>
          <IconButton {...this.getItemProps(5)}>5</IconButton>
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={this.next}
          disabled={this.state.active === 5}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    );
  }
}
