import "node";

interface User {
  address: string;
  marketer?: string;
}

interface Marketer {
  name: string;
  address: string;
  image: string;
  policies: string[];
}
