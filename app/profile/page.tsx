"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Profile from "@/components/Profile";

const ProfilePage = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/users/${session?.user.id}/posts`);
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);
    
    const handleEdit = () => {};
    const handleDelete = () => {};

    return (
        <Profile
            name="my"
            desc="Welcome to your profile page"
            posts={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default ProfilePage;
