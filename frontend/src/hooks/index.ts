import { useEffect, useState } from "react";
import { Blog, getBlogById, getBlogs } from "../api/services/blog.service";

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        getBlogById(id)
            .then(response => {
                setBlog(response);
            })
            .catch(() => {
                setBlog(undefined);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        getBlogs()
            .then(response => {
                setBlogs(response);
            })
            .catch(() => {
                setBlogs([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])


    return {
        loading,
        blogs
    }
}
