import Link from "next/link";

interface FormProps {
    type: string;
    post: {
        prompt: string;
        tag: string;
    };
    setPost: React.Dispatch<
        React.SetStateAction<{
            prompt: string;
            tag: string;
        }>
    >;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = (props: FormProps) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{props.type} Post</span>
            </h1>
            <p className="desc text_left max-w-md">
                {props.type} and share AI-powered prompts with anyone.
            </p>
            <form
                onSubmit={props.handleSubmit}
                className="mt-10 w-full max-2-2xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>
                    <textarea
                        value={props.post.prompt}
                        onChange={(e) =>
                            props.setPost({
                                ...props.post,
                                prompt: e.target.value,
                            })
                        }
                        placeholder="Write your prompt here..."
                        required
                        className="form_textarea"
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag (#code, #productivity, #writing, etc.)
                    </span>
                    <input
                        value={props.post.tag}
                        onChange={(e) =>
                            props.setPost({
                                ...props.post,
                                tag: e.target.value,
                            })
                        }
                        placeholder="tag"
                        required
                        className="form_input"
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={props.submitting}
                        className="px-4 py-1.5 text-sm rounded-lg bg-blue-500 text-white font-semibold"
                    >
                        {props.submitting
                            ? `${props.type}...`
                            : `${props.type}`}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
