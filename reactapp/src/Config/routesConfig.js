/* eslint-disable prettier/prettier */
import { routes } from "../Constants/ConstRouts/routes";
// import AuthGuard from "../Guard/AuthGuard";
import AboutUs from "../Pages/About/AboutUs";
import CancelCheck from "../Pages/Checkout/CancelCheck";
import CheckOuts from "../Pages/Checkout/CheckOuts";
import SuccessCheck from "../Pages/Checkout/SuccessCheck";
import DesignImagesDTL from "../Pages/DetailsPageS/DesignImagesDTL";

// import TshImagesDTL from "../Pages/DetailsPageS/TshImagesDTL";
import { Home } from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import CasePR from "../Pages/Products/CasePR";
import HoodPR from "../Pages/Products/HoodPR";
import TshirtPR from "../Pages/Products/TshirtPR";

export const routesConfig = [
  { path: routes.home, Component: Home },
  { path: routes.aboutus, Component: AboutUs },
  // PAGES
  { path: routes.case, Component: CasePR },
  { path: routes.tshirt, Component: TshirtPR },
  { path: routes.hood, Component: HoodPR },
  //DETAIULS
  { path: routes.design, Component: DesignImagesDTL },
  // { path: routes.cvdtl, Component: CoverImagesDTL },
  // { path: routes.casedtl, Component: CaseImagesDTL },
  // { path: routes.tshdtl, Component: TshImagesDTL },
  // { path: routes.hoddtl, Component: HoodImagesDTL },
  //checkout
  { path: routes.checkout, Component: CheckOuts },
  { path: routes.checksuccess, Component: SuccessCheck },
  { path: routes.checkcancel, Component: CancelCheck },
  //NOTFOUND
  { path: routes.notfound, Component: NotFound },
];
