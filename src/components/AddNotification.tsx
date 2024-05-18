import { createRangeArray } from '../utils/createRangeArray.ts';
import { getDaysInMonth } from '../utils/getDaysInMonth.ts';
import { useState, MouseEvent } from 'react';
import { nanoid } from 'nanoid';
import { BASE_URL } from '../constants/url.ts';
import { useSWRConfig } from 'swr';

const AddNotification = () => {
  const { mutate } = useSWRConfig();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  const [enteredMessage, setEnteredMessage] = useState('');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const addNotification = async (e: MouseEvent) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: nanoid(),
        message: enteredMessage,
        year: selectedYear,
        month: selectedMonth,
        date: selectedDate,
        hour: selectedHour,
        minute: selectedMinute,
      }),
    });

    if (response.ok) {
      alert('알림이 성공적으로 등록되었습니다.');
      mutate('/notification');
      setEnteredMessage('');
      setSelectedYear(currentYear);
      setSelectedMonth(currentMonth);
      setSelectedDate(currentDate);
      setSelectedHour(0);
      setSelectedMinute(0);
    } else {
      alert('알림 등록이 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <fieldset id={'addNotification'}>
      <legend>알림 등록</legend>
      <form className={'flex flex-col'}>
        <div className={'flex flex-col'}>
          <label htmlFor={'message'}>메세지</label>
          <textarea
            id={'message'}
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
            className={'border'}
            rows={4}
          />
        </div>

        <div className={'my-4'}>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(+e.target.value)}
          >
            {createRangeArray(currentYear, currentYear + 10).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span className={'mr-2'}>년</span>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(+e.target.value)}
          >
            {createRangeArray(1, 12).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <span className={'mr-2'}>월</span>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(+e.target.value)}
          >
            {createRangeArray(
              1,
              getDaysInMonth(selectedMonth, selectedYear),
            ).map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <span className={'mr-2'}>일</span>

          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(+e.target.value)}
          >
            {createRangeArray(0, 23).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <span className={'mr-2'}>시</span>

          <select
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(+e.target.value)}
          >
            {createRangeArray(0, 59).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <span>분</span>
        </div>

        <button
          className={''}
          onClick={addNotification}
          disabled={!enteredMessage.trim()}
        >
          등록
        </button>
      </form>
    </fieldset>
  );
};

export default AddNotification;
