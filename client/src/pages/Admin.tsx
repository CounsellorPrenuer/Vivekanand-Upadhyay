import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, Users, MousePointerClick, ShoppingCart, 
  Mail, TrendingUp, Layout, ChevronRight
} from "lucide-react";
import { format } from "date-fns";

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
        </Tabs>
      </div>
    </div>
  );
}
