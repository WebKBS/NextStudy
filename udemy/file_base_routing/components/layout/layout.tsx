import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "@/store/notification-context";

interface LayoutProps {
  children: React.ReactNode;
}

interface NotificationContextType {
  notification: {
    title: string;
    message: string;
    status: string;
  } | null;
}
function Layout({ children }: LayoutProps) {
  const notificationCtx = useContext(
    NotificationContext
  ) as NotificationContextType;

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
