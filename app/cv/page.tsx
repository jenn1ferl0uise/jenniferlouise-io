import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV | Jennifer Louise",
  description: "Curriculum Vitae for Jennifer Louise, full stack web developer and freelance technologist.",
};

export default function CVPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Curriculum Vitae</h1>
      <p className="mb-4">Download my CV as a PDF or view the details below.</p>
      {/* You can add a download link or embed your CV here */}
      <a
        href="/cv/jennifer-louise-cv.pdf"
        className="underline text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download PDF
      </a>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p>
          I’m a full stack web developer with experience in React, Next.js, Node.js, PostgreSQL, and modern cloud infrastructure (Vercel, AWS). I love building beautiful, performant web apps and helping clients bring their ideas to life.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Skills</h2>
        <ul className="list-disc ml-6">
          <li>Frontend: React, Next.js, TypeScript, Tailwind CSS</li>
          <li>Backend: Node.js, Express, API design</li>
          <li>Database: PostgreSQL, Prisma</li>
          <li>DevOps: Vercel, AWS, CI/CD</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
        <p>Email: jl.lynch9@gmail.com</p>
      </div>
    </main>
  );
}
