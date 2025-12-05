import React, { useEffect, useState } from "react";

export default function AboutPage(){
  const [block, setBlock] = useState(null);

  useEffect(() => {
    fetch("/api/content/about/")      
      .then(res => res.json())
      .then(data => setBlock(data))
      .catch(err => console.error(err));
  }, []);

  if (!block) return <div>Loading...</div>;

  return (
    <div>
      <h1>{block.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: block.content }} />
    </div>
  );
}
