export default function PostsPage() {
  return (
    <div className="container">
      <h1>Blog</h1>

      <div>
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index} className="flex items-center gap-4">
                <span>Cloudflare: Too Many Redirects Error when Proxying</span>
                <span className="block h-[1px] min-w-[2rem] bg-[#363636] flex-1"></span>
                <span>Apr 26, 2024</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
