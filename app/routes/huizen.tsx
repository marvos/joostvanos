import type { Route } from "./+types/huizen";

import { useFetch, useFetchRealWorks } from '~/utils/useFetch';
import type { Objecten } from "~/utils/object-types";
import { Form, Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joost van Os Makelaardij & Mediation" },
    { name: "description", content: "Welcome to joostvanos.nl!" },
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const huizen: Objecten = await useFetchRealWorks({
    request,
    context,
    url: `${context.cloudflare.env.API_REALWORKS_URL}/wonen/v3/objecten?actief=true&aantal=100`,
    method: "GET",
  });

  return { objecten: huizen };
}
export async function action({
                               request,
                               context
                             }: Route.ActionArgs) {
  let formData = await request.formData();
  let  realworksdata= await formData.get("realworksdata");

  await useFetch({
    request,
    context,
    url: `${context.cloudflare.env.API_JOOST}/kv/values/huizen`,
    method: "PUT",
    body: realworksdata,
  });
  return realworksdata;
}

export default function Aanbod({ loaderData }: Route.ComponentProps) {
  // console.log(loaderData?.objecten);
  console.log(loaderData?.objecten);

  return (
    <>
      <h1 className="text-4xl m-auto py-14">Submit relaworks data</h1>
      <div className="flex gap-7 flex-wrap ">
        <Form className="w-full" method="post">
        <input className="textarea bg-mocha-800 text-white w-full"  cols={10} rows={20} name="realworksdata" defaultValue={JSON.stringify(loaderData?.objecten, null, 2)} />
        <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </div>
    </>
  );
}
