import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="question-content phase-content">
      <span className="meta-label">NO SUCH MEMORY</span>
      <h1 className="question-prompt">
        I looked for this memory. It was never there.
      </h1>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "cta" }),
          "primary-action shadow-glow self-end",
        )}
      >
        BACK TO THE BEGINNING
        <ArrowRight data-icon="inline-end" />
      </Link>
    </div>
  );
}
