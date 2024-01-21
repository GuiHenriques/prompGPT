import Post from "@/types/post";
import PromptCard from "@/components/PromptCard";

interface ProfileProps {
    name: string;
    desc: string;
    posts: Post[];
    handleEdit: (post: Post) => void;
    handleDelete: (post: Post) => void;
}

const Profile = (props: ProfileProps) => {
    const handleEdit = (post: { prompt: string; tag: string }) => {};
    
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{props.name} Profile</span>
            </h1>
            <p className="desc text-left">{props.desc}</p>
            <div className='mt-10 prompt_layout'>
                {props.posts.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleEdit={() => props.handleEdit && props.handleEdit(post)}
                    handleDelete={() => props.handleDelete && props.handleDelete(post)}
                />
                ))}
            </div>
        </section>
    );
};

export default Profile;
