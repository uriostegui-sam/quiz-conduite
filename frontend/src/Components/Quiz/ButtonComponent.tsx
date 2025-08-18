import ArrowRight from "../../assets/icon/arrow-right.svg";

const Button = () => {
  return (
    <button className="relative h-12 overflow-hidden rounded bg-cyan-700 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
          <span className="relative flex items-center gap-3">
            <p>Next question</p>
            <img src={ArrowRight} className="w-5 h-5" />
          </span>
        </button>
  )
}

export default Button