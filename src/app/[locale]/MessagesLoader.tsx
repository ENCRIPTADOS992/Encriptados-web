import { getMessages } from "next-intl/server";

type MessagesLoaderProps = {
  children: (messages: any) => React.ReactNode;
};

export default async function MessagesLoader({ children }: MessagesLoaderProps) {
  const messages = await getMessages();

  return <>{children(messages)}</>;
}
