import { Link } from "react-router";

export const Navbar = ({ inverted }: { inverted: boolean }) => {
  return (
    <div
      className={`navbar fixed z-30 ${
        inverted ? "bg-base-100/10" : "bg-mocha-700 border-b-2 border-mocha-700"
      } `}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="text-xl">Services</a>
              <ul className="p-2 text-xl">
                <li>
                  <Link to={"/makelaardij"}>Makelaardij</Link>
                </li>
                <li>
                  <Link to={"/mediation"}>Mediation</Link>
                </li>
              </ul>
            </li>
            <li>
              <a>Huizen</a>
              <ul className="p-2">
                <li>
                  <Link to={"/aanbod"}>Aanbod</Link>
                </li>
                <li>
                  <a>Verkocht</a>
                </li>
                <li>
                  <a>Aangekocht</a>
                </li>
                <li>
                  <a>Verhuur</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl px-2">
          <img src="/logo.png" alt="logo" className="max-w-[45px] h-auto" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul
          className={`menu menu-horizontal px-1 text-md  gap-2 ${
            inverted ? "text-white" : "text-mocha-50"
          }`}
        >
          <li>
            <Link className="btn btn-secondary btn-sm " to={"/makelaardij"}>
              Makelaardij
            </Link>
          </li>
          <li>
            <Link className="btn btn-secondary btn-sm" to={"/mediation"}>
              Mediation
            </Link>
          </li>
          {/*<li>*/}
          {/*	<details>*/}
          {/*		<summary>Diensten</summary>*/}
          {/*		<ul className="p-2">*/}

          {/*		</ul>*/}
          {/*	</details>*/}
          {/*</li>*/}
          <li>
            <Link className="btn btn-secondary btn-sm" to={"/aanbod"}>
              Aanbod
            </Link>
          </li>
          {/*<li>*/}
          {/*	<details>*/}
          {/*		<summary>Huizen</summary>*/}
          {/*		<ul className={`p-2  ${inverted ? "bg-base-100/20" :"bg-mocha-700"} ${inverted ? "text-white" :"text-mocha-50"}`}>*/}
          {/*			<li><a>Verkocht</a></li>*/}
          {/*			<li><a>Aangekocht</a></li>*/}
          {/*			<li><a>Verhuur</a></li>*/}
          {/*		</ul>*/}
          {/*	</details>*/}
          {/*</li>*/}
        </ul>
      </div>
      <div className="navbar-end">
        <a href="tel:+31(0)622691573" className="btn btn-primary ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
          >
            <g clipPath="url(#a)">
              <path
                fill="currentColor"
                d="M17 1.01 7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99ZM17 19H7V5h10v14Z"
              />
            </g>
          </svg>
          0622 691573
        </a>
      </div>
    </div>
  );
};
