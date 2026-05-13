type ErrorStateProps = {
  title?: string;
  message: string;
};

export function ErrorState({ title = "Something went wrong", message }: ErrorStateProps) {
  return (
    <div className="state-card state-card--error" role="alert">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}
