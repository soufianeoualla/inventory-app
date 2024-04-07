import { FaTriangleExclamation } from "react-icons/fa6";
interface FormErrorProp {
  message?: string;
}
export const FormError = ({ message }: FormErrorProp) => {
  return (
    <div className="w-full h-10 px-3 rounded-lg flex  items-center gap-x-2 text-destructive bg-destructive/15 text-sm">
      <FaTriangleExclamation className="w-4 h-4 "/>
      {message}
    </div>
  );
};