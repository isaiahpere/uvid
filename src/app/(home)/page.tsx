import Image from "next/image";

export default function Home() {
  console.log("Where am I rendered?");
  return (
    <div>
      <p className="text-rose-500">Hello World</p>
      <Image src={"/logo.svg"} width={50} height={50} alt="uvid logo" />
      <p className="text-xl font-semibold tracking-tight">Home Page</p>
    </div>
  );
}
