import * as React from "react";
import useRepository, { RepositoryProvider } from "../hooks/useRepository";

export default function LogRepositoryStub({
  children
}: {
  children?: React.ReactNode;
}) {
  const repositoryBase = useRepository();
  const repository = {
    logEvent: (...args: any[]) => console.info("logEvent", ...args),
    ...repositoryBase
  };

  return (
    <RepositoryProvider repository={repository}>{children}</RepositoryProvider>
  );
}
