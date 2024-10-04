"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const ContactUsView = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Thank you for your message. We&apos;ll get back to you soon."
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions or feedback? We&apos;d love to hear from you. Get in
          touch with our team for support, partnerships, or just to say hello!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>123 Travel Street, Adventure City, 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>contact@traveltips.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span>www.traveltips.com</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>How do I create an account?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To create an account, click on the &quot;Loginp&quot; button in
                the top right corner of our homepage. Follow the prompts to
                enter your details and set up your profile.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Can I contribute my own travel stories?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Once you&apos;ve created an account, you can submit your travel
                stories through your user dashboard. We encourage all members to
                share their unique experiences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                What&apos;s included in the premium membership?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Premium members enjoy ad-free browsing, access to exclusive
                content, early access to new features, and special travel deals
                from our partners.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How can I report inappropriate content?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you come across any content that violates our community
                guidelines, please use the &quot;Report&quot; button next to the
                post or contact our support team directly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
export default ContactUsView;