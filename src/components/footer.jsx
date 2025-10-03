export default function Footer() {
  return (
    <footer className="bg-gray-200/80 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white py-4 mt-8 fixed bottom-0 w-full text-sm z-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} GIG Construct. All rights reserved.</p>
      </div>
    </footer>
  );
}