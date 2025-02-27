import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p className="text-rose-500">Hello World</p>
      <Image src={"/logo.svg"} width={50} height={50} alt="uvid logo" />
      <Button variant={"destructive"}>Click Me</Button>
      <p className="text-xl font-semibold tracking-tight">Uvid</p>
    </div>
  );
}
