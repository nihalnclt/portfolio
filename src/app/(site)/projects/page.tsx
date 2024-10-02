export default function ProjectsPage() {
  return (
    <div className="container">
      

      <h1>Projects</h1>
      <p className="text-[18px] leading-[1.75rem]">
        Over the years, I&#39;ve worked on a range of projects, some as hobbies, others as proofs of
        concept, and a few to address challenges I encountered myself. Here&#39;s a selection of the
        work I&#39;ve done
      </p>

      <div className="flex flex-col gap-4">
        {Array(4)
          .fill(0)
          .map((_, index) => {
            return <div className="bg-[#27272a] p-4" key={index}></div>;
          })}
      </div>
    </div>
  );
}
