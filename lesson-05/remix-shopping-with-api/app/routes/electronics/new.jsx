import { Form, redirect, useActionData, json  } from "remix";
import { Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/electronics/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const image = form.get("image");
  const uuid = new Date().getTime().toString(16);

  const errors = {};
  if (!title) errors.title = "title required";
  if (!description) errors.description = true;
  if (!image) errors.image = true;

  if (Object.keys(errors).length) {
    const values = Object.fromEntries(form);
    return json({ errors, values });
  }


  const uuid = new Date().getTime().toString(16);
  // TODO: Make a POST request via fetch to an API route that receives JSON data
  // and creates the product in the db
  await fetch("http://localhost:3000/api/electronics/", {
    method: "POST",
    body: JSON.stringify({ title, description, image, id: uuid }),
    body: JSON.stringify({ title, description, id: uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect(`/electronics/${uuid}`);
};


export default function NewProduct() {
  const actionData = useActionData();
export default function NewProduct() {
  return (
    <>
      <Breadcrumb links={[{ to: "/eletronics", title: "Electronics" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <Form reloadDocument method="post" className="w-64">
          <Label required htmlFor="title">Title</Label>
        <form method="post" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-1 border-gray-200 w-full"
            defaultValue={actionData?.values.title}
          />
                {actionData?.errors.title ? (
        <p style={{ color: "red" }}>
          {actionData.errors.title}
        </p>
      ) : null}
          />
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"
            defaultValue={actionData?.values.description}
          ></textarea>
                {actionData?.errors.description ? (
        <p style={{ color: "red" }}>
          {actionData.errors.description}
        </p>
      ) : null}
          <Label htmlFor='image'>image link</Label>
          <input
            type='text'
            name='image'
            id='image'
            defaultValue={actionData?.values.image}
          ></input>
                {actionData?.errors.image ? (
        <p style={{ color: "red" }}>
          {actionData.errors.image}
        </p>
      ) : null}
          <div className="mt-3">
            <Button type="submit">Add product</Button>
          </div>
        </Form>
          ></textarea>
          <div className="mt-3">
            <Button type="submit">Add product</Button>
          </div>
        </form>
      </div>
    </>
  );
}

function Label({ children, ...rest }) {
  return (
    <label className="block font-semibold mt-3 mb-1" {...rest}>
      {children}
    </label>
  );
}