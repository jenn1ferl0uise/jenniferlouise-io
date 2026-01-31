import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="text-center px-6 relative z-10">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Jennifer Louise
        </h1>
        <div className="flex justify-center my-4">
          <Button variant="outline">
            <a href="https://photos.jenniferlouise.io">PHOTOS</a>
          </Button>
        </div>
      </main>
    </div>
  );
}

export default Home;
