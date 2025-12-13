import { Users, Building2, GraduationCap, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: "350,000+",
    label: "Students and Professionals Mentored",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-500",
  },
  {
    icon: Building2,
    value: "240+",
    label: "Corporate Partners",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-500",
  },
  {
    icon: GraduationCap,
    value: "350+",
    label: "Schools and College Partners",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-500",
  },
  {
    icon: Video,
    value: "1,000+",
    label: "Hours of Career Webinars",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600",
  },
];

export default function MentoriaSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powered by Mentoria's
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent mb-6">
            Career Discovery Platform
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every consultation includes lifetime access to Mentoria: India's most trusted
            platform for career discovery, mentorship, and lifelong upskilling.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center hover-elevate border-border/50" data-testid={`card-mentoria-stat-${index}`}>
                <CardContent className="pt-8 pb-6">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                    <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
