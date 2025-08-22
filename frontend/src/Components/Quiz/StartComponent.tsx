import Button from "./ButtonComponent";
import type { Form } from "../../Interfaces/Form";

const StartComponent = (props: {
  formData: Form;
  setFormData: (formData: Form) => void;
  start: boolean;
  setStart: (start: boolean) => void;
  categoryOptions: Record<string, string>;
}) => {
  const handleFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { id, value } = e.target;

    props.setFormData({
      ...props.formData,
      [id]: id === "questions" ? Number(value) : value,
      ["type"]: id === "category" ? "questions" : "cards",
    });
  };

  return (
    <div className="container flex flex-col gap-10 justify-center items-center">
      <p className="text-2xl">Quiz your knowledge!</p>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <label className="text-lg font-bold">
            Number of Questions (5-66):
          </label>
          <input
            className="text-lg border-2 border-cyan-700 rounded-lg py-2 px-3"
            id="questions"
            type="number"
            min="5"
            max="66"
            value={props.formData.questions}
            onChange={handleFormData}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <label className="text-lg font-bold">Choisir categories:</label>
          <select
            className="container-select border-2 border-cyan-700 rounded-lg py-2 px-3"
            id="category"
            onChange={handleFormData}
          >
            {Object.entries(props.categoryOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button inQuiz={false} startButton={true} start={props.start} setStart={props.setStart}/>
    </div>
  );
};

export default StartComponent;
