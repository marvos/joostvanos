import type { Route } from "./+types/huizen";
import { useFetch, useFetchRealWorks } from "~/utils/useFetch";
import type { Objecten } from "~/utils/object-types";
import {
  Form,
  Link,
  useSubmit,
  useLoaderData,
  useActionData,
  createCookieSessionStorage,
  redirect,
  type ClientLoaderFunctionArgs,
} from "react-router";
import { useEffect, useRef, useState } from "react";

// Additional type for the loader data
type LoaderData = {
  objecten?: Objecten;
  isAuthenticated: boolean;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin - Joost van Os Makelaardij & Mediation" },
    { name: "robots", content: "noindex, nofollow" },
    { name: "description", content: "Admin panel" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  // Check if user is authenticated via session
  const url = new URL(request.url);
  const isLogout = url.searchParams.get("logout") === "true";

  // Get current session
  const session = await getSession(request.headers.get("Cookie"));

  // Handle logout
  if (isLogout) {
    const newSession = await destroySession(session);
    return redirect("/admin", {
      headers: {
        "Set-Cookie": newSession,
      },
    });
  }

  // Check if user is authenticated
  const isAuthenticated = session.has("authenticated");

  return { isAuthenticated };
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const isAuthenticated = await serverLoader();
  // Only fetch data if authenticated
  let huizen: Objecten | undefined;
  if (isAuthenticated) {
    huizen = await useFetchRealWorks({
      url: `https://api.realworks.nl/wonen/v3/objecten?actief=true&aantal=100`,
      method: "GET",
    });
  }
  return { objecten: huizen };
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();

  // Handle login form
  if (formData.has("username") && formData.has("password")) {
    const username = formData.get("username");
    const password = formData.get("password");

    // Validate credentials
    if (
      username === context.cloudflare.env.ADMIN_USERNAME &&
      password === context.cloudflare.env.ADMIN_PASSWORD
    ) {
      // Create a new session
      const session = await getSession();
      session.set("authenticated", true);

      // Return redirect with session cookie
      return redirect("/admin", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } else {
      // Return with error
      return { error: "Invalid credentials" };
    }
  }

  // Handle data submission form
  if (formData.has("realworksdata")) {
    let realworksdata = formData.get("realworksdata");

    await useFetch({
      request,
      context,
      url: `${context.cloudflare.env.API_JOOST}/kv/values/huizen`,
      method: "PUT",
      body: realworksdata,
    });
    return { success: true, message: "Data successfully updated" };
  }

  return { error: "Invalid form submission" };
}
// Hydration fallback component
function HydrationFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Laden van adminpanel...</p>
      </div>
    </div>
  );
}

export default function Admin() {
  const loaderData = useLoaderData<LoaderData>();
  const { isAuthenticated, objecten } = loaderData;
  const [message, setMessage] = useState<string | null>(null);

  let formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  const actionData = useActionData();

  // Show any error or success messages
  useEffect(() => {
    if (actionData?.error) {
      setMessage(actionData.error);
    } else if (actionData?.success) {
      setMessage(actionData.message);
      // Clear message after 3 seconds
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  // Auto-submit when authenticated
  useEffect(() => {
    if (isAuthenticated && formRef.current) {
      const timer = setTimeout(() => {
        // submit(formRef.current);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}

          <Form method="post" className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  // Admin dashboard if authenticated
  return (
    <>
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link
            to="/admin?logout=true"
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Submit Realworks Data</h2>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        <Form className="w-full" method="post" ref={formRef}>
          <textarea
            className="textarea bg-mocha-800 text-white w-full"
            cols={10}
            rows={20}
            name="realworksdata"
            defaultValue={JSON.stringify(objecten, null, 2)}
          />
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}

// Session utilities (you'll need to import these from Remix)
// These functions should be imported from @remix-run/cloudflare
async function getSession(cookie?: string) {
  return await sessionStorage.getSession(cookie);
}

async function commitSession(session) {
  return await sessionStorage.commitSession(session);
}

async function destroySession(session) {
  return await sessionStorage.destroySession(session);
}

// You would need to create this sessionStorage object
// This can be added to your entry.server.js file
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "joost_admin_session",
    // Normally these would be environment variables
    secrets: ["s3cr3t1"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});
