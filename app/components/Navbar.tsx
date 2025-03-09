import { useState, useCallback } from "react";
import { Link, NavLink } from "react-router";

/**
 * Navigation bar component that adapts to light/dark mode
 * @param {Object} props - Component props
 * @param {boolean} props.inverted - Whether to display in inverted (dark) mode
 * @returns {JSX.Element} Responsive navigation bar
 */
export const Navbar = ({ inverted }: { inverted: boolean }) => {
  // Function to close dropdown menu when an item is clicked
  const handleMenuCloseClick = useCallback(() => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  }, []);

  // Common NavLink styling logic to reduce duplication
  const getNavLinkClassName = useCallback(
    ({ isActive, isPending }) => {
      return `btn btn-outline border-0 ${
        inverted ? "text-white hover:text-mocha-900" : "text-mocha-900"
      } ${isPending ? "pending" : isActive ? "font-extrabold" : "font-normal"}`;
    },
    [inverted]
  );

  return (
    <div
      className={`navbar fixed z-30 px-4 shadow-2xl ${
        inverted ? "bg-black/30" : "bg-base-100"
      }`}
    >
      {/* Logo/Home button */}
      <Link to={"/"} className="btn btn-ghost text-xl p-0">
        <img src="/logo.png" alt="logo" className="max-w-[45px] h-auto" />
      </Link>

      {/* Mobile navigation */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost lg:hidden ${
              inverted ? "text-white" : ""
            }`}
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-sm"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/makelaardij"}>Makelaardij</Link>
            </li>
            <li>
              <a className="pointer-events-none">Mediation</a>
              <ul className="p-2">
                <li>
                  <Link to={"/vastgoed-mediation"}>Vastgoed Mediation</Link>
                </li>
                <li>
                  <Link to={"/mediation"}>Mediation diensten</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/huizen"}>Huizen</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul
          className={`menu menu-horizontal px-1 text-md gap-2 ${
            inverted ? "text-white" : "text-mocha-50"
          }`}
        >
          <li>
            <NavLink className={getNavLinkClassName} to={"/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClassName} to={"/makelaardij"}>
              Makelaardij
            </NavLink>
          </li>

          {/* Dropdown menu for Mediation */}
          <li className="dropdown">
            <label
              tabIndex={0}
              className={`btn btn-outline leading-8 border-0 ${
                inverted ? "text-white hover:text-mocha-900" : "text-mocha-900"
              }`}
            >
              Mediation
            </label>
            <ul
              tabIndex={0}
              className={`dropdown-content menu p-2 shadow rounded-box w-52 ${
                inverted ? "bg-black" : "bg-base-100"
              }`}
            >
              <li>
                <NavLink
                  className={getNavLinkClassName}
                  to={"/vastgoed-mediation"}
                  onClick={handleMenuCloseClick}
                >
                  Vastgoed mediation
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={getNavLinkClassName}
                  to={"/mediation"}
                  onClick={handleMenuCloseClick}
                >
                  Mediation diensten
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink className={getNavLinkClassName} to={"/huizen"}>
              Huizen
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Contact button */}
      <div className="navbar-end">
        <a
          href="tel:+31622691573"
          className={`btn btn-outline font-normal border-0 ${
            inverted ? "text-white" : "text-mocha-900"
          }`}
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
