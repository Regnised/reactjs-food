export default function Input({ label, id, name, error, ...props }) {
  return (
    <div className="control no-margin">
      <label htmlFor={name}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
