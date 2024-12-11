import { Link } from "react-router";

export default function Styleguide() {
  return (
    <>
      <header className="flex justify-between mt-6">
        <h1 className="text-4xl font-bold">Styleguide</h1>
        <Link
          to="https://daisyui.com/docs/install/"
          className="btn btn-outline btn-primary ml-auto mr-4"
        >
          Daisy UI
        </Link>
        <Link
          to="https://tailwindcss.com/docs/installation"
          className="btn btn-primary  mr-4"
        >
          Tailwind
        </Link>
        <Link to="https://remix.run/docs/en/main" className="btn btn-secondary">
          Remix.run
        </Link>
      </header>
      <div className="card ">
        <div className="card-body">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4 mb-4">
              <div>
                <h1 className="text-5xl font-bold "> H1 bold</h1>
                <h1 className="text-5xl font-semibold	 ">H1 semi bold</h1>
                <h1 className="text-5xl font-medium ">H1 font-medium</h1>
                <h1 className="text-5xl font-normal">H1 Regular</h1>
                <p>44px / 55px </p>
                <code>text-5xl</code>
              </div>
              <div>
                <h2 className="text-4xl font-bold "> H2 bold</h2>
                <h2 className="text-4xl font-semibold">H2 semi bold</h2>
                <h2 className="text-4xl font-medium ">H2 font-medium</h2>
                <h2 className="text-4xl font-normal">H2 Regular</h2>
                <p>36px / 45px</p>
                <code>text-4xl</code>
              </div>
              <div>
                <h3 className="text-3xl font-bold "> H3 bold</h3>
                <h3 className="text-3xl font-semibold">H3 semi bold</h3>
                <h3 className="text-3xl font-medium ">H3 font-medium</h3>
                <h3 className="text-3xl font-normal">H3 Regular</h3>
                <p>28px / 35px</p>
                <code>text-3xl</code>
              </div>
              <div>
                <h4 className="text-2xl font-bold "> H4 bold</h4>
                <h4 className="text-2xl font-semibold">H4 semi bold</h4>
                <h4 className="text-2xl font-medium ">H4 font-medium</h4>
                <h4 className="text-2xl font-normal">H4 Regular</h4>
                <p>28px / 35px</p>
                <code>text-2xl</code>
              </div>{" "}
              <div>
                <h5 className="text-xl font-bold "> H5 bold</h5>
                <h5 className="text-xl font-semibold">H5 semi bold</h5>
                <h5 className="text-xl font-medium ">H5 font-medium</h5>
                <h5 className="text-xl font-normal">H5 Regular</h5>
                <p>20px / 26px</p>
                <code>text-xl</code>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div>
                <p className="text-base font-bold ">18 bold</p>
                <p className="text-base font-semibold">18 semi bold</p>
                <p className="text-base font-medium ">18 font-medium</p>
                <p className="text-base font-normal">18 Regular</p>
                <p>18px / 24px</p>
                <code>text-base</code>
              </div>
              <div>
                <h2 className="text-sm font-bold ">16 bold</h2>
                <h2 className="text-sm font-semibold">16 semi bold</h2>
                <h2 className="text-sm font-medium ">16 font-medium</h2>
                <h2 className="text-sm font-normal">16 Regular</h2>
                <p>16px / 24pxx</p>
                <code>text-sm</code>
              </div>
              <div>
                <h3 className="text-xs font-bold ">14 bold</h3>
                <h3 className="text-xs font-semibold">14 semi bold</h3>
                <h3 className="text-xs font-medium ">14 font-medium</h3>
                <h3 className="text-xs font-normal">14 Regular</h3>
                <p>14px / 22px</p>
                <code>text-xs</code>
              </div>
            </div>
            {/*buttons*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <button className="btn">Default</button>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-accent">Accent</button>
              <button className="btn btn-info">Info</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-error">Error</button>
            </div>
            <h2 className="text-2xl">Large buttons</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
              <button className="btn btn-primary btn-lg">primary large</button>
              <button className="btn btn-secondary btn-lg">
                secondary large
              </button>
              <button className="btn btn-default btn-lg">default large</button>
            </div>
            <h2 className="text-2xl">Small buttons</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
              <button className="btn btn-primary btn-sm">primary small</button>
              <button className="btn btn-secondary btn-sm">
                secondary small
              </button>
              <button className="btn btn-default btn-sm">default small</button>
            </div>
            <h2 className="text-2xl">Outline buttons</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <button className="btn btn-outline">Default</button>
              <button className="btn btn-primary btn-outline">Primary</button>
              <button className="btn btn-secondary btn-outline">
                Secondary
              </button>
              <button className="btn btn-accent btn-outline">Accent</button>
              <button className="btn btn-info btn-outline">Info</button>
              <button className="btn btn-success btn-outline">Success</button>
              <button className="btn btn-warning btn-outline">Warning</button>
              <button className="btn btn-error btn-outline">Error</button>
            </div>

            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4">
              <span className="badge">Default</span>
              <span className="badge badge-primary">Primary</span>{" "}
              <span className="badge badge-secondary">Secondary</span>
              <span className="badge badge-accent">Accent</span>{" "}
              <span className="badge badge-info">Info</span>{" "}
              <span className="badge badge-success">Success</span>{" "}
              <span className="badge badge-warning">Warning</span>{" "}
              <span className="badge badge-error">Error</span>
            </div>
            {/*tab*/}
            <div className="p-4 tabs">
              <button className="tab tab-lifted">Tab 1</button>
              <button className="tab tab-lifted tab-active">Tab 2</button>
              <button className="tab tab-lifted">Tab 3</button>
            </div>

            {/*toggle*/}
            <div className="p-4">
              <input type="checkbox" className="toggle toggle-primary" />
              <input type="checkbox" className="toggle toggle-secondary" />
              <input type="checkbox" className="toggle toggle-accent" />
            </div>

            {/*card*/}
            <div className="card shadow-2xl w-80 m-4">
              <figure>
                <img src="https://picsum.photos/id/1005/500/250" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">DaisyUI Card</h2>
                <p>
                  Rerum reiciendis beatae tenetur excepturi aut pariatur est
                  eos. Sit sit necessitatibus.
                </p>
              </div>
            </div>

            {/*dropdown*/}
            <div className="dropdown">
              <label tabIndex={0} className="btn m-1">
                Dropdown
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>

            {/*modal button*/}
            <label htmlFor="my-modal" className="btn modal-button">
              Modal
            </label>
            {/*modal content*/}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <p>
                  Enim dolorem dolorum omnis atque necessitatibus. Consequatur
                  aut adipisci qui iusto illo eaque. Consequatur repudiandae et.
                  Nulla ea quasi eligendi. Saepe velit autem minima.
                </p>
                <div className="modal-action">
                  <label htmlFor="my-modal" className="btn">
                    Close
                  </label>
                </div>
              </div>
            </div>

            {/*steps*/}
            <ul className="steps my-4 w-full">
              <li className="step step-primary">Register</li>
              <li className="step step-primary">Choose plan</li>
              <li className="step">Purchase</li>
              <li className="step">Receive Product</li>
            </ul>

            {/*avatar*/}
            <div className="avatar online m-10">
              <div className="rounded-full w-24 h-24">
                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
              </div>
            </div>
            <div className="avatar offline m-10">
              <div className="rounded-full w-24 h-24">
                <img src="http://daisyui.com/tailwind-css-component-profile-2@94w.png" />
              </div>
            </div>

            <div className="rounded-box  border-base-content/5 text-base-content not-prose grid gap-3 border p-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="md:w-1/2">
                    <div className="tabs">
                      <button className="tab tab-lifted">Tab</button>
                      <button className="tab tab-lifted tab-active">Tab</button>
                      <button className="tab tab-lifted">Tab</button>
                    </div>
                    <div className="flex flex-col">
                      <span className="link">I'm a simple link</span>{" "}
                      <span className="link link-primary">
                        I'm a simple link
                      </span>{" "}
                      <span className="link link-secondary">
                        I'm a simple link
                      </span>
                      <span className="link link-accent">
                        I'm a simple link
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 md:w-1/2">
                    <progress value="20" max="100" className="progress">
                      Default
                    </progress>
                    <progress
                      value="25"
                      max="100"
                      className="progress progress-primary"
                    >
                      Primary
                    </progress>
                    <progress
                      value="30"
                      max="100"
                      className="progress progress-secondary"
                    >
                      Secondary
                    </progress>
                    <progress
                      value="40"
                      max="100"
                      className="progress progress-accent"
                    >
                      Accent
                    </progress>
                    <progress
                      value="45"
                      max="100"
                      className="progress progress-info"
                    >
                      Info
                    </progress>
                    <progress
                      value="55"
                      max="100"
                      className="progress progress-success"
                    >
                      Success
                    </progress>
                    <progress
                      value="70"
                      max="100"
                      className="progress progressWarning"
                    >
                      Warning
                    </progress>
                    <progress
                      value="90"
                      max="100"
                      className="progress progress-error"
                    >
                      Error
                    </progress>
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="stats bg-base-300 border-base-300 border md:w-1/2">
                    <div className="stat">
                      <div className="stat-title">Total Page Views</div>
                      <div className="stat-value">89,400</div>
                      <div className="stat-desc">21% more than last month</div>
                    </div>
                  </div>
                  <div className="flex flexWrap items-center justify-center gap-3 md:w-1/2">
                    <div className="radial-progress">60%</div>
                    <div className="radial-progress">75%</div>
                    <div className="radial-progress">90%</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="md:w-1/2">
                    <div>
                      <input type="checkbox" className="toggle" />{" "}
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                      />{" "}
                      <input
                        type="checkbox"
                        className="toggle toggle-secondary"
                      />{" "}
                      <input type="checkbox" className="toggle toggle-accent" />
                    </div>
                    <div>
                      <input type="checkbox" className="checkbox" />{" "}
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                      <input
                        type="checkbox"
                        className="checkbox checkbox-secondary"
                      />{" "}
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent"
                      />
                    </div>
                    <div>
                      <input type="radio" name="radio-1" className="radio" />{" "}
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio radio-primary"
                      />
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio radio-secondary"
                      />{" "}
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio radio-accent"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="range range-xs"
                    />{" "}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="range range-xs range-primary"
                    />{" "}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="range range-xs range-secondary"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="range range-xs range-accent"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="flex flex-col gap-3 md:w-1/2">
                    <input
                      type="text"
                      placeholder="Default"
                      className="input input-bordered w-full"
                    />{" "}
                    <input
                      type="text"
                      placeholder="Primary"
                      className="input input-primary input-bordered w-full"
                    />{" "}
                    <input
                      type="text"
                      placeholder="Secondary"
                      className="input input-secondary input-bordered w-full"
                    />
                    <input
                      type="text"
                      placeholder="Accent"
                      className="input input-accent input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:w-1/2">
                    <input
                      type="text"
                      placeholder="Info"
                      className="input input-info input-bordered w-full"
                    />
                    <input
                      type="text"
                      placeholder="Success"
                      className="input input-success input-bordered w-full"
                    />
                    <input
                      type="text"
                      placeholder="Warning"
                      className="input inputWarning input-bordered w-full"
                    />
                    <input
                      type="text"
                      placeholder="Error"
                      className="input input-error input-bordered w-full"
                    />
                  </div>
                </div>
                <div className="navbar bg-neutral text-neutral-content rounded-box">
                  <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1">
                    <button className="btn btn-ghost text-xl normal-case">
                      daisyUI
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-grow flex-col gap-3">
                    <div className="text-4xl font-bold">Text Size 1</div>
                    <div className="text-3xl font-bold">Text Size 2</div>
                    <div className="text-2xl font-bold">Text Size 3</div>
                    <div className="text-xl font-bold">Text Size 4</div>
                    <div className="text-lg font-bold">Text Size 5</div>
                    <div className="text-sm font-bold">Text Size 6</div>
                    <div className="text-xs font-bold">Text Size 7</div>
                  </div>
                  <ul className="steps steps-vertical">
                    <li className="step step-primary">Step 1</li>
                    <li className="step step-primary">Step 2</li>
                    <li className="step">Step 3</li>
                    <li className="step">Step 4</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="alert">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-info h-6 w-6 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>12 unread messages. Tap to see.</span>
                  </div>
                </div>
                <div className="alert alert-info">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 flex-shrink-0 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>New software update available.</span>
                  </div>
                </div>
                <div className="alert alert-success">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 flex-shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>Your purchase has been confirmed!</span>
                  </div>
                </div>
                <div className="alert alertWarning">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 flex-shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      ></path>
                    </svg>
                    <span>Warning: Invalid email address!</span>
                  </div>
                </div>
                <div className="alert alert-error">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 flex-shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>Error! Task failed successfully.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 p-4">
              <div className="dropdown">
                <div>
                  <div className="grid w-full grid-cols-2 gap-4">
                    <button className="btn btn-block">Neutral</button>
                    <button className="btn btn-primary btn-block">
                      primary
                    </button>
                    <button className="btn btn-secondary btn-block">
                      secondary
                    </button>
                    <button className="btn btn-accent btn-block">accent</button>
                    <button className="btn btn-info btn-block">info</button>
                    <button className="btn btn-success btn-block">
                      success
                    </button>
                  </div>
                </div>
                <div className="dropdown-content py-2">
                  <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72border border-gray-100">
                    <div className="card-body">
                      <h2 className="card-title font-extrabold capitalize">
                        button component
                      </h2>{" "}
                      <p className="text-neutral-content text-sm text-opacity-80">
                        Buttons come in various shapes, colors and sizes
                      </p>
                      <div className="mt-4 flex justify-end">
                        <a
                          href="/components/button"
                          className="btn btn-primary btn-sm xl:btn-md"
                        >
                          See component
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-top">
                <div>
                  <div className="grid w-full grid-cols-2 gap-4">
                    <button className="btn btnWarning btn-block">
                      warning
                    </button>
                    <button className="btn btn-error btn-block">error</button>
                    <button className="btn btn-outline btn-block">
                      outline
                    </button>
                    <button className="btn btn-outline btn-primary btn-block">
                      primary
                    </button>
                    <button className="btn btn-outline btn-secondary btn-block">
                      secondary
                    </button>
                    <button className="btn btn-outline btn-accent btn-block">
                      accent
                    </button>
                    <button className="btn btn-ghost btn-block">ghost</button>
                    <button className="btn btn-link btn-block">link</button>
                  </div>
                </div>
                <div className="dropdown-content py-2">
                  <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 border border-gray-100">
                    <div className="card-body">
                      <h2 className="card-title font-extrabold capitalize">
                        button component
                      </h2>{" "}
                      <p className="text-neutral-content text-sm text-opacity-80">
                        Buttons come in various shapes, colors and sizes
                      </p>
                      <div className="mt-4 flex justify-end">
                        <a
                          href="/components/button"
                          className="btn btn-primary btn-sm xl:btn-md"
                        >
                          See component
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="textWhite bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Default
            </button>
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 focus:outline-none bgWhite rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:textWhite dark:hover:bg-gray-700"
            >
              Alternative
            </button>
            <button
              type="button"
              className="textWhite bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Dark
            </button>
            <button
              type="button"
              className="text-gray-900 dark:text-gray-300 bgWhite border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:textWhite dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Light
            </button>
            <button
              type="button"
              className="focus:outline-none textWhite bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Green
            </button>
            <button
              type="button"
              className="focus:outline-none textWhite bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Red
            </button>
            <button
              type="button"
              className="focus:outline-none textWhite bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
            >
              Yellow
            </button>
            <button
              type="button"
              className="focus:outline-none textWhite bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Purple
            </button>
            <a href="/markdown-page" className="p-4 underline">
              Markdown is also supported...
            </a>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://remix.run/tutorials/blog"
                  rel="noreferrer"
                >
                  15m Quickstart Blog Tutorial
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://remix.run/tutorials/jokes"
                  rel="noreferrer"
                >
                  Deep Dive Jokes App Tutorial
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://remix.run/docs"
                  rel="noreferrer"
                >
                  Remix Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
