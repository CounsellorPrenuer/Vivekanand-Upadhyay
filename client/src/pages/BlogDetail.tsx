import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Calendar, Clock, ArrowLeft, Tag, Loader2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { client, urlFor } from "@/lib/sanity";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await client.fetch(`*[_type == "blogPost" && _id == $id][0]`, { id: params?.id });
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchPost();
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <Link href="/blog">
          <Button variant="outline">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10 pl-0">
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Button>
        </Link>

        {post.image && (
          <div className="aspect-video w-full overflow-hidden rounded-2xl mb-8 shadow-2xl">
            <img
              src={urlFor(post.image).width(1200).height(675).url()}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {post.category}
          </Badge>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {post.readTime}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12 border-t border-border pt-12">
          {post.content ? (
            <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
              {post.content}
            </div>
          ) : (
            <p className="italic text-muted-foreground">No content available for this post.</p>
          )}
        </div>

        <div className="border-t border-border pt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Enjoyed the article?</span>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => {
              navigator.share?.({
                title: post.title,
                url: window.location.href
              }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              });
            }}>
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
