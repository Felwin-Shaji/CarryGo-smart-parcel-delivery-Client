import { Header } from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from './components/HeroSection'
import FeaturedArticle from './components/FeaturedArticle'
import BlogGrid from './components/BlogGrid'
import NewsletterCTA from './components/NewsletterCTA'

const BlogPage = () => {
    return (
        <>
            <Header isLoggedIn={true} />

            <HeroSection />
            <FeaturedArticle />
            <BlogGrid />
            <NewsletterCTA />

            <Footer />
        </>
    )
}

export default BlogPage