
const Button = ({ disabled = false, type = "button", onClick = () => { }, className, text }) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className={`${className ? className : "bg-black rounded-md px-4 py-2 text-white self-center text-2xl"}`}
			disabled={disabled}
		>
			{text}
		</button>
	)
}

export default Button