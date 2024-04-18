import "node";

interface Consumer {
  address: string;
  marketer?: string;
}

interface Marketer {
  name: string;
  image: string;
  policies: string[];
}
