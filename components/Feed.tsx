"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Post from "@/types/post";

interface PromptCardListProps {
    posts: Post[];
    handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ posts, handleTagClick }: PromptCardListProps) => {
    return (
        <div className="mt-16 prompt_layout">
            {posts.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/prompt");
            const data = await res.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relateive w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for prompts, usernames or tags"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList posts={posts} handleTagClick={() => {}} />
        </section>
    );
};

export default Feed;
