import { BASE_URL } from '../constants/url.ts';
import useSWR, { useSWRConfig } from 'swr';
import { ALARM } from '../types/alarm.ts';

const fetcher = (key: string) =>
  fetch(`${BASE_URL}${key}`, { method: 'GET' }).then((res) => res.json());

const AlarmList = () => {
  const { mutate } = useSWRConfig();
  const { data: alarmList, isLoading } = useSWR<ALARM[]>(
    '/notification',
    fetcher,
  );

  const deleteAlarm = async (id: string) => {
    const response = await fetch(`${BASE_URL}/notification/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('알람이 성공적으로 해제되었습니다.');
      mutate('/notification');
    } else {
      alert('알람 해제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section>
      <h1>등록된 알람</h1>
      {isLoading && <span>loading...</span>}
      {alarmList && (
        <ul>
          {alarmList.map(({ id, year, month, date, hour, minute, message }) => (
            <li key={id}>
              {year}년 {month}월 {date}일 {hour}시 {minute}분 {message}
              <button onClick={() => deleteAlarm(id)}>알람 해제</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AlarmList;
