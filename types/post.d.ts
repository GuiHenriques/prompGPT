export default interface Post {
    _id: string;
    prompt: string;
    tag: string;
    creator: { _id: string, image: string; username: string; email: string };
};