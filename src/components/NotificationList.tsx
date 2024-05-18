import { BASE_URL } from '../constants/url.ts';
import useSWR, { useSWRConfig } from 'swr';
import { NOTIFICATION } from '../types/notification.ts';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useEffect } from 'react';

const fetcher = (key: string) =>
  fetch(`${BASE_URL}${key}`, { method: 'GET' }).then((res) => res.json());

const NotificationList = () => {
  const { mutate } = useSWRConfig();
  const { data: notificationList } = useSWR<NOTIFICATION[]>(
    '/notification',
    fetcher,
  );

  const deleteNotification = async (id: string) => {
    const response = await fetch(`${BASE_URL}/notification/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('알림이 성공적으로 해제되었습니다.');
      mutate('/notification');
    } else {
      alert('알림 해제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const addNotificationEl = document.getElementById('addNotification');
      const notificationElList = document.getElementsByClassName(
        'notification',
      ) as HTMLCollectionOf<HTMLElement>;

      if (!addNotificationEl) {
        return;
      }

      for (let i = 0; i < notificationElList.length; i++) {
        const el = notificationElList[i];
        el.style.width = addNotificationEl.offsetWidth * 0.85 + 'px';
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <fieldset>
      <legend>등록된 알림</legend>
      {notificationList && notificationList.length === 0 && (
        <p>등록된 알림이 없습니다.</p>
      )}
      {notificationList && notificationList.length > 0 && (
        <ul className={'space-y-2'}>
          {notificationList.map(
            ({ id, year, month, date, hour, minute, message }) => (
              <li key={id} className={'flex items-center justify-between'}>
                <span
                  className={
                    'notification overflow-hidden text-ellipsis text-nowrap'
                  }
                >
                  {year}년 {month}월 {date}일 {hour}시 {minute}분 {message}
                </span>
                <FaRegTrashAlt
                  className={'cursor-pointer'}
                  onClick={() => deleteNotification(id)}
                />
              </li>
            ),
          )}
        </ul>
      )}
    </fieldset>
  );
};

export default NotificationList;
