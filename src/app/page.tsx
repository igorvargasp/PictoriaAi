import Faqs from "@/components/landing-page/Faqs";
import Features from "@/components/landing-page/Features";
import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import Navigation from "@/components/landing-page/Navigation";
import Princing from "@/components/landing-page/Princing";
import Testimonials from "@/components/landing-page/Testimonials";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Home() {

  const supabase = await createClient()

  const [user, products] = await Promise.all([
    supabase.auth.getUser(),
    getProducts(supabase)
  ])

  if (user.data.user !== null) {
    return redirect("/dashboard")
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigation />
      <HeroSection />
      <Features />
      <Testimonials />
      <Princing products={products ?? []} />
      <Faqs />
      <section className="w-full mt-16 py-16 bg-muted">
        <div className="flex flex-col items-center space-y-4 text-center justify-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mt-4">
            Ready to Tranform your Photos?
          </h2>
          <p className='text-sm xs:text-base text-muted-foreground mt-4 text-center '>
            Join thousands of users who are already creating amazing AI-generated images.
          </p>
          <Link href={"/login?state=signup"}
          >
            <Button className='rounded-md text-base h-12'>
              ⭐ Create Your first Ai Model ⭐
            </Button>
          </Link>
        </div>

      </section>
      <Footer />
    </main>
  );
}
