import { CartSheet } from "../Cart/Cart";

export function NavigationBar() {
  return (
    <nav className="fixed top-0 right-0 border-t py-4 px-6 ">
    <div className="flex justify-end">
      <CartSheet />
    </div>
  </nav>
  );
}