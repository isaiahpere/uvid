import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
// import {verifyWebHook} from "@clerk/nextjs/webhooks"; //only works in newer version of clerk

export async function POST(req: Request) {
  const SIGNING_SECRETE = process.env.CLERK_SIGNING_SECRET;
  if (!SIGNING_SECRETE) {
    return new Response("Clerk signing secret is not set", { status: 500 });
  }

  // create new svix webhook instance
  const wh = new Webhook(SIGNING_SECRETE);

  // get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("ERROR: Missing Svix Headers", { status: 400 });
  }

  // get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // verify the webhook
  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("ERROR: Failed to verify webhook", error);
    return new Response("ERROR: Failed to verify webhook", { status: 400 });
  }

  // do something with webhook payload
  const eventType = evt.type;

  // CREATING USER
  if (eventType === "user.created") {
    const { data } = evt; // inside user eventType makes sure the data is user related
    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });

    console.log("EVT:");
    console.log(evt);
    console.log("ID: ", data.id);
    console.log("Event Type: ", eventType);
  }

  // DELETING USER
  if (eventType === "user.deleted") {
    const { data } = evt; // inside user eventType makes sure the data is user related
    if (!data.id)
      return new Response(
        "Missing Webhook ID - Failed to delete user from DB",
        { status: 400 }
      );

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  // UPDATING USER
  if (eventType === "user.updated") {
    const { data } = evt; // inside user eventType makes sure the data is user related

    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));

    console.log("EVT:");
  }

  // return success response - if no return proceeding hooks will fail
  return new Response("Webhook received sucessfully and verified", {
    status: 200,
  });
}
