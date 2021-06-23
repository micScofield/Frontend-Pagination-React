import React, { useState, useEffect } from 'react'

import Posts from './components/Posts'
import Pagination from './components/Pagination'
import axios from 'axios'

const POSTS_PER_PAGE = 8

const App = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasNext, setHasNext] = useState()
    const [hasPrev, setHasPrev] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            console.log('making request')
            setLoading(true)
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
            setPosts(res.data)
            setLoading(false)
            // currentPage * POSTS_PER_PAGE < res.data.length && setHasNext(true)
            POSTS_PER_PAGE < res.data.length && setHasNext(true)
            console.log(res.data.length)
        }

        fetchPosts()
    }, [])

    // Get current posts to render
    const indexOfLastPost = currentPage * POSTS_PER_PAGE
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    // Figure out max page
    const maxPage = Math.ceil(posts.length / POSTS_PER_PAGE)

    // Change page number
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)

        if (pageNumber === 1) {
            setHasPrev(false)
        } else setHasPrev(true)

        if (pageNumber * POSTS_PER_PAGE >= posts.length) {
            setHasNext(false)
        } else setHasNext(true)
    }

    const gotoPage = (goToPageNumber) => {
        if (goToPageNumber) {
            // check if exceeding max page count
            if (+goToPageNumber > +maxPage) {
                paginate(maxPage)
            } else {
                paginate(goToPageNumber)
            }
        } else {
            paginate(1)
        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-primary mb-3'>My Blog</h1>

            <Posts posts={currentPosts} loading={loading} />

            <Pagination
                // POSTS_PER_PAGE={POSTS_PER_PAGE}
                // totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
                hasNext={hasNext}
                hasPrev={hasPrev}
                gotoPage={gotoPage}
                maxPage={maxPage}
            />
        </div>
    )
}

export default App
