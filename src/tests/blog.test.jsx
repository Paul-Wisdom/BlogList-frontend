import { describe, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe('Blog componenet', () => {
    test('renders only blog title and author by default', async () => {
        const blog = {
            author: "Paul Wisdom",
            title: "Passion is born through endeavour",
            url: "https://tired.com",
            userId: {
                name: "Paul-Wisdom"
            }
        };
        const setUser = vi.fn()
        const setBlogs = vi.fn()
        const likeBlog = vi.fn()
        const deleteBlog = vi.fn()
        const blogs = []

        render(<Blog blog={blog} blogs={blogs} setUser={setUser} setBlogs={setBlogs} likeBlog={likeBlog} deleteBlog={deleteBlog}/>)

        const author = screen.getByText(blog.author)
        const title = screen.getByText(blog.title)
        const toggleContent = screen.getByTestId('togglableContent')

        expect(author).not.toHaveStyle('display: none')
        expect(title).not.toHaveStyle('display: none')
        expect(toggleContent).toHaveStyle('display: none')
    })

    test('renders blog title, author, url and likes when view button is clicked', async () => {
        const blog = {
            author: "Paul Wisdom",
            title: "Passion is born through endeavour",
            url: "https://tired.com",
            userId: {
                name: "Paul-Wisdom"
            }
        };
        const setUser = vi.fn()
        const setBlogs = vi.fn()
        const likeBlog = vi.fn()
        const deleteBlog = vi.fn()
        const blogs = []

        render(<Blog blog={blog} blogs={blogs} setUser={setUser} setBlogs={setBlogs} likeBlog={likeBlog} deleteBlog={deleteBlog}/>)
        const button = screen.getByText('view');
        const user = userEvent.setup()
        await user.click(button)

        const author = screen.getByText(blog.author)
        const title = screen.getByText(blog.title)
        const toggleContent = screen.getByTestId('togglableContent')
        
        expect(author).not.toHaveStyle('display: none')
        expect(title).not.toHaveStyle('display: none')
        expect(toggleContent).not.toHaveStyle('display: none')
    })

    test('calls like event handler twice if the like button is clicke twice', async () => {
        const blog = {
            author: "Paul Wisdom",
            title: "Passion is born through endeavour",
            url: "https://tired.com",
            userId: {
                name: "Paul-Wisdom"
            }
        };
        const setUser = vi.fn()
        const setBlogs = vi.fn()
        const likeBlog = vi.fn()
        const deleteBlog = vi.fn()
        const blogs = []

        render(<Blog blog={blog} blogs={blogs} setUser={setUser} setBlogs={setBlogs} likeBlog={likeBlog} deleteBlog={deleteBlog}/>)
        const button = screen.getByText('view');
        const user = userEvent.setup()
        await user.click(button)

        const author = screen.getByText(blog.author)
        const title = screen.getByText(blog.title)
        const toggleContent = screen.getByTestId('togglableContent')

        const likeButton = screen.getByText('like');
        await user.click(likeButton);
        await user.click(likeButton)
        
        expect(author).not.toHaveStyle('display: none')
        expect(title).not.toHaveStyle('display: none')
        expect(toggleContent).not.toHaveStyle('display: none')
        expect(likeBlog).toHaveBeenCalledTimes(2)
    })
})