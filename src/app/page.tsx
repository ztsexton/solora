
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans p-8">
      <main className="w-full max-w-2xl flex flex-col items-center gap-10">
        <Image
          src="/file.svg"
          alt="Ballroom Jewelry Logo"
          width={80}
          height={80}
          className="mb-4"
        />
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Solora Ballroom Jewelry</h1>
        <p className="text-lg text-center text-gray-700 mb-6">
          Welcome to Solora, your destination for stunning ballroom jewelry designed to make you shine on the dance floor. Shop our exclusive collection of earrings, necklaces, bracelets, and more—crafted for dancers who want to sparkle.
        </p>
        <a
          href="shop"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-colors text-lg"
        >
          Shop Now
        </a>
      </main>
      <footer className="mt-16 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Solora. All rights reserved.
      </footer>
    </div>
  );
}
