const Button = ({ type, variant, buttonText, onClick, className }) => {
  let buttonColor;
  switch (variant) {
    case "primary":
      buttonColor = "bg-blue-600";
      break;
    case "danger":
      buttonColor = "bg-red-600";
      break;
    case "neutral":
      buttonColor = "bg-slate-500";
      break;
  }
  return (
    <button
      type={type}
      variant={variant}
      className={`${buttonColor} ${className} text-white rounded-md px-2 py-1 mx-2 h-max`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
