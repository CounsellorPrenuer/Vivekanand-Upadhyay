import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { 
  DollarSign, Users, MousePointerClick, ShoppingCart, 
  Mail, TrendingUp, Layout, ChevronRight, Star, Plus, Pencil, Trash2, FileText
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalOrders: number;
  paidOrders: number;
  totalRevenue: number;
  totalSubscribers: number;
  totalButtonClicks: number;
}

interface Order {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  amount: number;
  currency: string;
  planName: string;
  category: string;
  status: string;
  customerEmail: string | null;
  customerPhone: string | null;
  customerName: string | null;
  createdAt: string;
  paidAt: string | null;
}

interface ButtonStat {
  buttonId: string;
  buttonLabel: string;
  section: string;
  count: number;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

interface SiteButton {
  id: string;
  label: string;
  section: string;
  page: string;
  action: string;
  description: string | null;
}

interface Review {
  id: string;
  name: string;
  role: string;
  image: string | null;
  rating: number;
  text: string;
  isActive: string;
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string | null;
  readTime: string;
  isPublished: string;
  createdAt: string;
}

interface DashboardData {
  stats: DashboardStats;
  recentOrders: Order[];
  buttonStats: ButtonStat[];
  subscribers: Subscriber[];
  siteButtons: SiteButton[];
}

function StatCard({ title, value, icon: Icon, description, variant = "default" }: {
  title: string;
  value: string | number;
  icon: typeof DollarSign;
  description?: string;
  variant?: "default" | "success" | "warning";
}) {
  const bgColors = {
    default: "bg-blue-100 dark:bg-blue-900/30",
    success: "bg-green-100 dark:bg-green-900/30",
    warning: "bg-orange-100 dark:bg-orange-900/30",
  };
  const iconColors = {
    default: "text-blue-600",
    success: "text-green-600",
    warning: "text-orange-600",
  };

  return (
    <Card data-testid={`stat-card-${title.toLowerCase().replace(/\s/g, "-")}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${bgColors[variant]}`}>
          <Icon className={`h-4 w-4 ${iconColors[variant]}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No orders yet. Orders will appear here when customers make purchases.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2 font-medium">Plan</th>
            <th className="text-left py-3 px-2 font-medium">Amount</th>
            <th className="text-left py-3 px-2 font-medium">Status</th>
            <th className="text-left py-3 px-2 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover-elevate" data-testid={`order-row-${order.id}`}>
              <td className="py-3 px-2">
                <div className="font-medium">{order.planName}</div>
                <div className="text-xs text-muted-foreground">{order.category}</div>
              </td>
              <td className="py-3 px-2 font-medium">₹{order.amount.toLocaleString()}</td>
              <td className="py-3 px-2">
                <Badge variant={order.status === "paid" ? "default" : "secondary"}>
                  {order.status}
                </Badge>
              </td>
              <td className="py-3 px-2 text-muted-foreground">
                {format(new Date(order.createdAt), "MMM d, yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ButtonStatsTable({ stats }: { stats: ButtonStat[] }) {
  if (stats.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No button clicks tracked yet. Click analytics will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {stats.map((stat) => (
        <div 
          key={stat.buttonId} 
          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
          data-testid={`button-stat-${stat.buttonId}`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MousePointerClick className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">{stat.buttonLabel}</div>
              <div className="text-xs text-muted-foreground">{stat.section}</div>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            {stat.count} clicks
          </Badge>
        </div>
      ))}
    </div>
  );
}

function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
  if (subscribers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No newsletter subscribers yet. Subscribers will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {subscribers.map((sub) => (
        <div 
          key={sub.id} 
          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
          data-testid={`subscriber-${sub.id}`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Mail className="h-4 w-4 text-green-600" />
            </div>
            <span className="font-medium">{sub.email}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {format(new Date(sub.subscribedAt), "MMM d, yyyy")}
          </span>
        </div>
      ))}
    </div>
  );
}

function ButtonInventory({ buttons }: { buttons: SiteButton[] }) {
  const groupedBySection = buttons.reduce((acc, btn) => {
    if (!acc[btn.section]) acc[btn.section] = [];
    acc[btn.section].push(btn);
    return acc;
  }, {} as Record<string, SiteButton[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedBySection).map(([section, btns]) => (
        <div key={section}>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Layout className="h-4 w-4" />
            {section}
          </h4>
          <div className="space-y-2">
            {btns.map((btn) => (
              <div 
                key={btn.id} 
                className="p-4 rounded-lg border bg-card"
                data-testid={`button-info-${btn.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {btn.label}
                      <Badge variant="outline">{btn.page}</Badge>
                    </div>
                    {btn.description && (
                      <p className="text-sm text-muted-foreground mt-1">{btn.description}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                  <span className="font-medium">Action:</span> {btn.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewsManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    rating: 5,
    text: "",
    isActive: "true",
  });

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/admin/reviews"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/admin/reviews", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      toast({ title: "Review created successfully" });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      return apiRequest("PUT", `/api/admin/reviews/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      toast({ title: "Review updated successfully" });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      toast({ title: "Review deleted successfully" });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", role: "", image: "", rating: 5, text: "", isActive: "true" });
    setEditingReview(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      role: review.role,
      image: review.image || "",
      rating: review.rating,
      text: review.text,
      isActive: review.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingReview) {
      updateMutation.mutate({ id: editingReview.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-32 bg-muted rounded" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-semibold">Manage Reviews</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-review" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" /> Add Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingReview ? "Edit Review" : "Add New Review"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input 
                  data-testid="input-review-name"
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                />
              </div>
              <div>
                <Label>Role</Label>
                <Input 
                  data-testid="input-review-role"
                  value={formData.role} 
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
                />
              </div>
              <div>
                <Label>Rating (1-5)</Label>
                <Input 
                  data-testid="input-review-rating"
                  type="number" 
                  min={1} 
                  max={5} 
                  value={formData.rating} 
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })} 
                />
              </div>
              <div>
                <Label>Review Text</Label>
                <Textarea 
                  data-testid="input-review-text"
                  value={formData.text} 
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })} 
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  data-testid="switch-review-active"
                  checked={formData.isActive === "true"} 
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked ? "true" : "false" })} 
                />
                <Label>Active</Label>
              </div>
              <Button 
                data-testid="button-submit-review"
                className="w-full" 
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingReview ? "Update Review" : "Create Review"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {reviews?.map((review) => (
          <div 
            key={review.id} 
            className="p-4 rounded-lg border bg-card"
            data-testid={`review-item-${review.id}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{review.name}</span>
                  <Badge variant="outline">{review.role}</Badge>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {review.isActive === "true" ? (
                    <Badge variant="default">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{review.text}</p>
              </div>
              <div className="flex gap-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => handleEdit(review)}
                  data-testid={`button-edit-review-${review.id}`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => deleteMutation.mutate(review.id)}
                  data-testid={`button-delete-review-${review.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {(!reviews || reviews.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            No reviews yet. Add your first review.
          </div>
        )}
      </div>
    </div>
  );
}

function BlogsManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    readTime: "5 min read",
    isPublished: "false",
  });

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blogs"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/admin/blogs", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      toast({ title: "Blog post created successfully" });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      return apiRequest("PUT", `/api/admin/blogs/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      toast({ title: "Blog post updated successfully" });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      toast({ title: "Blog post deleted successfully" });
    },
  });

  const resetForm = () => {
    setFormData({ title: "", excerpt: "", content: "", category: "", image: "", readTime: "5 min read", isPublished: "false" });
    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image || "",
      readTime: post.readTime,
      isPublished: post.isPublished,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-32 bg-muted rounded" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-semibold">Manage Blog Posts</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-blog" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" /> Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  data-testid="input-blog-title"
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input 
                  data-testid="input-blog-category"
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                  placeholder="e.g., Career Tips, Education"
                />
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea 
                  data-testid="input-blog-excerpt"
                  value={formData.excerpt} 
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} 
                  placeholder="Brief summary of the post"
                  rows={2}
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea 
                  data-testid="input-blog-content"
                  value={formData.content} 
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                  placeholder="Full blog post content"
                  rows={8}
                />
              </div>
              <div>
                <Label>Image URL (optional)</Label>
                <Input 
                  data-testid="input-blog-image"
                  value={formData.image} 
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label>Read Time</Label>
                <Input 
                  data-testid="input-blog-readtime"
                  value={formData.readTime} 
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} 
                  placeholder="5 min read"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  data-testid="switch-blog-published"
                  checked={formData.isPublished === "true"} 
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked ? "true" : "false" })} 
                />
                <Label>Published</Label>
              </div>
              <Button 
                data-testid="button-submit-blog"
                className="w-full" 
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingPost ? "Update Blog Post" : "Create Blog Post"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {posts?.map((post) => (
          <div 
            key={post.id} 
            className="p-4 rounded-lg border bg-card"
            data-testid={`blog-item-${post.id}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{post.title}</span>
                  <Badge variant="outline">{post.category}</Badge>
                  <Badge variant="secondary">{post.readTime}</Badge>
                  {post.isPublished === "true" ? (
                    <Badge variant="default">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Created: {format(new Date(post.createdAt), "MMM d, yyyy")}
                </p>
              </div>
              <div className="flex gap-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => handleEdit(post)}
                  data-testid={`button-edit-blog-${post.id}`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => deleteMutation.mutate(post.id)}
                  data-testid={`button-delete-blog-${post.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            No blog posts yet. Create your first blog post.
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/admin/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive">Failed to load admin dashboard</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold" data-testid="admin-title">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your website performance and analytics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Revenue"
            value={`₹${data.stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            description="From paid orders"
            variant="success"
          />
          <StatCard
            title="Paid Orders"
            value={data.stats.paidOrders}
            icon={ShoppingCart}
            description={`of ${data.stats.totalOrders} total`}
          />
          <StatCard
            title="Subscribers"
            value={data.stats.totalSubscribers}
            icon={Users}
            description="Newsletter signups"
          />
          <StatCard
            title="Button Clicks"
            value={data.stats.totalButtonClicks}
            icon={MousePointerClick}
            description="User interactions"
            variant="warning"
          />
          <StatCard
            title="Conversion"
            value={data.stats.totalOrders > 0 
              ? `${Math.round((data.stats.paidOrders / data.stats.totalOrders) * 100)}%`
              : "0%"
            }
            icon={TrendingUp}
            description="Orders to paid"
          />
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="orders" data-testid="tab-orders">Orders</TabsTrigger>
            <TabsTrigger value="buttons" data-testid="tab-buttons">Button Analytics</TabsTrigger>
            <TabsTrigger value="subscribers" data-testid="tab-subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="inventory" data-testid="tab-inventory">Button Inventory</TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
            <TabsTrigger value="blogs" data-testid="tab-blogs">Blogs</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersTable orders={data.recentOrders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buttons">
            <Card>
              <CardHeader>
                <CardTitle>Button Click Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ButtonStatsTable stats={data.buttonStats} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <SubscribersTable subscribers={data.subscribers} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Site Button Inventory</CardTitle>
                <p className="text-sm text-muted-foreground">
                  All buttons on the main page with their actions and descriptions
                </p>
              </CardHeader>
              <CardContent>
                <ButtonInventory buttons={data.siteButtons} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Reviews Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add, edit, or remove customer reviews displayed on the website
                </p>
              </CardHeader>
              <CardContent>
                <ReviewsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs">
            <Card>
              <CardHeader>
                <CardTitle>Blog Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Create, edit, or delete blog posts for your website
                </p>
              </CardHeader>
              <CardContent>
                <BlogsManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
