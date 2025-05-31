interface Field {
  label: string;
  type: 'text' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface FormProps {
  fields: Field[];
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  disabled?: boolean; // ✅ Cho phép vô hiệu hoá khi loading
}

export default function Form({ fields, onSubmit, submitLabel, disabled = false }: FormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((field, index) => (
        <div key={index}>
          <label className="block mb-1 text-sm font-medium text-teal-300">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              value={field.value}
              onChange={field.onChange}
              disabled={disabled}
              className="w-full px-4 py-3 text-sm text-white bg-gray-800 border border-gray-600 rounded-lg disabled:opacity-50"
              rows={6}
            />
          ) : (
            <input
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              disabled={disabled}
              className="w-full px-4 py-3 text-sm text-white bg-gray-800 border border-gray-600 rounded-lg disabled:opacity-50"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={disabled}
        className={`px-4 py-2 font-semibold text-white rounded transition-all ${
          disabled
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-teal-500 hover:bg-teal-400'
        }`}
      >
        {submitLabel}
      </button>
    </form>
  );
}
