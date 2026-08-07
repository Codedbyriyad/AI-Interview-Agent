function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}) {
  const styles = {
    primary:
      "rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700",

    secondary:
      "rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold transition hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;