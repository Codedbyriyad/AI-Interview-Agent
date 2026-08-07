function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}) {
  const styles = {
    primary:
      "rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700",

    secondary:
      "rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles[variant]}
    >
      {children}
    </button>
  );
}

export default Button;