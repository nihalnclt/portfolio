import NewsLetter from "@/components/NewsLetter";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <div className="flex items-center gap-4">
        <div className="size-16 bg-gray-500 rounded-full overflow-hidden">
          <Image
            src="/images/profile.jpg"
            alt="Nihal N"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-[#e5e5e5]">Nihal N</h1>
          <span>Software Developer | Indiehacker</span>
        </div>
      </div>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio voluptates tempore nostrum
        assumenda obcaecati corporis repellendus eum. Quod rem molestias, sunt voluptas qui ratione
        dolor ducimus cumque, optio minima provident.
      </p>

      <NewsLetter />
    </div>
  );
}
