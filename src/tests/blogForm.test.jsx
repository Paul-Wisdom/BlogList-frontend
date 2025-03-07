import { describe, test, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import BlogForm from "../components/BlogForm";
import userEvent from "@testing-library/user-event";

describe('blogform', () => {
    test('creates form', async () => {
        const blog = {
            data: { title: 'Test blog', author: 'Paul', url: 'https:tired.com' }
        }

        const msg = '';
        const msgType = ''
        const blogs = []
        const setMsg = vi.fn();
        const setMsgType = vi.fn();
        const createBlog = vi.fn().mockResolvedValue(blog);

        render(<BlogForm msg={msg} setMsg={setMsg} blogs={blogs} msgType={msgType} setMsgType={setMsgType} createBlog={createBlog} />)

        const titleInput = await screen.findByPlaceholderText('title');
        const urlInput = await screen.findByPlaceholderText('url');
        const authorInput = await screen.findByPlaceholderText('author')

        const user = userEvent.setup();
        await user.type(titleInput, blog.data.title);
        await user.type(authorInput, blog.data.author);
        await user.type(urlInput, blog.data.url)
        const button = screen.getByText('create')
        // screen.debug()
        await user.click(button)
        expect(createBlog).toHaveBeenCalledWith({author: blog.data.author, title: blog.data.title, url: blog.data.url})
    })
})