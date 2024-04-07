import { FaCircleCheck } from "react-icons/fa6";

interface FormSuccessProp{
  message?:string
}

export const FormSuccess = ({message}:FormSuccessProp) => {
  return (
    <div className="w-full h-10 px-3 rounded-lg flex items-center gap-x-2 text-emerald-400 bg-emerald-500/15 text-sm">
      <FaCircleCheck className="w-4 h-4 "/>
      {message}
    </div>
  );
};