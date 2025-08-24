interface ISpinnerTypes{
  className?: string
}
const SpinnerSm:React.FC<ISpinnerTypes> = ({className}) => {
  return (
    <div className={`${className?className:'w-4 h-4'} border-2 border-t-transparent border-primary rounded-full animate-spin`}></div>
  )
}

export default SpinnerSm