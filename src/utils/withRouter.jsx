// import { useNavigate } from "react-router-dom";

// export default function useNavigation(Component) {
//   const Wrapper = (props) => {
//     const navigate = useNavigate();

//     return <Component navigate={navigate} {...props} />;
//   };

//   return Wrapper;
// }

import { useNavigate } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
