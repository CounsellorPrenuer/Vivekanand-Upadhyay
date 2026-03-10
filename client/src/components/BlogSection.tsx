import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { client } from "@/lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(`*[_type == "blogPost"] | order(date desc)`);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Insights & Tips</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text-purple-pink">Latest From Mentoria</h2>
            <p className="text-lg text-muted-foreground mt-4">
              Expert advice and strategies to help you navigate your career journey with confidence.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2 group border-primary/20 hover:bg-primary/5">
            View All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass h-full flex flex-col hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-4xl">📝</span>
                </div>
                <CardHeader className="p-6 pb-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <Badge variant="secondary" className="w-fit mb-3 bg-white/5 text-xs">{post.category}</Badge>
                  <CardTitle className="text-xl line-clamp-2 leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                  <Button variant="ghost" className="p-0 h-auto text-primary font-bold gap-2 hover:bg-transparent hover:text-primary/80 group/btn">
                    Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-10 md:hidden gap-2 border-primary/20">
          View All Articles <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
