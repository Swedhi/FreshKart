export default function PasswordStrengthMeter({ password }) {
  const strength =
    password.length >= 8
      ? "Strong"
      : password.length >= 5
      ? "Medium"
      : "Weak";

  const colors = {
    Weak: "bg-red-500",
    Medium: "bg-yellow-500",
    Strong: "bg-green-500",
  };

  return (
    <div className="mt-2">
      <div className="h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded ${colors[strength]}`}
          style={{
            width:
              strength === "Weak"
                ? "33%"
                : strength === "Medium"
                ? "66%"
                : "100%",
          }}
        />
      </div>

      <p className="text-sm mt-1">{strength}</p>
    </div>
  );
}