import { useEffect, useState } from "react"
import axios from "axios"
import BlogCard from "../blog-card"
import { motion } from "framer-motion"




export default function Blogs() {
    const [blogData, setBlogData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.post("https://gql.hashnode.com", {
                    query: `
                    query Publication {
                        publication(host: "shreehari-06.hashnode.dev") {
                            isTeam
                            title
                            posts(first: 10) {
                                edges {
                                    node {
                                        title
                                        brief
                                        url
                                      	readTimeInMinutes
                                    }
                                }
                            }
                        }
                    }`
                })
                setBlogData(data.data.publication.posts.edges)
                setLoading(false)
            } catch (error) {
                setError("Oops! Something went wrong while fetching the blogs.")
                setLoading(false)
                console.error("Error fetching blogs:", error)
            }
        }

        fetchBlogs()
    }, [])

    if(loading) {
        return (
            <div className="flex justify-center items-center ">
                    <img src="/infinite-spinner.svg" className="w-1/4 md:w-1/12 md:h-1/12" alt="" />
            </div>
        )
    }
    if(error) {
        return (
            <div className="flex justify-center items-center w-full ">
                <p className="text-red-500 text-center w-2/3">{error}</p>
            </div>
        )
    }
    return (
        <motion.div 
            className={`grid ${blogData.length > 1 ? "md:grid-cols-3" : ""} md:gap-4 md:mx-8`}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeIn" }}    
        >
            {blogData.map((item, idx) => (
                <BlogCard
                    key={idx}
                    title={item.node.title}
                    brief={item.node.brief}
                    url={item.node.url}
                    readTime={item.node.readTimeInMinutes}
                />
            ))}
        </motion.div>
    )
}