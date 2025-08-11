const Input = ({ id, placeholder, value, onChange }) => {
  return (
      <input
        className='input'
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
  );
};

export { Input };
