"use client";

import React, { useState, useEffect } from "react";
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
    const [posts, setPosts] = useState<Post[]>([]);

    // search states
    const [searchText, setSearchText] = useState<string>("");
    const [searchedResults, setSearchedResults] = useState<Post[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<
        NodeJS.Timeout | undefined
    >();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPosts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tag: string) => {
        setSearchText(tag);
        const searchResult = filterPosts(tag);
        setSearchedResults(searchResult);
    };

    const filterPosts = (text: string) => {
        return posts.filter(
            (post: Post) =>
                post.prompt.includes(text) ||
                post.tag.includes(text) ||
                post.creator.username.includes(text)
        );
    };

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
            <form
                className="relateive w-full flex-center"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    placeholder="Search for prompts, usernames or tags"
                    className="search_input"
                />
            </form>
            <button type="button" value={searchText} />
            <PromptCardList
                posts={searchText ? searchedResults : posts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
};

export default Feed;
