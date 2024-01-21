export default interface Post {
    _id: string;
    prompt: string;
    tag: string;
    creator: { image: string; username: string; email: string };
};