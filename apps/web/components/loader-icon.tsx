export const LoaderIcon = () => {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" className="flex">
      <circle
        cx="10"
        cy="30"
        r="8"
        fill="#3b82f6"
        style={{
          animation: "bounce 0.6s infinite alternate",
        }}
      />
      <circle
        cx="30"
        cy="30"
        r="8"
        fill="#3b82f6"
        style={{
          animation: "bounce 0.6s 0.2s infinite alternate",
        }}
      />
      <circle
        cx="50"
        cy="30"
        r="8"
        fill="#3b82f6"
        style={{
          animation: "bounce 0.6s 0.4s infinite alternate",
        }}
      />
      <style>{`
      @keyframes bounce {
        to {
          transform: translateY(-16px);
        }
      }
    `}</style>
    </svg>
  );
};
