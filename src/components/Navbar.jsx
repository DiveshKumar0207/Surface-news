import { Component } from "react";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Collapse,
  MenuItem,
  Menu,
  MenuHandler,
  ListItem,
  MenuList,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  // SquaresPlusIcon,
} from "@heroicons/react/24/outline";

const navListMenuItems = [
  {
    title: "Entertainment ",
  },
  {
    title: "Health",
  },
  {
    title: "Science",
  },
  {
    title: "Sports",
  },
  {
    title: "Technology",
  },
];

class NavListMenu extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
      isMobileMenuOpen: false,
    };
  }

  renderItems = navListMenuItems.map(({ title }, key) => (
    <Link to={`/${title.toLowerCase()}`} key={key} className="">
      <MenuItem className="flex items-center gap-3 rounded-lg text-textColor-high hover:hover:bg-overlayDarkColors-dp04 hover:text-textColor-high lg-max:mx-4">
        <div>
          <Typography
            variant="h6"
            className="flex items-center text-sm font-bold"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  ));

  render() {
    const { isMenuOpen, isMobileMenuOpen } = this.state;
    return (
      <>
        <Menu
          open={isMenuOpen}
          color="blue-gray"
          handler={(value) => this.setState({ isMenuOpen: value })}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className="flex items-center rounded-md px-3 py-2 font-medium  text-textColor-high  transition-colors  lg-max:mx-4 "
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() =>
                  this.setState((prev) => ({
                    isMobileMenuOpen: !prev.isMobileMenuOpen,
                  }))
                }
              >
                More
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>

          <MenuList className="hidden max-w-screen-xl  rounded-xl bg-blue-gray-800 text-textColor-high  lg:block">
            <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0  ">
              {this.renderItems}
            </ul>
          </MenuList>
        </Menu>

        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen}>{this.renderItems}</Collapse>
        </div>
      </>
    );
  }
}

class NavList extends Component {
  static propTypes = {
    handleValueReset: PropType.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }
  render() {
    return (
      <>
        <ul className="my-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center  ">
          <Typography as="li" variant="small" className=" font-medium">
            <Link
              to={"/"}
              className="flex items-center rounded-md px-3 py-2 font-medium  text-textColor-high  transition-colors hover:hover:bg-overlayDarkColors-dp04 lg-max:mx-4 "
            >
              Top Stories
            </Link>
          </Typography>

          <Typography as="li" variant="small" className=" font-medium">
            <Link
              to={"/business"}
              className="flex items-center rounded-md px-3 py-2 font-medium  text-textColor-high  transition-colors hover:hover:bg-overlayDarkColors-dp04 lg-max:mx-4 "
            >
              Buisness
            </Link>
          </Typography>

          <NavListMenu />
        </ul>
      </>
    );
  }
}

export default class NavbarComponent extends Component {
  static propTypes = {
    onSearchChange: PropType.func,
    onSearchSubmit: PropType.func,
    handleKeyUp: PropType.func,
    searchValue: PropType.string,
  };
  constructor() {
    super();
    this.state = {
      openNav: false,
      value: "",
    };
    // Create an instance of NavList
    this.NavListInstance = new NavList();
  }

  handleWindowResize = () =>
    window.innerWidth >= 960 && this.setState({ openNav: false });

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);

    return () => {
      window.removeEventListener("resize", this.handleWindowResize);
    };
  }

  render() {
    const { openNav } = this.state;
    const { onSearchSubmit, onSearchChange, searchValue, handleKeyUp } =
      this.props;

    return (
      <div>
        <Navbar
          variant="gradient"
          color="blue-gray"
          className=" h-max max-w-full rounded-none from-blue-gray-900 to-blue-gray-800 px-4 py-3"
        >
          <div className="flex flex-wrap items-center justify-between text-white">
            <Typography
              as="a"
              href="/"
              variant="h6"
              className="ml-2 mr-4 cursor-pointer py-1.5 text-textColor-high"
            >
              Surface News
            </Typography>

            {/*  */}
            <div className="hidden lg:block">
              {this.NavListInstance.render()}
            </div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => this.setState({ openNav: !openNav })}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>

            <Collapse open={openNav} className="lg:hidden">
              {this.NavListInstance.render()}
            </Collapse>
            {/*  */}

            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                color="white"
                label="Type here..."
                className="pr-20"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                value={searchValue}
                onChange={onSearchChange}
              />

              <Button
                size="sm"
                color="white"
                className="!absolute right-1 top-1 rounded"
                onClick={onSearchSubmit}
                onKeyUp={handleKeyUp}
              >
                Search
              </Button>
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}
