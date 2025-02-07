import { Link } from "react-router";

export const Navbar = ({ inverted }: { inverted: boolean }) => {
  return (
    <div
      className={`navbar fixed z-30 px-4  shadow-2xl ${
        inverted ? "" : " bg-base-200 "
      } `}
    >
      <Link to={"/"} className="btn btn-ghost text-xl p-0">
        <img src="/logo.png" alt="logo" className="max-w-[45px] h-auto" />
      </Link>
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
          >
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
              <Link to={"/makelaardij"}>Makelaardij</Link>
            </li>
            <li>
              <Link to={"/mediation"}>Mediation</Link>
            </li>
            <li>
              <Link to={"/huizen"}>Huizen</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul
          className={`menu menu-horizontal px-1 text-md  gap-2 ${
            inverted ? "text-white" : "text-mocha-50"
          }`}
        >
          <li>
            <Link
              className={`btn  btn-outline font-normal  border-0 ${
                inverted ? "text-white" : " text-mocha-900"
              } `}
              to={"/makelaardij"}
            >
              Makelaardij
            </Link>
          </li>
          <li>
            <Link
              className={`btn  btn-outline font-normal border-0 " ${
                inverted ? "text-white" : " text-mocha-900"
              } `}
              to={"/mediation"}
            >
              Mediation
            </Link>
          </li>

          <li>
            <Link
              className={`btn  btn-outline font-normal  border-0 ${
                inverted ? "text-white" : " text-mocha-900"
              } `}
              to={"/huizen"}
            >
              Huizen
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          href="tel:+31(0)622691573"
          className={`btn  btn-outline font-normal border-0 " ${
            inverted ? "text-white" : " text-mocha-900"
          } `}
        >
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
