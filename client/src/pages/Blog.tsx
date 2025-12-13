import { useState } from "react";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// todo: remove mock functionality - replace with real blog posts from database
const categories = ["All", "Career Tips", "Student Guidance", "Industry Insights", "Success Stories"];

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Choosing the Right Career Path",
    excerpt: "Discover practical strategies to identify your ideal career based on your strengths, interests, and market opportunities.",
    category: "Career Tips",
    date: "Dec 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "How Parents Can Support Their Child's Career Decisions",
    excerpt: "A guide for parents on how to nurture and guide their children's career aspirations without imposing expectations.",
    category: "Student Guidance",
    date: "Dec 5, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Emerging Careers in 2025: What You Need to Know",
    excerpt: "Explore the most promising career fields for the upcoming year and how to prepare yourself for these opportunities.",
    category: "Industry Insights",
    date: "Nov 28, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "From Confusion to Clarity: A Student's Journey",
    excerpt: "Read about how one student transformed their career uncertainty into a clear path forward through proper guidance.",
    category: "Success Stories",
    date: "Nov 20, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "The Importance of Soft Skills in Modern Careers",
    excerpt: "Why technical skills alone aren't enough and how developing soft skills can accelerate your career growth.",
    category: "Career Tips",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "Career Transition After 30: It's Never Too Late",
    excerpt: "Inspiring insights and practical advice for professionals considering a career change in their 30s and beyond.",
    category: "Career Tips",
    date: "Nov 10, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const handleReadArticle = (postId: number) => {
    toast({
      title: "Coming Soon!",
      description: "Full articles will be available soon. Stay tuned!",
    });
  };

  const handleLoadMore = () => {
    toast({
      title: "All Caught Up!",
      description: "You've seen all available articles. Check back later for more!",
    });
  };

  const handleNewsletterSubscribe = () => {
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setNewsletterEmail("");
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="pt-20">
      <section className="py-16 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Blog & <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Articles</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and stories to help you navigate your career journey
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-blog-search"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden bg-card border-border/50 hover-elevate"
                  data-testid={`card-blog-${post.id}`}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {post.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 p-0 h-auto"
                        onClick={() => handleReadArticle(post.id)}
                        data-testid={`button-read-${post.id}`}
                      >
                        Read <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Button variant="outline" onClick={handleLoadMore} data-testid="button-load-more">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest career insights and tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              data-testid="input-newsletter-email"
            />
            <Button
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white"
              onClick={handleNewsletterSubscribe}
              data-testid="button-newsletter-subscribe"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
