const contributors = [
  "Aryan Sharma",
  "Divyam Dangayach",
  "Hitesh Tiwari",
  "Tushar Raghwani",
  "Brind Akabari",
  "Anshul Ailani",
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8 animate-fade-in">
      <div className="container px-4">
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {contributors.map((name, index) => (
              <span
                key={name}
                className="hover:text-foreground transition-colors cursor-default animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {name}
                {index < contributors.length - 1 && <span className="ml-3 text-border">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
