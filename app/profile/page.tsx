"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Post from "@/types/post";
import Profile from "@/components/Profile";

const ProfilePage = () => {
    const { data: session } = useSession()
    const router = useRouter();
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
    
    const handleEdit = async (post: Post) => {
        // router.push(`/edit?id=${post._id}`)
    };
    const handleDelete = (post: Post) => {
        // router.push(`/delete?id=${post._id}`)
    };

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
