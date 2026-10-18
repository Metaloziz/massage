/** Блокирует скролл без сдвига layout из‑за исчезновения scrollbar. */

export function lockBodyScroll() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  const previous = {
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
  };

  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.setProperty(
      "--scrollbar-compensation",
      `${scrollbarWidth}px`,
    );
  }

  return () => {
    document.body.style.overflow = previous.overflow;
    document.body.style.paddingRight = previous.paddingRight;
    document.documentElement.style.removeProperty("--scrollbar-compensation");
  };
}
