import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4 p-8">
          <div className="text-6xl">⚠</div>
          <h1 className="text-2xl font-bold text-gray-800">Une erreur est survenue</h1>
          <p className="text-gray-600 text-center max-w-md">
            {this.state.error?.message || "Une erreur inattendue s'est produite."}
          </p>
          <Button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
          >
            Revenir à l'accueil
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
