
interface IinputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

export const Input = ({ label, placeholder, type, id, name, onChange, error }: IinputProps) => {
  return (
    <div className='flex flex-col'>
      <label className='font-semibold'>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        className='w-72 h-12 rounded-md bg-[#f6f6f6] border border-[#d8d8d8] px-5 py-2 mt-2'
        placeholder={placeholder}
      />
      <span className="text-red-500 text-sm">
        {error && error}
      </span>
    </div>
  )
}
