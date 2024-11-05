import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return async function AuthenticatedComponent(props: P) {
    const session = await getServerSession();

    if (!session) {
      redirect("/");
    }

    return <WrappedComponent {...props} />;
  };
}
