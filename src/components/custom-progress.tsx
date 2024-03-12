import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

interface CustomProgressProps {
  value: number;
  total: number;
}

export default function CustomProgress({ value, total }: CustomProgressProps) {
  const [progress, setProgress] = useState(0);
  const percentage = (value / total) * 100;

  useEffect(function () {
    const addProgress = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(addProgress);
  });

  return <Progress value={progress} />;
}
