import { BsCheck } from "react-icons/bs";

const Check = ({ todo, updateTodoStatus }) => {
  return (
    <div
      className={`border-2 rounded-lg border-pink-400 ${
        todo.isCompleted ? "bg-pink-400" : ""
      } w-5 h-5 mr-3 flex items-center`}
      onClick={() => updateTodoStatus(todo._id, todo.isCompleted)}
    >
      {todo.isCompleted && <BsCheck size={24} className="text-gray-900" />}
    </div>
  );
};

export default Check;
