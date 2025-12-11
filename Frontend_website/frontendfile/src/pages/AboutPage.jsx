import React, { useEffect, useState } from "react";

const styles = `
  .content h1 { font-size: 2.25rem; font-weight: 700; color: #1f2937; margin: 2rem 0 1.5rem 0; }
  .content h2 { font-size: 1.5rem; font-weight: 600; color: #374151; margin: 1.5rem 0 1rem 0; }
  .content h3 { font-size: 1.25rem; font-weight: 600; color: #4b5563; margin: 1.25rem 0 0.75rem 0; }
  .content p { color: #4b5563; margin: 1rem 0; line-height: 1.8; }
  .content a { color: #2563eb; text-decoration: none; }
  .content a:hover { text-decoration: underline; }
  .content ul, .content ol { margin: 1rem 0 1rem 2rem; }
  .content li { margin: 0.5rem 0; color: #4b5563; }
  .content strong { font-weight: 600; color: #1f2937; }
  .content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
  .content table th, .content table td { border: 1px solid #e5e7eb; padding: 0.75rem; text-align: left; }
  .content table th { background-color: #f3f4f6; font-weight: 600; }
`;
export default function ContactPage() {
  const [block, setBlock] = useState(null);

  useEffect(() => {
    fetch("/api/content/about/")      
      .then(res => res.json())
      .then(data => setBlock(data))
      .catch(err => console.error(err));
  }, []);

  if (!block) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <style>{styles}</style>
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-8 shadow-sm">
        <div className="content" dangerouslySetInnerHTML={{ __html: block.content }} />
      </div>
    </div>
  );
}
