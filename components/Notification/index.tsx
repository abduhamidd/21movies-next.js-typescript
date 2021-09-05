import {useState} from 'react';
import {NotificationProps} from './Notification.interface';
import Link from 'next/link';
export const Notification = ({
  message,
  link,
  href,
}: NotificationProps): JSX.Element => {
  const [notification, setNotification] = useState(false);
  return (
    <>
      <div
        className="notification"
        style={{height: notification ? '0' : '100px'}}
      >
        <div style={{opacity: notification ? '0' : '1'}}>
          <span>{message}</span>
          <br />
          <Link href={href || ''}>
            <a>
              <span className="bright">{link}</span>
            </a>
          </Link>
        </div>
        <div
          id="notification__close"
          onClick={() => setNotification(true)}
        ></div>
      </div>
    </>
  );
};
