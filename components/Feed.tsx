"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

type PromptCardListProps = {
    data: { prompt: string; tag: string }[];
    handleTagClick: () => void;
}
const PromptCarList = ({data, handleTagClick}: PromptCardListProps) => {
  
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt, index) => (<PromptCard key={index} />))}
    </div>
  )  
}

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
    const [prompts, setPrompts] = useState([{ prompt: "", tag: "" }]);
    
    useEffect(() => {
      const fetchPrompts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPrompts(data);
      }
      fetchPrompts()
    }, [])

    return (
        <section className="feed">
            <form className="relateive w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for prompts, usernames or tags"
                    value={searchText}
                    onChange={handleChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCarList data={prompts} handleTagClick={() => {}} />
        </section>
    );
};

export default Feed;
