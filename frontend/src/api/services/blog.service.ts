import apiClient from "../client";

export interface Blog {
    content: string;
    title: string;
    id: number;
    author: {
        name: string;
    };
}

interface BlogResponse {
    post: Blog;
}

interface BlogsResponse {
    posts: Blog[];
}

interface CreateBlogInput {
    title: string;
    content: string;
}

interface CreateBlogResponse {
    id: number;
}

export const getBlogById = async (id: string) => {
    const { data } = await apiClient.get<BlogResponse>(`/api/v1/blog/${id}`);
    return data.post;
};

export const getBlogs = async () => {
    const { data } = await apiClient.get<BlogsResponse>("/api/v1/blog/bulk");
    return data.posts;
};

export const createBlog = async (payload: CreateBlogInput) => {
    const { data } = await apiClient.post<CreateBlogResponse>("/api/v1/blog", payload);
    return data;
};
